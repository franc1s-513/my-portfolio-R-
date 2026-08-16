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
          raysColor="#38bdf8"
          raysSpeed={0.8}
          lightSpread={1.5}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.4}
          saturation={1.3}
          followMouse={true}
          mouseInfluence={0.25}
          noiseAmount={0.03}
          distortion={0.04}
        />
      </div>

      {/* FOCUSED SPOTLIGHT CONE ILLUMINATING THE CAROUSEL */}
      <div style={styles.spotlightCone} />

      <div style={styles.container}>
        <PortfolioCarousel projects={projectsData} />
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: 'auto',
    padding: '20px 2% 40px 2%',
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
    opacity: 0.95,
  },
  spotlightCone: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'min(900px, 95vw)',
    height: '480px',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.28) 0%, rgba(14, 165, 233, 0.12) 45%, transparent 75%)',
    filter: 'blur(25px)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  container: {
    width: '100%',
    maxWidth: '1350px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  }
};

export default Projects;