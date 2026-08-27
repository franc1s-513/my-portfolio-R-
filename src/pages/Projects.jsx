import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import PortfolioCarousel from '../components/PortfolioCarousel';
import LightRays from '../components/LightRays';

const EASE = [0.16, 1, 0.3, 1];

const Projects = () => {
  return (
    <div style={styles.pageWrapper}>
      {/* ETHEREAL DOWNWARD LIGHT RAYS EFFECT */}
      <div style={styles.lightRaysWrapper}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.4}
          lightSpread={0.9}
          rayLength={1.7}
          pulsating={true}
          fadeDistance={1.3}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.03}
          distortion={0.03}
        />
      </div>

      {/* SOFT LIGHT HALO BEHIND SHOWCASE */}
      <div style={styles.lightHalo} />

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
    minHeight: '85vh',
    padding: '0 4% 40px 4%',
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    opacity: 0.9,
  },
  lightHalo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '110%',
    height: '110%',
    pointerEvents: 'none',
    zIndex: 1,
    background:
      'radial-gradient(closest-side, rgba(240, 248, 255, 0.85) 0%, rgba(224, 242, 254, 0.45) 45%, transparent 75%)',
    filter: 'blur(30px)',
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
