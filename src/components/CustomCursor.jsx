import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics: Stiffness 500 + Damping 30 = Fast, snappy, no wobble
  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.closest('a') || 
                        target.closest('button');
      setIsHovering(!!isPointer);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* 1. THE MAIN AURA (The part that expands) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          // Mix-blend-mode: difference makes it invert colors over text/images
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            backgroundColor: isHovering ? 'white' : 'transparent',
            border: isHovering ? 'none' : '1.5px solid white',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>

      {/* 2. THE PRECISION DOT (Stays small and sharp) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: mouseX, // No spring here for 0 latency
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : 1,
          }}
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#0ea5e9', // Your accent color
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;