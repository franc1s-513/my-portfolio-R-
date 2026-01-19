import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, delay = 0, direction = "up" }) => {
  // Define coordinates based on direction prop
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  const selectedDirection = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: selectedDirection.y, 
        x: selectedDirection.x, 
        filter: "blur(10px)" 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        x: 0, 
        filter: "blur(0px)" 
      }}
      exit={{ 
        opacity: 0, 
        y: -selectedDirection.y, 
        filter: "blur(10px)" 
      }}
      style={{ willChange: "transform, opacity, filter" }}
      transition={{ 
        duration: 0.6, 
        delay: delay, // This allows for staggering
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;