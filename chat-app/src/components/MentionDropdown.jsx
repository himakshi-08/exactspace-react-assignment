import React, { useEffect, useRef } from "react";
import { USER_LIST, USER_METADATA } from "../constants/users";
import { AtSign } from "lucide-react";

export const MentionDropdown = ({ filter = "", onSelectUser, selectedIndex = 0 }) => {
  const filteredUsers = USER_LIST.filter((user) =>
    user.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredUsers.length === 0) {
    return (
      <div className="mention-dropdown empty">
        <span className="no-users">No users match "@{filter}"</span>
      </div>
    );
  }

  return (
    <div className="mention-dropdown" role="listbox">
      <div className="mention-header">
        <AtSign size={13} />
        <span>Mention someone from the team</span>
      </div>
      <div className="mention-list">
        {filteredUsers.map((userName, idx) => {
          const meta = USER_METADATA[userName] || {};
          const isSelected = idx === selectedIndex;

          return (
            <div
              key={userName}
              className={`mention-item ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectUser(userName)}
              role="option"
              aria-selected={isSelected}
            >
              <div
                className="user-avatar-mini"
                style={{ backgroundColor: meta.color || "#888" }}
              >
                {meta.initials || userName.slice(0, 2)}
              </div>
              <div className="mention-info">
                <span className="user-name">@{userName}</span>
                <span className="user-role">{meta.role || "Team Member"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

