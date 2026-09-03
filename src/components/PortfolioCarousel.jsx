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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = projects.length || 1;

  // Auto-play interval
  useEffect(() => {
    if (isHovered || selectedProject) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, selectedProject, totalItems]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handleCardClick = (index, project, isCenter) => {
    if (isCenter) {
      setSelectedProject(project);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <section 
      className="portfolio-showcase coverflow-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HEADER */}
      <div className="showcase-header">
        <div className="showcase-badge">Selected Works</div>
        <h1 className="showcase-title">
          My <span className="highlight">Works</span>
        </h1>
        <div className="showcase-title-rule" />
      </div>

      {/* MAIN CAROUSEL AREA */}
      <div className="carousel-main-container coverflow-container">
        <button 
          className="nav-arrow-btn nav-arrow-left" 
          onClick={handlePrev}
          aria-label="Previous project"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="coverflow-viewport">
          <AnimatePresence initial={false}>
            {projects.map((project, index) => {
              // Calculate offset considering infinite loop wrapping
              let offset = index - currentIndex;
              if (offset < -Math.floor(totalItems / 2)) offset += totalItems;
              if (offset > Math.floor(totalItems / 2)) offset -= totalItems;

              const isCenter = offset === 0;
              const isLeft = offset < 0;
              const isRight = offset > 0;
              
              const zIndex = 10 - Math.abs(offset);

              // Responsive scaling/translation
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const xOffset = isMobile ? 80 : 180;
              const zPush = isMobile ? -100 : -200;
              
              let x = 0;
              let rotateY = 0;
              let z = isCenter ? 0 : zPush;
              let scale = isCenter ? 1.05 : 0.85 - Math.abs(offset) * 0.1;
              let opacity = isCenter ? 1 : Math.max(0, 0.7 - Math.abs(offset) * 0.3);

              if (isLeft) {
                x = offset * xOffset;
                rotateY = 45;
              } else if (isRight) {
                x = offset * xOffset;
                rotateY = -45;
              }

              // Only render cards that are relatively close to viewport
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={project.id || index}
                  className={`project-coverflow-card ${isCenter ? 'active-card' : ''}`}
                  onClick={() => handleCardClick(index, project, isCenter)}
                  animate={{ 
                    x, 
                    z, 
                    rotateY, 
                    scale, 
                    opacity, 
                    zIndex 
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 260, 
                    damping: 25,
                    mass: 0.8 
                  }}
                  style={{ 
                    position: 'absolute', 
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="card-content-wrapper">
                    {/* Card Visual Header */}
                    <div className="card-img-wrap neon-glow-border">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"; }}
                      />
                      <div className="card-img-overlay" />
                    </div>

                    {/* Card Body Content */}
                    <div className="card-body-panel neon-glow-border">
                      <div className="card-header-row">
                        <h3 className="card-main-title">{project.title}</h3>
                        {project.price && <span className="card-price">{project.price}</span>}
                      </div>
                      
                      <p className="card-desc-paragraph">{project.description}</p>

                      <div className="card-tag-row">
                        {project.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="tag-pill neon-text">{tag}</span>
                        ))}
                      </div>

                      <div className="card-actions-grid">
                        <a
                          href={project.link || project.github || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-btn-action btn-book-now"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {project.link ? 'View Demo' : 'View Code'}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button 
          className="nav-arrow-btn nav-arrow-right" 
          onClick={handleNext}
          aria-label="Next project"
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
