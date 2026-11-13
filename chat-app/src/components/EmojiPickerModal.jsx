import React, { useState } from "react";
import { EMOJI_CATEGORIES } from "../constants/emojis";
import { Search, X } from "lucide-react";

export const EmojiPickerModal = ({ onSelectEmoji, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const allFilteredEmojis = searchQuery.trim()
    ? EMOJI_CATEGORIES.flatMap((c) => c.emojis)
    : EMOJI_CATEGORIES[activeCategory].emojis;

  return (
    <div className="emoji-picker-container" onClick={(e) => e.stopPropagation()}>
      <div className="emoji-picker-header">
        <div className="emoji-search-bar">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search emoji..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <button className="close-btn" onClick={onClose} title="Close">
          <X size={16} />
        </button>
      </div>

      {!searchQuery && (
        <div className="emoji-category-tabs">
          {EMOJI_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              className={`cat-tab ${activeCategory === idx ? "active" : ""}`}
              onClick={() => setActiveCategory(idx)}
            >
              {cat.emojis[0]}
            </button>
          ))}
        </div>
      )}

      <div className="emoji-grid">
        {allFilteredEmojis.map((emoji, index) => (
          <button
            key={`${emoji}-${index}`}
            className="emoji-btn"
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

