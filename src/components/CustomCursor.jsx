import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768 && !window.matchMedia("(pointer: coarse)").matches);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice, { passive: true });
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Add/remove cursor-active class on body for CSS fallback
  useEffect(() => {
    if (isDesktop) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => document.body.classList.remove('custom-cursor-active');
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      dotX.set(e.clientX - 2.5);
      dotY.set(e.clientY - 2.5);
      cursorX.set(e.clientX - 18);
      cursorY.set(e.clientY - 18);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const isInteractive = Boolean(e.target.closest('a, button, [role="button"], .interactive, .btn-press, input, textarea'));
      setIsHovering((prev) => (prev !== isInteractive ? isInteractive : prev));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktop, dotX, dotY, cursorX, cursorY, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          x: dotX,
          y: dotY,
          opacity: 0, // Hidden as per design review
          mixBlendMode: 'difference'
        }}
        animate={{ scale: isClicking ? 0.5 : 1 }}
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
          border: '1.5px solid rgba(217, 119, 54, 0.92)',
          boxShadow: '0 0 0 1px rgba(20, 16, 12, 0.35), 0 0 14px rgba(217, 119, 54, 0.35)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.75 : (isHovering ? 1.7 : 1),
          backgroundColor: isHovering ? 'rgba(217, 119, 54, 0.18)' : 'rgba(217, 119, 54, 0.04)',
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}
