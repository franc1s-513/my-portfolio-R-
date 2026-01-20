import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Listening for the signals from MagneticWrapper.jsx
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('cursorEnter', handleMouseEnter);
    window.addEventListener('cursorLeave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursorEnter', handleMouseEnter);
      window.removeEventListener('cursorLeave', handleMouseLeave);
    };
  }, []);

  // CONFIGURATION: Adjust these for size
  const normalSize = 20;
  const zoomSize = 40; // Reduced from 60 for a smaller ring

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovered ? zoomSize : normalSize,
        height: isHovered ? zoomSize : normalSize,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : '#0ea5e9',
        border: isHovered ? '1.5px solid #fff' : 'none',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
      animate={{
        // We subtract half the size to keep the cursor centered on the mouse tip
        x: mousePosition.x - (isHovered ? zoomSize / 2 : normalSize / 2),
        y: mousePosition.y - (isHovered ? zoomSize / 2 : normalSize / 2),
        scale: isHovered ? 1.2 : 1, // Reduced scale from 1.5 to 1.2
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, // Higher stiffness for a snappier feel
        damping: 25, 
        mass: 0.5 
      }}
    />
  );
};

export default CustomCursor;