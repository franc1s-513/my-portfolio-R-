import React from 'react';
import { projectsData } from '../data/projectsData';
import PortfolioCarousel from '../components/PortfolioCarousel';

const Projects = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <PortfolioCarousel projects={projectsData} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '85vh',
    padding: '0 4% 40px 4%',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
  }
};

export default Projects;