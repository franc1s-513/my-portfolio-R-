import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';

// Maximum horizontal rotation limit: 2 swipes left and 2 swipes right (~135 degrees = 0.75 * PI)
const MAX_SWIPE_ROTATION = Math.PI * 0.75;

export const ScrollCamera = () => {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  
  // Drag / Swipe state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragRotY = useRef(0);
  const targetDragRotY = useRef(0);
  const currentDragRotY = useRef(0);

  // Scroll state (optimized to avoid accessing DOM in useFrame)
  const scrollData = useRef({ scrollY: 0, maxScroll: 1 });

  // Initialize camera
  useEffect(() => {
    camera.position.set(0, 0, 0.1);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  // Handle Drag / Swipe and Mouse Parallax
  useEffect(() => {
    const domElement = gl.domElement;
    if (!domElement) return;

    domElement.style.cursor = 'grab';

    const handlePointerDown = (e) => {
      // Ignore if clicking on interactive HTML elements like buttons inside canvas
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

      isDragging.current = true;
      startX.current = e.clientX;
      startY.current = e.clientY;
      domElement.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      // 1. Mouse Parallax (subtle)
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = normX * (Math.PI / 16);
      mouse.current.targetY = normY * (Math.PI / 16);

      // 2. Drag / Swipe rotation
      if (!isDragging.current) return;
      const deltaX = e.clientX - startX.current;
      startX.current = e.clientX;

      // Sensitivity factor: ~0.005 radians per pixel moved
      const rotationDelta = deltaX * 0.005;
      
      // Update target drag rotation and clamp strictly to [-MAX_SWIPE_ROTATION, MAX_SWIPE_ROTATION]
      dragRotY.current = Math.min(
        Math.max(dragRotY.current + rotationDelta, -MAX_SWIPE_ROTATION),
        MAX_SWIPE_ROTATION
      );
      targetDragRotY.current = dragRotY.current;
    };

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        domElement.style.cursor = 'grab';
      }
    };

    const updateScrollData = () => {
      scrollData.current.scrollY = window.scrollY;
      scrollData.current.maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    };

    // Initial scroll setup
    updateScrollData();

    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('scroll', updateScrollData, { passive: true });
    window.addEventListener('resize', updateScrollData, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', updateScrollData);
      window.removeEventListener('resize', updateScrollData);
    };
  }, [gl]);

  useFrame((state, delta) => {
    // 1. Calculate Scroll Dive with Cinematic Buffer Zones
    const { scrollY, maxScroll } = scrollData.current;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    
    const smoothstep = (min, max, value) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    let targetY = 0;
    if (progress < 0.1) {
      targetY = 0; // Hero
    } else if (progress < 0.35) {
      targetY = MathUtils.lerp(0, -100, smoothstep(0.1, 0.35, progress));
    } else if (progress < 0.45) {
      targetY = -100; // Castle 3 (About)
    } else if (progress < 0.7) {
      targetY = MathUtils.lerp(-100, -200, smoothstep(0.45, 0.7, progress));
    } else if (progress < 0.8) {
      targetY = -200; // Castle 1 (Projects)
    } else if (progress < 0.87) {
      targetY = MathUtils.lerp(-200, -300, smoothstep(0.8, 0.87, progress));
    } else if (progress < 0.92) {
      targetY = -300; // Castle 2 (Certificates)
    } else if (progress < 0.97) {
      targetY = MathUtils.lerp(-300, -400, smoothstep(0.92, 0.97, progress));
    } else {
      targetY = -400; // MysticStones (Contact) / Footer
    }
    
    // Smoothly interpolate camera's Y position
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 1 - Math.exp(-10 * delta));

    // 2. Smoothly lerp drag rotation and subtle parallax
    const lerpFactor = 1 - Math.exp(-12 * delta);
    currentDragRotY.current = MathUtils.lerp(currentDragRotY.current, targetDragRotY.current, lerpFactor);
    mouse.current.x = MathUtils.lerp(mouse.current.x, mouse.current.targetX, lerpFactor);
    mouse.current.y = MathUtils.lerp(mouse.current.y, mouse.current.targetY, lerpFactor);

    // Apply combined drag rotation + subtle parallax
    camera.rotation.y = currentDragRotY.current - mouse.current.x;
    camera.rotation.x = mouse.current.y;
  });

  return null;
};
