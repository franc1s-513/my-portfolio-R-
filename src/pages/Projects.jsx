import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AshenPress from '../components/AshenPress/AshenPress';

const EASE = [0.16, 1, 0.3, 1];

const Projects = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* HEADER BAR */}
        <div style={styles.headerBar}>
          <div style={styles.headerLeft}>
            <span style={styles.badge}>
              <Sparkles size={13} style={{ marginRight: '5px' }} />
              Tactile 3D Showcase
            </span>
            <h1 style={styles.title}>
              Engineering <span style={styles.highlight}>Works</span>
            </h1>
            <p style={styles.subtitle}>
              Browse interactive clothbound volumes on reflective oak furniture with full 3D tactile inspection.
            </p>
          </div>
        </div>

        {/* INTERACTION HINT FOR 3D SHELF */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={styles.instructionBanner}
        >
          <span style={styles.instructionDot} />
          <span>Pointer camera orbit · Click any book to inspect · "Look Inside" flips volume · Drag to rotate in 3D</span>
        </motion.div>

        {/* MAIN 3D DISPLAY AREA */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={styles.shelfContainer}
        >
          <AshenPress
            onSelectProject={(proj) => {
              console.log('Selected book:', proj);
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    padding: '80px 4% 60px',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: '100%',
    maxWidth: '1380px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  headerBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '24px',
    padding: '0 4px',
  },
  headerLeft: {
    maxWidth: '750px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 14px',
    background: 'rgba(14, 165, 233, 0.12)',
    border: '1px solid rgba(14, 165, 233, 0.3)',
    borderRadius: '999px',
    color: '#0284c7',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '10px',
    backdropFilter: 'blur(8px)',
  },
  title: {
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 8px',
    lineHeight: 1.15,
  },
  highlight: {
    background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: 1.5,
    margin: 0,
  },
  instructionBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '8px',
    border: '1px solid rgba(203, 213, 225, 0.8)',
    fontSize: '0.8rem',
    color: '#475569',
    marginBottom: '18px',
    width: 'fit-content',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
  },
  instructionDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#0284c7',
    display: 'inline-block',
  },
  shelfContainer: {
    width: '100%',
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
  },
};

export default Projects;
