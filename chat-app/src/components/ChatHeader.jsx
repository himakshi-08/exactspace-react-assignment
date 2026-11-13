import React from "react";
import { Users, Hash, ShieldCheck, Wifi, WifiOff } from "lucide-react";

export const ChatHeader = ({ channelName = "Introductions", subtitle = "This Channel Is For Company Wide Chatter", isConnected = false, onlineCount = 5 }) => {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="channel-title-row">
          <Hash className="hash-icon" size={20} />
          <h2 className="channel-title">{channelName}</h2>
          <span className={`connection-badge ${isConnected ? "connected" : "standalone"}`} title={isConnected ? "WebSocket connected to Express server" : "Running in client-side state mode"}>
            {isConnected ? (
              <>
                <Wifi size={13} />
                <span>Socket.IO Live</span>
              </>
            ) : (
              <>
                <WifiOff size={13} />
                <span>Local Mode</span>
              </>
            )}
          </span>
        </div>
        <p className="channel-subtitle">{subtitle}</p>
      </div>

      <div className="header-right">
        <div className="member-count" title="3 active now | 100 total channel members">
          <Users size={16} />
          <span>{onlineCount} | 100</span>
        </div>
      </div>
    </div>
  );
};

