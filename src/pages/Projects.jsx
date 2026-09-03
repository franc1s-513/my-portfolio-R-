import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import PortfolioCarousel from '../components/PortfolioCarousel';
import { ExternalLink, Github } from 'lucide-react';
import './ProjectsTable.css'; // We'll add table styles to PortfolioCarousel.css, or inline. Let's just use regular classes.

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
    minHeight: '100vh',
    padding: '100px 4% 50px',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
