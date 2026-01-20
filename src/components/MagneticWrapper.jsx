import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticWrapper = ({ children, sensitivity = 0.4 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const x = (clientX - centerX) * sensitivity;
    const y = (clientY - centerY) * sensitivity;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    // Dispatch a custom event to notify the CustomCursor
    window.dispatchEvent(new CustomEvent('cursorEnter'));
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    // Dispatch a custom event to reset the CustomCursor
    window.dispatchEvent(new CustomEvent('cursorLeave'));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter} // Triggers expansion
      onMouseLeave={handleMouseLeave} // Triggers reset
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;