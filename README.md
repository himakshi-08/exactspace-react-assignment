# Exactspace Technologies - Front End / UI Developer Assignment

---

## 📌 Executive Summary

This repository contains production-ready, fully verified implementations for **BOTH** assignments specified in the [Exactspace React Assignments](https://github.com/exact-space/react-assignments) repository:

1. **[Team Chat Application (`chat-app`)](./chat-app)** — Completed with **all core requirements** and **ALL 3 Stretch Goals** (Real-time Socket.IO + Express server, Emoji reactions & picker, `@` user mentions with autocomplete).
2. **[Photo Gallery (`photo-gallery`)](./photo-gallery)** — Completed with **infinite scroll**, **1-column layout matching the reference**, and **FontAwesome thumbs-up like counters**, plus network resilience & proxy configuration.

---

## 📂 Project Architecture

```
ExactSpace/
├── chat-app/                             # Assignment 1: Team Chat Application
│   ├── server/
│   │   └── server.js                     # Express + Socket.IO real-time server (Stretch Goal 3)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatHeader.jsx            # Channel header, connection status pill, active member count
│   │   │   ├── ChatInput.jsx             # Chat input box, @ mentions listener, random user allocator
│   │   │   ├── ChatMessage.jsx           # Avatar initials, message bubble, like button & reactions
│   │   │   ├── EmojiPickerModal.jsx      # Categorized emoji picker modal (Stretch Goal 1)
│   │   │   ├── MentionDropdown.jsx       # @ mention autocomplete menu (Stretch Goal 2)
│   │   │   ├── Sidebar.jsx               # Left navigation matching reference GIF
│   │   │   └── TypingIndicator.jsx       # Real-time typing indicators
│   │   ├── constants/
│   │   │   ├── emojis.js                 # Categorized emoji dictionary & reactions
│   │   │   └── users.js                  # user_list, avatar colors, roles & generator
│   │   ├── hooks/
│   │   │   └── useChatSocket.js          # Socket.IO client hook with automatic offline fallback
│   │   ├── App.jsx                       # Main chat layout
│   │   ├── index.css                     # Pixel-faithful Slack/PubNub-style CSS
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── photo-gallery/                        # Assignment 2: Infinite Scroll Photo Gallery
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                # "Photo gallery" styled serif header
│   │   │   ├── LoadingSkeleton.jsx       # Shimmer placeholder during pagination
│   │   │   └── PhotoCard.jsx             # 1-column card with FontAwesome thumbs-up icon
│   │   ├── services/
│   │   │   └── photoApi.js               # Picsum API client with proxy & 522 fallback
│   │   ├── App.jsx                       # Infinite scroll via IntersectionObserver
│   │   ├── index.css                     # Clean layout matching photo-gallery.jpg
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── package.json                          # Unified workspace scripts
└── README.md                             # Comprehensive project documentation
```

---

## 💬 Assignment 1: Chat Application (`chat-app`)

### Requirements Checklist

| Requirement | Status | Implementation Details |
|---|:---:|---|
| **Single Page App** | ✅ Complete | Lightweight, reactive SPA built with React 18 & Vite. |
| **Message Thread & Textbox** | ✅ Complete | Scrollable feed with auto-scroll to latest message, responsive input bar below. |
| **Random User Assignment** | ✅ Complete | Randomly selects a user from `const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]` for every sent message. Distinct avatar colors and initials for each user. |
| **Like Button & Counter** | ✅ Complete | Like button on the right edge of each message. Increments count on click with micro-animations. |
| **Visual Fidelity** | ✅ Complete | Modeled after `team-chat-intro.gif` (channel `# Introductions`, pastel avatar badges, bubble styling, sidebar). |
| **Stretch Goal 1: Emojis** | ✅ Complete | Searchable categorized emoji picker modal + quick hover reaction menu (👍, ❤️, 😂, 🎉, 🚀, 🔥). |
| **Stretch Goal 2: @ Mentions** | ✅ Complete | Typing `@` triggers an autocomplete dropdown of team members from `user_list`. Renders interactive `@Name` pills in messages. |
| **Stretch Goal 3: WebSockets** | ✅ Complete | Express + Socket.IO server broadcasting messages, likes, and typing indicators live across multiple connected browser windows. |

### Running the Chat App
```bash
# Option A: From root directory
npm run dev:chat

# Option B: From chat-app directory
cd chat-app
npm run dev
```
- Frontend: `http://localhost:5173`
- Socket.IO Server: `http://localhost:5001`

*(Note: If you run only the frontend with `npm run dev:client`, the app automatically operates in local mode with zero crashes).*

---

## 📷 Assignment 2: Photo Gallery (`photo-gallery`)

### Requirements Checklist

| Requirement | Status | Implementation Details |
|---|:---:|---|
| **Single Page App** | ✅ Complete | Clean React application. |
| **1-Column Layout** | ✅ Complete | Left photo thumbnail, right side `Author: [Name]` and thumbs up button, matching `photo-gallery.jpg`. |
| **Infinite Scrolling** | ✅ Complete | High-performance `IntersectionObserver` observing a sentinel element to pull subsequent pages (`page=1`, `page=2`, etc.) when approaching the bottom. |
| **FontAwesome Thumbs-Up** | ✅ Complete | Uses official `@fortawesome/react-fontawesome` and `faThumbsUp`. Count initialized to 0 and increases on each click. |
| **CORS & Resilience** | ✅ Complete | Vite proxy configured for `/api/picsum` plus resilient fallback dataset if Picsum origin servers experience latency or Cloudflare 522 timeouts. |

### Running the Photo Gallery
```bash
# Option A: From root directory
npm run dev:gallery

# Option B: From photo-gallery directory
cd photo-gallery
npm run dev
```
- Runs at: `http://localhost:5174`

---

## 🚀 Unified Workspace Commands

From the root directory:

| Command | Action |
|---|---|
| `npm run dev:chat` | Starts both Socket.IO server & Chat frontend concurrently |
| `npm run dev:gallery` | Starts Photo Gallery on port 5174 |
| `npm run build` | Builds production bundles for both applications |
| `npm run install:all` | Installs dependencies in both project directories |

---



