import React, { useState } from "react";
import { ThumbsUp, Heart, SmilePlus } from "lucide-react";
import { getUserColor, getUserInitials, USER_METADATA } from "../constants/users";
import { QUICK_REACTIONS } from "../constants/emojis";

export const ChatMessage = ({
  message,
  onLike,
  onReact,
  isCurrentUser = false
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const { id, user, text, timestamp, likes = 0, reactions = {} } = message;
  const avatarColor = getUserColor(user);
  const initials = getUserInitials(user);

  const handleLikeClick = () => {
    setIsLiking(true);
    onLike(id);
    setTimeout(() => setIsLiking(false), 300);
  };

  const handleReactionClick = (emoji) => {
    onReact(id, emoji);
    setShowReactionPicker(false);
  };

  // Parse text to render @mentions with styling
  const renderFormattedText = (content) => {
    if (!content) return null;
    const parts = content.split(/(@[A-Za-z0-9_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        const username = part.slice(1);
        return (
          <span key={index} className="mention-tag" title={`Mentioned ${username}`}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const activeReactions = Object.entries(reactions || {}).filter(([_, count]) => count > 0);

  return (
    <div className={`chat-message-row ${isCurrentUser ? "is-self" : ""}`}>
      {/* Avatar */}
      <div
        className="chat-avatar"
        style={{ backgroundColor: avatarColor }}
        title={`${user} (${USER_METADATA[user]?.role || "Member"})`}
      >
        <span>{initials}</span>
      </div>

      {/* Message Content Container */}
      <div className="chat-content-wrap">
        {/* Header: User name + timestamp */}
        <div className="message-meta">
          <span className="user-name">{user}</span>
          <span className="timestamp">{timestamp}</span>
        </div>

        {/* Message bubble + Like button side by side */}
        <div className="message-main-row">
          <div className="message-bubble">
            <p className="message-text">{renderFormattedText(text)}</p>

            {/* Rendered reactions pill container if any */}
            {activeReactions.length > 0 && (
              <div className="reactions-container">
                {activeReactions.map(([emoji, count]) => (
                  <button
                    key={emoji}
                    className="reaction-badge"
                    onClick={() => handleReactionClick(emoji)}
                    title={`Reacted with ${emoji}`}
                  >
                    <span>{emoji}</span>
                    <span className="reaction-count">{count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Like button at the right end of the chat message */}
          <div className="message-actions-right">
            <button
              className={`like-button ${likes > 0 ? "has-likes" : ""} ${isLiking ? "animate-pop" : ""}`}
              onClick={handleLikeClick}
              title="Like this message"
              aria-label={`Like message (${likes} likes)`}
            >
              <ThumbsUp size={15} className="like-icon" />
              <span className="like-count">{likes}</span>
            </button>

            {/* Quick emoji reaction toggle */}
            <div className="reaction-picker-wrapper">
              <button
                className="add-reaction-btn"
                onClick={() => setShowReactionPicker((prev) => !prev)}
                title="Add emoji reaction"
              >
                <SmilePlus size={14} />
              </button>

              {showReactionPicker && (
                <div className="quick-reaction-popup">
                  {QUICK_REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      className="quick-emoji-btn"
                      onClick={() => handleReactionClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

