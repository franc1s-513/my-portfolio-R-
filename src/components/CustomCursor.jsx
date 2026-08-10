import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Smooth springs for the outer ring for that buttery lag effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Only enable on desktop/non-touch devices
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768 && !window.matchMedia("(pointer: coarse)").matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 18); // Center the 36px ring
      cursorY.set(e.clientY - 18);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.classList.contains('btn-press') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktop, cursorX, cursorY, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      <style>
        {`
          /* Hide native cursor globally on desktop */
          @media (min-width: 768px) and (pointer: fine) {
            * {
              cursor: none !important;
            }
          }
        `}
      </style>

      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          backgroundColor: '#0ea5e9',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: mousePosition.x - 2.5,
          translateY: mousePosition.y - 2.5,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference'
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1px solid rgba(14, 165, 233, 0.8)',
          boxShadow: '0 0 10px rgba(14, 165, 233, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference'
        }}
        animate={{
          scale: isClicking ? 0.75 : (isHovering ? 1.6 : 1),
          backgroundColor: isHovering ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}