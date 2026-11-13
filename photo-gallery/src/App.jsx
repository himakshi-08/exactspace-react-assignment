import React, { useState, useEffect, useRef, useCallback } from "react";
import { PhotoCard } from "./components/PhotoCard";
import { Header } from "./components/Header";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { fetchPhotosPage } from "./services/photoApi";

export function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // Fetch page data
  const loadPage = useCallback(async (pageNum) => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, isFallback: fallbackUsed } = await fetchPhotosPage(pageNum, 10);

      if (fallbackUsed) setIsFallback(true);

      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          // Prevent duplicates by id
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = data
            .filter((item) => !existingIds.has(item.id))
            .map((item) => ({ ...item, likes: item.likes || 0 }));
          return [...prev, ...newItems];
        });
        setPage(pageNum);
      }
    } catch (err) {
      console.error("[App] Failed to load photos:", err);
      setErrorMessage("Unable to fetch photos. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial load on mount
  useEffect(() => {
    loadPage(1);
  }, []);

  // Infinite scroll intersection observer
  useEffect(() => {
    if (!hasMore || loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadPage(page + 1);
        }
      },
      {
        root: null,
        rootMargin: "250px", // prefetch before reaching bottom
        threshold: 0.1
      }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [page, loading, hasMore, loadPage]);

  // Handle thumbs-up like increment
  const handleLike = (photoId) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId
          ? { ...photo, likes: (photo.likes || 0) + 1 }
          : photo
      )
    );
  };

  return (
    <div className="gallery-container">
      {/* Top Header */}
      <Header isFallback={isFallback} totalCount={photos.length} />

      {/* 1 Column View matching reference image */}
      <main className="gallery-main-column">
        <div className="photo-list">
          {photos.map((item) => (
            <PhotoCard key={item.id} item={item} onLike={handleLike} />
          ))}
        </div>

        {/* Loading skeleton / indicator */}
        {loading && <LoadingSkeleton count={3} />}

        {/* Error message retry */}
        {errorMessage && (
          <div className="error-banner">
            <p>{errorMessage}</p>
            <button className="retry-btn" onClick={() => loadPage(page)}>
              Retry
            </button>
          </div>
        )}

        {/* End of feed message */}
        {!hasMore && (
          <div className="end-of-feed">
            <p>You have reached the end of the photo gallery!</p>
          </div>
        )}

        {/* Sentinel element for infinite scroll */}
        <div ref={sentinelRef} className="scroll-sentinel" />
      </main>
    </div>
  );
}

export default App;

