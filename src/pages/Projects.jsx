import React from 'react';
import { projectsData } from '../data/projectsData';
import PortfolioCarousel from '../components/PortfolioCarousel';
import LightRays from '../components/LightRays';

const Projects = () => {
  return (
    <div style={styles.pageWrapper}>
      {/* ETHEREAL DOWNWARD LIGHT RAYS EFFECT */}
      <div style={styles.lightRaysWrapper}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={0.85}
          rayLength={1.6}
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.04}
          distortion={0.03}
        />
      </div>

      <div style={styles.container}>
        <PortfolioCarousel projects={projectsData} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: 'auto',
    padding: '0 2% 20px 2%',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  lightRaysWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.85,
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