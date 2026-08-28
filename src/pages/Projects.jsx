import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import PortfolioCarousel from '../components/PortfolioCarousel';

const EASE = [0.16, 1, 0.3, 1];

const Projects = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <PortfolioCarousel projects={projectsData} />
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    height: 'calc(100vh - 75px)',
    padding: '0 4%',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  }
};

export default Projects;
