import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { USER_LIST, getRandomUser } from "../constants/users";

const SOCKET_SERVER_URL = "http://localhost:5001";

// Initial seed messages when running in standalone / fallback mode
const INITIAL_SEED_MESSAGES = [
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

export const useChatSocket = () => {
  const [messages, setMessages] = useState(INITIAL_SEED_MESSAGES);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const socketRef = useRef(null);

  useEffect(() => {
    // Attempt socket connection
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      timeout: 3000
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Chat] Connected to WebSocket server!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("[Chat] Disconnected from WebSocket server, using local sync mode.");
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
    });

    socket.on("init_messages", (serverMessages) => {
      if (serverMessages && serverMessages.length > 0) {
        setMessages(serverMessages);
      }
    });

    socket.on("new_message", (newMsg) => {
      setMessages((prev) => {
        // Prevent duplicate if already added
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    socket.on("message_liked", ({ messageId, likes }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, likes } : msg))
      );
    });

    socket.on("message_reacted", ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, reactions } : msg))
      );
    });

    socket.on("user_typing", ({ user, isTyping }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        if (isTyping) next.add(user);
        else next.delete(user);
        return next;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Send message method (socket + local fallback)
  const sendMessage = useCallback(
    (text, assignedUser, mentions = []) => {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      const messageUser = assignedUser || getRandomUser();

      const newMsg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        user: messageUser,
        text,
        timestamp,
        likes: 0,
        reactions: {},
        mentions
      };

      if (socketRef.current && isConnected) {
        socketRef.current.emit("send_message", {
          user: messageUser,
          text,
          timestamp,
          mentions
        });
      } else {
        // Local mode fallback
        setMessages((prev) => [...prev, newMsg]);
      }

      return newMsg;
    },
    [isConnected]
  );

  // Like message method
  const likeMessage = useCallback(
    (messageId) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit("like_message", { messageId });
      } else {
        // Local increment fallback
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, likes: (m.likes || 0) + 1 } : m
          )
        );
      }
    },
    [isConnected]
  );

  // Emoji reaction method
  const reactToMessage = useCallback(
    (messageId, emoji) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit("react_message", { messageId, emoji });
      } else {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== messageId) return m;
            const updated = { ...(m.reactions || {}) };
            updated[emoji] = (updated[emoji] || 0) + 1;
            return { ...m, reactions: updated };
          })
        );
      }
    },
    [isConnected]
  );

  // Broadcast typing
  const setTyping = useCallback(
    (user, isTyping) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit("typing", { user, isTyping });
      }
    },
    [isConnected]
  );

  return {
    messages,
    isConnected,
    typingUsers: Array.from(typingUsers),
    sendMessage,
    likeMessage,
    reactToMessage,
    setTyping
  };
};

