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
  // Radius tuned for spacious 3D cylinder
  const radius = isMobile ? 240 : 380;

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
          padding: 10px 0 30px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          user-select: none;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        /* HEADER SECTION WITH GENEROUS SPACING */
        .showcase-header {
          width: 100%;
          text-align: center;
          margin-bottom: 55px;
          position: relative;
          z-index: 10;
        }

        .showcase-badge {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: #38bdf8;
          background: rgba(14, 165, 233, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .showcase-title {
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 4.5vw, 3.4rem);
          font-weight: 900;
          color: #080c3e;
          letter-spacing: -0.8px;
          margin: 0 0 10px 0;
          line-height: 1.1;
          text-shadow: 0 2px 20px rgba(14, 165, 233, 0.2);
        }

        .showcase-subtitle {
          font-size: 0.95rem;
          color: #475569;
          font-weight: 500;
          margin: 0 auto;
          max-width: 500px;
          line-height: 1.5;
        }

        /* CAROUSEL CONTAINER WITH FLANKING ARROWS */
        .carousel-main-container {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MINIMAL CIRCULAR ARROW CONTROLS */
        .nav-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.75);
          color: #080c3e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.8);
          flex-shrink: 0;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 25;
        }

        .nav-arrow-left {
          left: 10px;
        }

        .nav-arrow-right {
          right: 10px;
        }

        .nav-arrow-btn:hover {
          background: #0ea5e9;
          border-color: #38bdf8;
          color: #ffffff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 30px rgba(14, 165, 233, 0.45);
        }

        .nav-arrow-btn:active {
          transform: translateY(-50%) scale(0.95);
        }

        /* 3D CYLINDER VIEWPORT */
        .carousel-viewport {
          width: 100%;
          height: 440px;
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
          height: 410px;
          position: absolute;
          transform-style: preserve-3d;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* PREMIUM GLASSMORPHIC PROJECT CARD */
        .project-3d-card {
          position: absolute;
          width: 290px;
          height: 410px;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: filter 0.35s ease, opacity 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .project-3d-card.active-card {
          border-color: #0ea5e9;
          box-shadow: 0 25px 60px rgba(14, 165, 233, 0.25), 0 0 30px rgba(56, 189, 248, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.9);
          transform: scale(1.03);
        }

        /* CARD HEADER / THUMBNAIL */
        .card-img-wrap {
          width: 100%;
          height: 165px;
          position: relative;
          overflow: hidden;
          background: #0f172a;
        }

        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .project-3d-card:hover .card-img-wrap img {
          transform: scale(1.08);
        }

        .card-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 800;
          color: #ffffff;
          background: rgba(8, 12, 62, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .card-status-dot {
          position: absolute;
          top: 14px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          padding: 3px 8px;
          border-radius: 12px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }

        /* CARD CONTENT BODY */
        .card-body-panel {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.4);
        }

        .card-main-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #080c3e;
          margin: 0 0 6px 0;
          letter-spacing: -0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-desc-paragraph {
          font-size: 0.8rem;
          color: #334155;
          line-height: 1.45;
          margin: 0 0 10px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 400;
        }

        /* TAGS PILL ROW */
        .card-tag-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .tag-pill {
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(14, 165, 233, 0.12);
          border: 1px solid rgba(14, 165, 233, 0.3);
          font-size: 0.65rem;
          font-weight: 700;
          color: #0284c7;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ACTION BUTTONS GRID */
        .card-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
        }

        .card-btn-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-live-demo {
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
        }

        .btn-live-demo:hover {
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          box-shadow: 0 6px 18px rgba(14, 165, 233, 0.5);
          transform: translateY(-1px);
        }

        .btn-source-code {
          background: rgba(255, 255, 255, 0.8);
          color: #080c3e;
          border: 1px solid rgba(14, 165, 233, 0.35);
        }

        .btn-source-code:hover {
          background: rgba(14, 165, 233, 0.15);
          border-color: #0ea5e9;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .showcase-header {
            margin-bottom: 35px;
          }
          .showcase-title {
            font-size: 2rem;
          }
          .nav-arrow-btn {
            width: 42px;
            height: 42px;
          }
          .nav-arrow-left {
            left: 5px;
          }
          .nav-arrow-right {
            right: 5px;
          }
          .carousel-viewport {
            height: 380px;
          }
          .cylinder-drum {
            width: 230px;
            height: 340px;
          }
          .project-3d-card {
            width: 230px;
            height: 340px;
            border-radius: 18px;
          }
          .card-img-wrap {
            height: 130px;
          }
          .card-body-panel {
            padding: 12px 14px 14px;
          }
          .card-main-title {
            font-size: 1rem;
          }
          .card-desc-paragraph {
            font-size: 0.72rem;
            margin-bottom: 6px;
          }
        }
      `}</style>

      {/* HEADER WITH GENEROUS SPACING & REFINED SUBTITLE */}
      <div className="showcase-header">
        <div className="showcase-badge">03 / Selected Works</div>
        <h1 className="showcase-title">My Works</h1>
        <p className="showcase-subtitle">
          Explore interactive architectures, machine learning models, and full-stack systems.
        </p>
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
                    opacity: isCenter ? 1 : 0.45,
                    filter: isCenter ? 'brightness(1)' : 'brightness(0.75)',
                    cursor: 'pointer'
                  }}
                >
                  {/* Card Visual Header */}
                  <div className="card-img-wrap">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800";
                      }}
                    />
                    <span className="card-category-badge">{project.category}</span>
                    <div className="card-status-dot">
                      <div className="live-dot" />
                      <span>{project.status || 'Active'}</span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="card-body-panel">
                    <div>
                      <h3 className="card-main-title">{project.title}</h3>
                      <p className="card-desc-paragraph">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="card-tag-row">
                        {project.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="card-actions-grid">
                        <a
                          href={project.link || project.github || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-btn-action btn-live-demo"
                          onClick={(e) => e.stopPropagation()}
                          title="Live Demo"
                        >
                          <span>Demo</span>
                          <ArrowUpRight size={13} />
                        </a>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-btn-action btn-source-code"
                            onClick={(e) => e.stopPropagation()}
                            title="View Source Code"
                          >
                            <Github size={13} />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
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
