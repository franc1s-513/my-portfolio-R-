import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Springs kept for smooth, weightless movement
  const mouseX = useSpring(0, { stiffness: 450, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('cursorEnter', handleMouseEnter);
    window.addEventListener('cursorLeave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('cursorEnter', handleMouseEnter);
      window.removeEventListener('cursorLeave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        // Centering a medium-sized 25px ball
        translateX: '-50%',
        translateY: '-50%',
        width: 25,
        height: 25,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        
        /* PURE WHITE DESIGN */
        backgroundColor: '#ffffff',
        // White glow that stands out against the blue sky
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)',
        
        x: mouseX,
        y: mouseY,
      }}
      animate={{
        // Medium size that grows significantly on hover
        scale: isClicked ? 0.8 : (isHovered ? 2.5 : 1),
        // Glow gets more intense when clicking
        boxShadow: isClicked 
          ? '0 0 40px rgba(255, 255, 255, 0.9)' 
          : '0 0 15px rgba(255, 255, 255, 0.6)',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    />
  );
};

export default CustomCursor;