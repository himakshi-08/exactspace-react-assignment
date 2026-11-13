import React from "react";

export const Header = ({ isFallback = false, totalCount = 0 }) => {
  return (
    <header className="gallery-header">
      <div className="header-inner">
        <h1 className="gallery-title">Photo gallery</h1>
        {isFallback && (
          <div className="resilience-notice" title="Picsum server is currently returning high latency or 522 timeouts; displaying curated backup feed.">
            <span>⚡ Offline Resilience Mode active</span>
          </div>
        )}
      </div>
    </header>
  );
};

