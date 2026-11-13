import React, { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { Sidebar } from "./components/Sidebar";
import { TypingIndicator } from "./components/TypingIndicator";
import { useChatSocket } from "./hooks/useChatSocket";
import { Menu, X, ArrowDown } from "lucide-react";

export function App() {
  const [activeChannel, setActiveChannel] = useState("Introductions");
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  const {
    messages,
    isConnected,
    typingUsers,
    sendMessage,
    likeMessage,
    reactToMessage,
    setTyping
  } = useChatSocket();

  const messagesEndRef = useRef(null);
  const messageThreadRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto"
    });
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  // Track scroll position to show "scroll to bottom" button
  const handleScroll = () => {
    if (!messageThreadRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messageThreadRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollBottomBtn(distanceFromBottom > 150);
  };

  return (
    <div className="chat-app-root">
      {/* Mobile Sidebar Overlay */}
      {showSidebarMobile && (
        <div
          className="mobile-backdrop"
          onClick={() => setShowSidebarMobile(false)}
        />
      )}

      {/* Sidebar matching reference image */}
      <div className={`sidebar-container ${showSidebarMobile ? "show" : ""}`}>
        <Sidebar
          activeChannel={activeChannel}
          onSelectChannel={(ch) => {
            setActiveChannel(ch);
            setShowSidebarMobile(false);
          }}
        />
      </div>

      {/* Main Chat Thread Area */}
      <main className="chat-main-area">
        {/* Mobile menu trigger */}
        <div className="mobile-header-bar">
          <button
            className="mobile-toggle-btn"
            onClick={() => setShowSidebarMobile((prev) => !prev)}
            aria-label="Toggle Channel List"
          >
            {showSidebarMobile ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="mobile-channel-name">#{activeChannel}</span>
        </div>

        {/* Channel Header */}
        <ChatHeader
          channelName={activeChannel}
          subtitle="This Channel Is For Company Wide Chatter"
          isConnected={isConnected}
          onlineCount={5}
        />

        {/* Scrollable Message Thread */}
        <div
          className="chat-message-thread"
          ref={messageThreadRef}
          onScroll={handleScroll}
        >
          <div className="thread-welcome-notice">
            <div className="welcome-tag">Beginning of #{activeChannel}</div>
            <p>
              This is the start of the #{activeChannel} channel for ExactSpace team communications.
            </p>
          </div>

          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onLike={likeMessage}
              onReact={reactToMessage}
            />
          ))}

          <TypingIndicator typingUsers={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom floating button */}
        {showScrollBottomBtn && (
          <button
            className="scroll-bottom-floating-btn"
            onClick={() => scrollToBottom(true)}
            title="Scroll to latest messages"
          >
            <ArrowDown size={16} />
            <span>Latest Messages</span>
          </button>
        )}

        {/* Chat Input Container */}
        <footer className="chat-footer">
          <ChatInput
            onSendMessage={sendMessage}
            onTyping={(user, isTyping) => setTyping(user, isTyping)}
          />
        </footer>
      </main>
    </div>
  );
}

export default App;

