import React from "react";

export const LoadingSkeleton = ({ count = 2 }) => {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="photo-card-row skeleton">
          <div className="photo-image-container skeleton-box" />
          <div className="photo-details-container">
            <div className="skeleton-line" />
            <div className="skeleton-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

