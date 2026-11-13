import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export const PhotoCard = ({ item, onLike }) => {
  const { id, author, download_url, likes = 0 } = item;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    onLike(id);
    setTimeout(() => setIsAnimating(false), 250);
  };

  return (
    <article className="photo-card-row">
      {/* Left side: Photo */}
      <div className="photo-image-container">
        {!imageLoaded && <div className="photo-placeholder-shimmer" />}
        <img
          src={download_url}
          alt={`Photo by ${author}`}
          loading="lazy"
          className={`gallery-photo ${imageLoaded ? "loaded" : "loading"}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Graceful fallback image if specific image fails
            e.currentTarget.src = `https://picsum.photos/seed/${id}/600/400`;
            setImageLoaded(true);
          }}
        />
      </div>

      {/* Right side: Author and Thumbs Up */}
      <div className="photo-details-container">
        <span className="author-text">
          <strong>Author:</strong> {author}
        </span>

        <button
          type="button"
          className={`thumbs-up-btn ${isAnimating ? "clicked" : ""}`}
          onClick={handleLike}
          aria-label={`Like photo by ${author}. Current count: ${likes}`}
          title="Click to like (thumbs up)"
        >
          <FontAwesomeIcon icon={faThumbsUp} className="fa-thumbs-up-icon" />
          <span className="like-counter">{likes}</span>
        </button>
      </div>
    </article>
  );
};

