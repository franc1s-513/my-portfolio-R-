import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';

const PortfolioCarousel = ({ projects = [] }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  
  // Physics / Animation refs
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const cylinderGroupRef = useRef(null);

  const totalItems = projects.length || 1;
  const angleStep = 360 / totalItems;
  // Compact radius for balanced perspective
  const radius = isMobile ? 210 : 350;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trackpad / Mouse Pad wheel swipe support
  useEffect(() => {
    const viewport = containerRef.current;
    if (!viewport) return;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetRotationRef.current -= delta * 0.16;
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, []);

  const rotateTo = useCallback((index) => {
    const normalized = (index % totalItems + totalItems) % totalItems;
    setCurrentIndex(normalized);
    targetRotationRef.current = -index * angleStep;
  }, [totalItems, angleStep]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + totalItems) % totalItems;
      targetRotationRef.current += angleStep;
      return next;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % totalItems;
      targetRotationRef.current -= angleStep;
      return next;
    });
  };

  // Smooth lerp loop
  useEffect(() => {
    const loop = () => {
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.085;

      if (cylinderGroupRef.current) {
        cylinderGroupRef.current.style.transform = `rotateY(${currentRotationRef.current}deg)`;
      }

      const rawIndex = Math.round(-currentRotationRef.current / angleStep);
      const activeIdx = (rawIndex % totalItems + totalItems) % totalItems;
      setCurrentIndex((prev) => (prev !== activeIdx ? activeIdx : prev));

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [angleStep, totalItems]);

  // Mouse handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;
      targetRotationRef.current += deltaX * 0.28;
    } else {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const baseSnap = -Math.round(-currentRotationRef.current / angleStep) * angleStep;
      targetRotationRef.current = baseSnap - normX * 10;
    }
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const nearestIndex = Math.round(-targetRotationRef.current / angleStep);
      targetRotationRef.current = -nearestIndex * angleStep;
      setCurrentIndex((nearestIndex % totalItems + totalItems) % totalItems);
    }
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
    const nearestIndex = Math.round(-targetRotationRef.current / angleStep);
    targetRotationRef.current = -nearestIndex * angleStep;
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    lastMouseXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.touches[0].clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.touches[0].clientX;
    targetRotationRef.current += deltaX * 0.35;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    const nearestIndex = Math.round(-targetRotationRef.current / angleStep);
    targetRotationRef.current = -nearestIndex * angleStep;
    setCurrentIndex((nearestIndex % totalItems + totalItems) % totalItems);
  };

  return (
    <section className="portfolio-showcase">
      <style>{`
        .portfolio-showcase {
          width: 100%;
          background: transparent;
          color: #f8fafc;
          padding: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          user-select: none;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* HEADER SECTION */
        .showcase-header {
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
        }

        .showcase-title {
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          color: #080c3e !important;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 2px 20px rgba(14, 165, 233, 0.2);
        }

        /* CAROUSEL CONTAINER WITH FLANKING ARROWS */
        .carousel-main-container {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MINIMAL CIRCULAR ARROW CONTROLS POSITIONED ON SIDES */
        .nav-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid #e5a93c;
          background: rgba(8, 12, 62, 0.75);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(8, 12, 62, 0.4);
          flex-shrink: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 25;
        }

        .nav-arrow-left {
          left: 15px;
        }

        .nav-arrow-right {
          right: 15px;
        }

        .nav-arrow-btn:hover {
          background: #e5a93c;
          border-color: #ffffff;
          color: #080c3e;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 25px rgba(229, 169, 60, 0.6);
        }

        .nav-arrow-btn:active {
          transform: translateY(-50%) scale(0.95);
        }

        /* 3D CYLINDER VIEWPORT - COMPACT & CLEAN */
        .carousel-viewport {
          width: 100%;
          height: 360px;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: grab;
          z-index: 5;
        }

        .carousel-viewport:active {
          cursor: grabbing;
        }

        .cylinder-drum {
          width: 230px;
          height: 330px;
          position: absolute;
          transform-style: preserve-3d;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 3D COMPACT PROJECT CARD */
        .project-3d-card {
          position: absolute;
          width: 230px;
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(8, 12, 62, 0.75);
          border: 1.5px solid rgba(229, 169, 60, 0.45);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(8, 12, 62, 0.4);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: filter 0.35s ease, opacity 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .project-3d-card.active-card {
          border-color: #e5a93c;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(229, 169, 60, 0.4);
        }

        .card-img-wrap {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .project-3d-card:hover .card-img-wrap img {
          transform: scale(1.06);
        }

        /* BOTTOM OVERLAY INFO PANEL (COMPACT) */
        .card-info-panel {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          border-radius: 12px;
          background: rgba(8, 12, 62, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.2px solid rgba(229, 169, 60, 0.4);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
          transition: all 0.3s ease;
        }

        .card-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }

        .card-category-tag {
          font-size: 0.62rem;
          font-weight: 800;
          color: #00f0ff;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .card-actions-strip {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .card-action-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(229, 169, 60, 0.2);
          border: 1px solid #e5a93c;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .card-action-icon:hover {
          background: #e5a93c;
          color: #080c3e;
          transform: scale(1.15);
        }

        .card-title-text {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-desc-text {
          font-size: 0.72rem;
          color: #cbd5e1;
          line-height: 1.3;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-pill-row {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .pill-chip {
          padding: 2px 6px;
          border-radius: 50px;
          background: rgba(8, 12, 62, 0.65);
          border: 1px solid #00f0ff;
          font-size: 0.6rem;
          font-weight: 700;
          color: #00f0ff;
          letter-spacing: 0.2px;
        }

        @media (max-width: 768px) {
          .showcase-header {
            margin-bottom: 12px;
          }
          .showcase-title {
            font-size: 1.8rem;
          }
          .nav-arrow-btn {
            width: 38px;
            height: 38px;
          }
          .nav-arrow-left {
            left: 5px;
          }
          .nav-arrow-right {
            right: 5px;
          }
          .carousel-viewport {
            height: 330px;
          }
          .cylinder-drum {
            width: 200px;
            height: 290px;
          }
          .project-3d-card {
            width: 190px;
            height: 280px;
          }
        }
      `}</style>

      {/* HEADER WITH TITLE */}
      <div className="showcase-header">
        <h1 className="showcase-title">My Works</h1>
      </div>

      {/* MAIN CAROUSEL AREA WITH SIDE CONTROLS */}
      <div className="carousel-main-container">
        <button 
          className="nav-arrow-btn nav-arrow-left" 
          onClick={handlePrev}
          aria-label="Previous project"
          title="Previous (or Swipe Left)"
        >
          <ArrowLeft size={20} />
        </button>

        {/* 3D DRUM VIEWPORT */}
        <div 
          className="carousel-viewport"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="cylinder-drum" ref={cylinderGroupRef}>
            {projects.map((project, index) => {
              const cardAngle = index * angleStep;
              const isCenter = currentIndex === index;

              return (
                <div
                  key={project.id || index}
                  className={`project-3d-card ${isCenter ? 'active-card' : ''}`}
                  onClick={() => rotateTo(index)}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  opacity: isCenter ? 1 : 0.55,
                  filter: isCenter ? 'brightness(1)' : 'brightness(0.7)',
                  cursor: 'pointer'
                }}
              >
                {/* Full-bleed Thumbnail */}
                <div className="card-img-wrap">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800";
                    }}
                  />
                </div>

                {/* Compact Floating Bottom Info Panel */}
                <div 
                  className="card-info-panel"
                  style={{
                    opacity: isCenter ? 1 : 0.35,
                    transform: isCenter ? 'translateY(0)' : 'translateY(4px)'
                  }}
                >
                  <div className="card-top-meta">
                    <span className="card-category-tag">{project.category}</span>
                    <div className="card-actions-strip">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-action-icon"
                          onClick={(e) => e.stopPropagation()}
                          title="View Source Code"
                        >
                          <Github size={12} />
                        </a>
                      )}
                      <a
                        href={project.link || project.github || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-action-icon"
                        onClick={(e) => e.stopPropagation()}
                        title="Live Demo"
                      >
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>

                  <h3 className="card-title-text">{project.title}</h3>

                  <p className="card-desc-text">
                    {project.description}
                  </p>

                  <div className="card-pill-row">
                    {project.tags?.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="pill-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button 
        className="nav-arrow-btn nav-arrow-right" 
        onClick={handleNext}
        aria-label="Next project"
        title="Next (or Swipe Right)"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  </section>
);
};

export default PortfolioCarousel;
