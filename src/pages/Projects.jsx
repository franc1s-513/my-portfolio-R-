import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

import { projectsData } from '../data/projectsData';
import GlareHover from '../components/GlareHover';
import PortfolioCarousel from '../components/PortfolioCarousel';

const Projects = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* TOP BAR / BACK NAVIGATION */}
        <div style={styles.topBar}>
          <GlareHover borderRadius="50px">
            <motion.button
              onClick={() => {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={styles.backBtn}
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft size={16} />
              <span>Back to Overview</span>
            </motion.button>
          </GlareHover>
        </div>

        {/* 3D CYLINDRICAL "MY WORKS" ROTATING SHOWCASE */}
        <PortfolioCarousel projects={projectsData} />

      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    padding: '30px 4% 60px 4%',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    zIndex: 20,
    position: 'relative',
  },
  backBtn: {
    padding: '10px 22px',
    borderRadius: '50px',
    border: '1.5px solid #e5a93c',
    background: 'rgba(8, 12, 62, 0.65)',
    color: '#ffffff',
    fontSize: '0.82rem',
    fontWeight: '800',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 8px 20px rgba(8, 12, 62, 0.3)',
    transition: 'all 0.25s ease',
  }
};

export default Projects;