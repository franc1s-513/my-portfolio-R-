import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // High performance spring settings
  const springConfig = { 
    damping: 50, 
    stiffness: 1000, 
    mass: 0.1,
    restDelta: 0.001 // Forces the cursor to land on a sharp pixel
  };
  
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.closest('a') || 
                        target.closest('button') ||
                        target.closest('.cert-card');
      
      setIsHovering(!!isPointer);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        // Critical for sharpness:
        transformStyle: 'preserve-3d',
        WebkitBackfaceVisibility: 'hidden',
        display: window.innerWidth < 768 ? 'none' : 'block',
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 50 : 12,
          height: isHovering ? 50 : 12,
          backgroundColor: isHovering ? 'rgba(14, 165, 233, 0.15)' : '#0ea5e9',
          border: isHovering ? '2px solid #0ea5e9' : '0px solid transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
        style={{
          borderRadius: '50%',
          // Reduced blur slightly to keep it sharp
          backdropFilter: isHovering ? 'blur(2px)' : 'none', 
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;