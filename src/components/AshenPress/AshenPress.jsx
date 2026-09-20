import React, { useState, useEffect, useRef } from 'react';
import './AshenPress.css';

export function AshenPress({ className = "", style = {}, onSelectProject, onNavigate }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Visibility & Intersection Observers
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry?.isIntersecting ?? true);
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const shouldMount = isIntersecting && isVisible;

  const [prevShouldMount, setPrevShouldMount] = useState(shouldMount);
  if (prevShouldMount !== shouldMount) {
    setPrevShouldMount(shouldMount);
    setIsLoaded(false);
  }

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'ASHEN_BOOK_SELECTED') {
        if (onSelectProject) {
          onSelectProject(e.data.project);
        }
      } else if (e.data && e.data.type === 'ASHEN_NAVIGATE') {
        if (onNavigate) {
          onNavigate(e.data.page);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSelectProject, onNavigate]);

  return (
    <div
      ref={containerRef}
      className={`ashen-press-wrapper ${className}`}
      role="group"
      aria-label="Interactive Ashen Press art book shelf"
      data-state={shouldMount ? (isLoaded ? "ready" : "loading") : "paused"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "720px",
        overflow: "hidden",
        background: "#eae2d3",
        borderRadius: "24px",
        boxShadow: "0 28px 70px -15px rgba(27, 21, 15, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
        ...style,
      }}
    >
      {!isLoaded && shouldMount && (
        <div className="ashen-press-loader">
          <div className="ashen-loader-spinner" />
          <p className="ashen-loader-text">Loading 3D Art-Book Shelf...</p>
        </div>
      )}

      {shouldMount && (
        <iframe
          title="Ashen Press — The Art Book Shelf"
          src="/ashen-press.html"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          loading="eager"
          onLoad={() => setIsLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#eae2d3",
            opacity: isLoaded ? 1 : 0,
            pointerEvents: isLoaded ? "auto" : "none",
            transition: "opacity 320ms ease-out",
          }}
        />
      )}
    </div>
  );
}

export default AshenPress;
