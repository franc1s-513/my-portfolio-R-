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
  const radius = isMobile ? 260 : 430;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trackpad / Mouse Pad scroll control (wheel event)
  useEffect(() => {
    const viewport = containerRef.current;
    if (!viewport) return;

    const onWheel = (e) => {
      e.preventDefault();
      // Trackpad horizontal swipe (deltaX) or standard wheel (deltaY)
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

  // Smooth lerp physics loop
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

  // Mouse drag & parallax
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
      // Subtle parallax look-around
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const baseSnap = -Math.round(-currentRotationRef.current / angleStep) * angleStep;
      targetRotationRef.current = baseSnap - normX * 12;
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

  // Touch handlers for mobile
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
          min-height: 82vh;
          background: transparent;
          color: #f8fafc;
          padding: 10px 0 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          user-select: none;
        }

        /* HEADER SECTION */
        .showcase-header {
          width: 100%;
          max-width: 900px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          position: relative;
          z-index: 10;
        }

        .heading-center {
          text-align: center;
          flex: 1;
          padding: 0 16px;
        }

        .showcase-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 900;
          color: #080c3e !important;
          -webkit-text-stroke: 1.5px #e5a93c !important;
          paint-order: stroke fill !important;
          letter-spacing: -0.8px;
          margin: 0 0 8px 0;
          line-height: 1.1;
        }

        .showcase-subtitle {
          font-size: 0.95rem;
          color: #ffffff !important;
          -webkit-text-stroke: 0.6px #000000 !important;
          paint-order: stroke fill !important;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.5;
          font-weight: 500;
        }

        /* MINIMAL CIRCULAR ARROW CONTROLS */
        .nav-arrow-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1.5px solid #e5a93c;
          background: rgba(8, 12, 62, 0.7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 20px rgba(8, 12, 62, 0.4);
          flex-shrink: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .nav-arrow-btn:hover {
          background: #e5a93c;
          border-color: #ffffff;
          color: #080c3e;
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(229, 169, 60, 0.6);
        }

        .nav-arrow-btn:active {
          transform: scale(0.95);
        }

        /* 3D CYLINDER VIEWPORT */
        .carousel-viewport {
          width: 100%;
          height: 480px;
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
          width: 290px;
          height: 400px;
          position: absolute;
          transform-style: preserve-3d;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 3D PROJECT CARD */
        .project-3d-card {
          position: absolute;
          width: 290px;
          height: 390px;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(8, 12, 62, 0.7);
          border: 1.5px solid rgba(229, 169, 60, 0.45);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45), 0 0 25px rgba(8, 12, 62, 0.5);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: filter 0.35s ease, opacity 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .project-3d-card.active-card {
          border-color: #e5a93c;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55), 0 0 35px rgba(229, 169, 60, 0.45);
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

        /* BOTTOM OVERLAY INFO PANEL */
        .card-info-panel {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          border-radius: 14px;
          background: rgba(8, 12, 62, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(229, 169, 60, 0.4);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #ffffff;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .card-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .card-category-tag {
          font-size: 0.65rem;
          font-weight: 800;
          color: #00f0ff;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .card-actions-strip {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-action-icon {
          width: 28px;
          height: 28px;
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
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-desc-text {
          font-size: 0.78rem;
          color: #cbd5e1;
          line-height: 1.35;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-pill-row {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .pill-chip {
          padding: 2px 8px;
          border-radius: 50px;
          background: rgba(8, 12, 62, 0.65);
          border: 1px solid #00f0ff;
          font-size: 0.65rem;
          font-weight: 700;
          color: #00f0ff;
          letter-spacing: 0.2px;
        }

        /* INSTRUCTION HINT */
        .interaction-hint {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(8, 12, 62, 0.5);
          padding: 6px 16px;
          border-radius: 50px;
          border: 1px solid rgba(229, 169, 60, 0.3);
          backdrop-filter: blur(8px);
        }

        @media (max-width: 768px) {
          .showcase-header {
            margin-bottom: 20px;
          }
          .showcase-title {
            font-size: 2rem;
          }
          .nav-arrow-btn {
            width: 40px;
            height: 40px;
          }
          .carousel-viewport {
            height: 400px;
          }
          .cylinder-drum {
            width: 240px;
            height: 330px;
          }
          .project-3d-card {
            width: 230px;
            height: 320px;
          }
        }
      `}</style>

      {/* CLEAN HEADER ROW WITH FLANKING ARROWS */}
      <div className="showcase-header">
        <button 
          className="nav-arrow-btn" 
          onClick={handlePrev}
          aria-label="Previous project"
          title="Previous (or Swipe Left)"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="heading-center">
          <h1 className="showcase-title">My Works</h1>
          <p className="showcase-subtitle">
            Drag, swipe, or use your mouse pad to spin through my engineering projects.
          </p>
        </div>

        <button 
          className="nav-arrow-btn" 
          onClick={handleNext}
          aria-label="Next project"
          title="Next (or Swipe Right)"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* 3D DRUM VIEWPORT (SUPPORTS MOUSE PAD SCROLL / DRAG / PARALLAX) */}
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

                {/* Floating Bottom Info Panel */}
                <div 
                  className="card-info-panel"
                  style={{
                    opacity: isCenter ? 1 : 0.4,
                    transform: isCenter ? 'translateY(0)' : 'translateY(6px)'
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
                          <Github size={14} />
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
                        <ArrowUpRight size={15} />
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

      {/* TRACKPAD / MOUSE PAD INTERACTION HINT */}
      <div className="interaction-hint">
        <span>↔ Swipe on your trackpad or drag with mouse to spin</span>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
