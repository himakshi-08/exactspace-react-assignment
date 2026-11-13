import React from "react";
import { Hash, Plus, MessageSquare, ChevronDown } from "lucide-react";

export const Sidebar = ({ activeChannel = "Introductions", onSelectChannel }) => {
  const channels = [
    { id: "poland", name: "Poland Office" },
    { id: "introductions", name: "Introductions" },
    { id: "india", name: "India Office" }
  ];

  return (
    <aside className="chat-sidebar">
      {/* User profile header matching reference gif */}
      <div className="sidebar-profile">
        <div className="avatar-wrapper">
          <div className="profile-avatar">RR</div>
          <span className="online-badge" />
        </div>
        <div className="profile-details">
          <h3 className="profile-name">Rolande Raimondi</h3>
          <p className="profile-role">Research Nurse</p>
        </div>
      </div>

      {/* Conversations Section */}
      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-title">Conversations</span>
          <button className="add-channel-btn" title="Add Conversation">
            <Plus size={16} />
          </button>
        </div>

        <nav className="channel-list">
          {channels.map((ch) => {
            const isActive = ch.name.toLowerCase() === activeChannel.toLowerCase();
            return (
              <button
                key={ch.id}
                className={`channel-item ${isActive ? "active" : ""}`}
                onClick={() => onSelectChannel && onSelectChannel(ch.name)}
              >
                <div className="channel-icon-box">
                  <Hash size={16} />
                </div>
                <span className="channel-name">{ch.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <div className="exactspace-brand">
          <span className="brand-dot" />
          <span>ExactSpace Chat</span>
        </div>
      </div>
    </aside>
  );
};

