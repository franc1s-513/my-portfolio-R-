import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, delay = 0, direction = "up" }) => {
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
        x: selectedDirection.x 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      exit={{ 
        opacity: 0, 
        y: -selectedDirection.y,
        transition: { duration: 0.3 } // Exit faster to reduce lag feel
      }}
      style={{ 
        willChange: "transform, opacity",
        width: "100%",
        position: "relative" 
      }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;