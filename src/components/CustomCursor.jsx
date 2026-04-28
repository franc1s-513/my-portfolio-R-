import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth "lag" configuration for the outer ring
  const springConfig = { damping: 28, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Expand when hovering over interactive elements
      if (
        e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'A' || 
        e.target.closest('.bento-card') ||
        e.target.closest('.glow-pill')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        body, a, button {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          .cursor-container { display: none; }
          body { cursor: auto !important; }
        }
      `}</style>

      <div className="cursor-container" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999 }}>
        
        {/* THE OUTER SOFT RING */}
        <motion.div
          style={{
            position: 'absolute',
            width: isHovered ? 80 : 40,
            height: isHovered ? 80 : 40,
            borderRadius: '50%',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            background: isHovered ? 'rgba(14, 165, 233, 0.05)' : 'transparent',
            transition: 'width 0.3s, height 0.3s, background 0.3s',
          }}
        />

        {/* THE GLOWING INNER DOT */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
          }}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: '#0ea5e9',
            borderRadius: '50%',
            // This creates the "Neon" glow effect
            boxShadow: `
              0 0 10px #0ea5e9,
              0 0 20px #0ea5e9,
              0 0 30px rgba(14, 165, 233, 0.6)
            `,
          }}
        />

        {/* EXTRA AMBIENT FLARE (Optional: follow the dot for a soft light leak) */}
        <div 
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;