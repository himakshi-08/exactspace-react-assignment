import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5001;

// Seed initial messages matching the reference assignment gif
let messages = [
  {
    id: "msg-1",
    user: "PubNub Bot",
    text: "Welcome to Team Chat. 👏👏 Send a message now to start interacting with other users in the app. ⬇️",
    timestamp: "12:16",
    likes: 2,
    reactions: { "👏": 3, "🚀": 1 },
    mentions: []
  },
  {
    id: "msg-2",
    user: "Alan",
    text: "Hey everyone! Glad to be here. 👋",
    timestamp: "17:28",
    likes: 1,
    reactions: { "👋": 2 },
    mentions: []
  },
  {
    id: "msg-3",
    user: "Elin",
    text: "Oh hi, Alan! Carol and Bob are around, too...",
    timestamp: "17:30",
    likes: 0,
    reactions: {},
    mentions: ["Carol", "Bob"]
  }
];

let connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Send message history to new client
  socket.emit("init_messages", messages);

  // Handle client sending a message
  socket.on("send_message", (data) => {
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      user: data.user || "Alan",
      text: data.text,
      timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      likes: 0,
      reactions: {},
      mentions: data.mentions || []
    };

    messages.push(newMessage);
    // Broadcast to ALL connected clients including sender
    io.emit("new_message", newMessage);
  });

  // Handle liking a message
  socket.on("like_message", ({ messageId }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      msg.likes = (msg.likes || 0) + 1;
      io.emit("message_liked", { messageId, likes: msg.likes });
    }
  });

  // Handle emoji reactions
  socket.on("react_message", ({ messageId, emoji }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      if (!msg.reactions) msg.reactions = {};
      msg.reactions[emoji] = (msg.reactions[emoji] || 0) + 1;
      io.emit("message_reacted", { messageId, reactions: msg.reactions });
    }
  });

  // Handle typing indicator
  socket.on("typing", ({ user, isTyping }) => {
    socket.broadcast.emit("user_typing", { user, isTyping });
  });

  socket.on("disconnect", () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date(), connectedClients: io.engine.clientsCount });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` ExactSpace Socket.IO Server running on port ${PORT}`);
  console.log(` WebSocket URL: ws://localhost:${PORT}`);
  console.log(`===============================================`);
});

