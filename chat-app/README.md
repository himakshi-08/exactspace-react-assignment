# ExactSpace Team Chat Application

A high-performance, real-time single-page chat application built with **React**, **Express**, and **Socket.IO** for the Exactspace Front End / UI Developer assignment.

---

## 🚀 Features

### Core Task Requirements
- **Single Page Application**: Clean, modern interface matching the provided reference GIF.
- **Dynamic Message Thread**: Messages render sequentially above the chat input box with auto-scrolling to the latest message.
- **Random User Assignment**: Per the specification, every message sent is dynamically assigned a user randomly chosen from:
  ```javascript
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]
  ```
  - Displays user initials in unique avatar bubbles with distinct color coding.
  - Interactive sender badge at the bottom showing the currently randomized user with an instant re-roll button.
- **Like Counter**:
  - Each message has a thumbs-up like button on the right edge.
  - Clicking the like button increments the count in real-time with micro-interactions.
  - Synchronized across all connected clients via WebSockets.

---

### 🌟 Stretch Goals (All 3 Completed!)

#### 1. Emoji Options & Reactions
- **Rich Emoji Picker**: Built-in searchable modal categorized into *Smileys & People*, *Gestures*, *Reactions*, and *Work/Objects*.
- **Cursor-Aware Insertion**: Clicking an emoji inserts it directly into the input field at the cursor position.
- **Hover Emoji Reactions**: Quick reactions menu (👍, ❤️, 😂, 🎉, 🚀, 🔥) directly on each message bubble with aggregated reaction counters.

#### 2. User Mentions (@) Feature
- **Auto-complete Mention Popup**: Typing `@` in the input field automatically triggers a mention popup displaying the team members from `user_list`.
- **Keyboard & Mouse Navigation**: Navigate candidate mentions with `ArrowUp` / `ArrowDown`, select with `Enter` or mouse click.
- **Mention Highlighting**: Mentioned users (e.g., `@Alan`, `@Bob`) render as styled interactive badge tags in the message feed.

#### 3. Real-Time WebSockets (Socket.IO + Express.js)
- **Node.js + Express WebSocket Server**:
  - Full publish/subscribe communication using `socket.io`.
  - Real-time broadcast of incoming messages to all active browser windows.
  - Real-time synchronization of like counts and emoji reactions across peers.
  - Live typing indicator (`user_typing`) displaying who is currently drafting a message.
- **Zero-Downtime Resilience**: If the backend server is not running, the application gracefully falls back to local client state with zero crashes.

---

## 🛠️ Project Structure

```
chat-app/
├── server/
│   └── server.js            # Express + Socket.IO real-time server
├── src/
│   ├── components/
│   │   ├── ChatHeader.jsx   # Channel metadata & live connection status
│   │   ├── ChatInput.jsx    # Text input, @ mention listener & emoji triggers
│   │   ├── ChatMessage.jsx  # Avatar, bubble, like counter & emoji reactions
│   │   ├── EmojiPickerModal.jsx # Searchable emoji picker palette
│   │   ├── MentionDropdown.jsx  # @ mention autocomplete suggestions
│   │   ├── Sidebar.jsx      # Channel list & user profile
│   │   └── TypingIndicator.jsx  # Animated typing status dots
│   ├── constants/
│   │   ├── emojis.js        # Emoji categorized libraries
│   │   └── users.js         # user_list, color schemes, avatar logic
│   ├── hooks/
│   │   └── useChatSocket.js # Custom hook managing Socket.IO & local fallbacks
│   ├── App.jsx              # Main application shell
│   ├── index.css            # Custom CSS matching reference UI
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd chat-app
npm install
```

### 2. Run the Full Stack (Socket.IO Server + React Frontend)
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- Socket.IO Server runs at: `http://localhost:5001`

### 3. Run Independently (Optional)
If you wish to run the client or server in separate terminals:
- **Server only**: `npm run dev:server`
- **Frontend only**: `npm run dev:client`

