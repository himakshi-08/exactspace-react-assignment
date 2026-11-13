# ExactSpace Photo Gallery Application

A single-page, infinite-scrolling photo gallery with FontAwesome thumbs-up like counters, built with **React** and **Vite** for the Exactspace Front End / UI Developer assignment.

---

## 📸 Overview & Features

- **1-Column Layout**: Strict replication of the reference screenshot (`photo-gallery.jpg`).
- **Infinite Scrolling Feed**: Automatically detects when the user scrolls near the bottom of the page and fetches the subsequent page (`https://picsum.photos/v2/list?page=1`, `page=2`, etc.) using high-performance `IntersectionObserver`.
- **Author & Thumbs-Up Counter**:
  - Displays `Author: [Name]` next to each photograph.
  - Official **FontAwesome** solid thumbs-up icon (`faThumbsUp`).
  - Like count initialized to `0` and increments by 1 on every click with micro-animations.
- **Network Resilience & Proxy**:
  - Configured with a dedicated proxy in `vite.config.js` (`/api/picsum`) to eliminate CORS restrictions.
  - Built-in fallback dataset with high-resolution imagery and graceful error boundaries to prevent page breaks if Picsum's servers experience Cloudflare 522 timeouts or network latency.
  - Smooth shimmer/skeleton placeholders during data acquisition.

---

## 🛠️ Project Structure

```
photo-gallery/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # "Photo gallery" title matching serif font
│   │   ├── LoadingSkeleton.jsx # Skeleton placeholders during page fetches
│   │   └── PhotoCard.jsx       # 1-column card with image, author & FontAwesome like
│   ├── services/
│   │   └── photoApi.js         # API integration with proxy and offline resilience
│   ├── App.jsx                 # Infinite scroll logic & like state management
│   ├── index.css               # Pixel-faithful CSS
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd photo-gallery
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5174`.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized bundle in `dist/`.

