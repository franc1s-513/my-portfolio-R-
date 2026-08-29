import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, X } from 'lucide-react';
import GlareHover from './GlareHover';
import './PortfolioCarousel.css';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800";
            }}
          />
          <div className="modal-image-overlay" />
          <div className="modal-category-badge">{project.category}</div>
        </div>

        <div className="modal-details">
          <h2 className="modal-project-title">{project.title}</h2>

          <p className="modal-project-desc">{project.fullDescription || project.description}</p>

          <div className="modal-tags">
            {project.tags?.map((tag, i) => (
              <span key={i} className="modal-tag">{tag}</span>
            ))}
          </div>

          <div className="modal-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-action-btn modal-github-btn"
              >
                <Github size={16} />
                View Source
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-action-btn modal-live-btn"
              >
                <ArrowUpRight size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioCarousel = ({ projects = [] }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [selectedProject, setSelectedProject] = useState(null);
  
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
  const radius = isMobile ? 320 : 460;

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

  const rotateTo = (index) => {
    const normalized = (index % totalItems + totalItems) % totalItems;
    setCurrentIndex(normalized);
    targetRotationRef.current = -index * angleStep;
  };

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
      // Auto-rotation when not interacting
      if (!isDraggingRef.current) {
        // Find nearest snap point to check if we're close to settling
        const nearestIndex = Math.round(-targetRotationRef.current / angleStep);
        const snapRotation = -nearestIndex * angleStep;
        const diffToSnap = Math.abs(targetRotationRef.current - snapRotation);
        
        // If we are settled (very close to a snap point), slowly auto-rotate
        if (diffToSnap < 1) {
          targetRotationRef.current -= 0.12; 
        }
      }

      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.085;

      if (cylinderGroupRef.current) {
        cylinderGroupRef.current.style.transform = `translateZ(-${radius}px) rotateY(${currentRotationRef.current}deg)`;
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

      {/* HEADER WITH GENEROUS SPACING & REFINED SUBTITLE */}
      <div className="showcase-header">
        <div className="showcase-badge">Selected Works</div>
        <h1 className="showcase-title">
          My <span className="highlight">Works</span>
        </h1>
        <div className="showcase-title-rule" />
        <p className="showcase-subtitle">
          Explore interactive architectures, machine learning models, and full-stack systems. Click on the center card to see full details.
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
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    setSelectedProject(project);
                    if (!isCenter) {
                      rotateTo(index);
                    }
                  }}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    opacity: isCenter ? 1 : 0.45,
                    filter: isCenter ? 'brightness(1)' : 'brightness(0.75)',
                    cursor: 'pointer'
                  }}
                >
                  <GlareHover
                    width="100%"
                    height="100%"
                    borderRadius="0px"
                    glareColor="#ffffff"
                    glareOpacity={0.6}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
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

                        <div className="card-divider" />

                        <div>
                          <div className="card-tag-row">
                            {project.tags?.slice(0, 3).map((tag, tIdx) => (
                              <span key={tIdx} className="tag-pill">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="card-actions-grid">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-btn-action btn-live-demo"
                                onClick={(e) => e.stopPropagation()}
                                title="Live Demo"
                              >
                                <span>Demo</span>
                                <ArrowUpRight size={13} />
                              </a>
                            )}

                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`card-btn-action ${project.link ? 'btn-source-code' : 'btn-live-demo'}`}
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
                  </GlareHover>
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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioCarousel;
