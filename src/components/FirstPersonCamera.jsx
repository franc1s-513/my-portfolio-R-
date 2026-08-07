import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler, MathUtils } from 'three';

export const FirstPersonCamera = () => {
  const { camera } = useThree();
  
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const keys = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const speed = 0.4;
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates between -1 and 1
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      mouse.current.targetX = normX * Math.PI; // Allow 180 degrees left/right (360 total)
      mouse.current.targetY = normY * (Math.PI / 3); // Allow 60 degrees up/down
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      let moved = false;
      if (Object.prototype.hasOwnProperty.call(keys.current, e.key)) {
        keys.current[e.key] = true;
        moved = true;
      }
      if (Object.prototype.hasOwnProperty.call(keys.current, key)) {
        keys.current[key] = true;
        moved = true;
      }
      if (moved) {
        window.dispatchEvent(new CustomEvent('enterExploreMode'));
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(keys.current, e.key)) keys.current[e.key] = false;
      if (Object.prototype.hasOwnProperty.call(keys.current, key)) keys.current[key] = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    // Frame-rate independent lerp factor
    const lerpFactor = 1 - Math.exp(-10 * delta);

    // 1. Smoothly interpolate mouse rotation (Cursor Parallax)
    mouse.current.x = MathUtils.lerp(mouse.current.x, mouse.current.targetX, lerpFactor);
    mouse.current.y = MathUtils.lerp(mouse.current.y, mouse.current.targetY, lerpFactor);

    // eslint-disable-next-line react-hooks/immutability
    camera.rotation.y = -mouse.current.x;
    camera.rotation.x = mouse.current.y;

    // 2. Keyboard movement (WASD for X/Z, Arrows for Y) with Acceleration and Friction
    const currentKeys = keys.current;
    // We treat 'w' as forward, 's' as backward, 'a'/'d' as left/right. 
    // If the user presses 'a' to move front in their mind, they might be on AZERTY, but standard is W.
    const moveForward = currentKeys.w;
    const moveBackward = currentKeys.s;
    const moveLeft = currentKeys.a;
    const moveRight = currentKeys.d;
    const moveUp = currentKeys.ArrowUp;
    const moveDown = currentKeys.ArrowDown;

    const acceleration = 3.0; // Acceleration speed
    const friction = 0.85;    // Friction (lower means more sliding, 1 means no sliding)

    // Apply acceleration
    if (moveForward) velocity.current.z -= acceleration * delta;
    if (moveBackward) velocity.current.z += acceleration * delta;
    if (moveLeft) velocity.current.x -= acceleration * delta;
    if (moveRight) velocity.current.x += acceleration * delta;
    if (moveUp) velocity.current.y += acceleration * delta;
    if (moveDown) velocity.current.y -= acceleration * delta;

    // Apply friction to gracefully slow down
    velocity.current.multiplyScalar(friction);

    // Cap maximum speed
    const maxSpeed = speed;
    if (velocity.current.length() > maxSpeed) {
      velocity.current.setLength(maxSpeed);
    }

    direction.current.copy(velocity.current);
    direction.current.applyEuler(new Euler(0, camera.rotation.y, 0));
    camera.position.add(direction.current);
  });

  return null;
};
