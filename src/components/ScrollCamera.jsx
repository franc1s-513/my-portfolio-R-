import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';

const MAX_SWIPE_ROTATION = Math.PI * 0.75;

const smoothstep = (min, max, value) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

export const ScrollCamera = () => {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isReduced = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragRotY = useRef(0);
  const targetDragRotY = useRef(0);
  const currentDragRotY = useRef(0);
  const scrollData = useRef({ scrollY: 0, maxScroll: 1 });

  useEffect(() => {
    isReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    camera.position.set(0, 0, 0.1);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    const domElement = gl.domElement;
    if (!domElement) return;

    domElement.style.cursor = 'grab';

    const handlePointerDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      isDragging.current = true;
      startX.current = e.clientX;
      startY.current = e.clientY;
      domElement.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e) => {
      if (isReduced.current) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = normX * (Math.PI / 16);
      mouse.current.targetY = normY * (Math.PI / 16);

      if (!isDragging.current) return;
      const deltaX = e.clientX - startX.current;
      startX.current = e.clientX;
      const rotationDelta = deltaX * 0.005;
      dragRotY.current = Math.min(Math.max(dragRotY.current + rotationDelta, -MAX_SWIPE_ROTATION), MAX_SWIPE_ROTATION);
      targetDragRotY.current = dragRotY.current;
    };

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        domElement.style.cursor = 'grab';
      }
    };

    const handleScroll = () => {
      scrollData.current.scrollY = window.scrollY || window.pageYOffset;
    };

    const handleResize = () => {
      scrollData.current.maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      handleScroll();
    };

    handleResize();

    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [gl]);

  useFrame((state, rawDelta) => {
    const delta = isReduced.current ? 0 : Math.min(rawDelta, 0.05);
    const { scrollY, maxScroll } = scrollData.current;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    let targetY = 0;
    if (progress < 0.1) targetY = 0;
    else if (progress < 0.35) targetY = MathUtils.lerp(0, -100, smoothstep(0.1, 0.35, progress));
    else if (progress < 0.45) targetY = -100;
    else if (progress < 0.7) targetY = MathUtils.lerp(-100, -200, smoothstep(0.45, 0.7, progress));
    else if (progress < 0.8) targetY = -200;
    else if (progress < 0.87) targetY = MathUtils.lerp(-200, -300, smoothstep(0.8, 0.87, progress));
    else if (progress < 0.92) targetY = -300;
    else if (progress < 0.97) targetY = MathUtils.lerp(-300, -400, smoothstep(0.92, 0.97, progress));
    else targetY = -400;
    
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 1 - Math.exp(-10 * delta));

    const lerpFactor = 1 - Math.exp(-12 * delta);
    currentDragRotY.current = MathUtils.lerp(currentDragRotY.current, targetDragRotY.current, lerpFactor);
    mouse.current.x = MathUtils.lerp(mouse.current.x, mouse.current.targetX, lerpFactor);
    mouse.current.y = MathUtils.lerp(mouse.current.y, mouse.current.targetY, lerpFactor);

    camera.rotation.y = currentDragRotY.current - mouse.current.x;
    camera.rotation.x = mouse.current.y;
  });

  return null;
};
