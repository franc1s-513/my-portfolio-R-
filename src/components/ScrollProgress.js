import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = ({ isDark }) => {
  const { scrollYProgress } = useScroll();
  
  // stiffness 100 / damping 30 provides a smooth "luxury" feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: '#0ea5e9', // Primary Blue
        transformOrigin: '0%',
        zIndex: 2000, 
        // Dynamic glow: Stronger in dark mode, subtle in light mode
        boxShadow: isDark 
          ? '0 0 15px #0ea5e9, 0 0 5px #38bdf8' 
          : '0 0 8px rgba(14, 165, 233, 0.4)',
        scaleX
      }}
    />
  );
};

export default ScrollProgress;