import React from "react";

export const TypingIndicator = ({ typingUsers = [] }) => {
  if (typingUsers.length === 0) return null;

  const names = typingUsers.join(", ");
  const label = typingUsers.length === 1 ? `${names} is typing...` : `${names} are typing...`;

  return (
    <div className="typing-indicator-row">
      <div className="typing-dots">
        <span />
        <span />
        <span />
      </div>
      <span className="typing-text">{label}</span>
    </div>
  );
};

