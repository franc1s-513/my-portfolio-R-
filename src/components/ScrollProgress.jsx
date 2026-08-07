import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
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
        height: '3px',
        background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 999999,
        boxShadow: '0 0 10px #0ea5e9'
      }}
    />
  );
};

export default ScrollProgress;
