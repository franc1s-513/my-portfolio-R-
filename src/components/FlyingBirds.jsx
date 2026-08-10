import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

function Bird({ initialPosition, scale, speed, offset, radius, verticalOffset }) {
  const { scene, animations } = useGLTF('/bird.glb');
  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.raycast = () => null; // Bypass raycasting for flock birds
      }
    });
    return cloned;
  }, [scene]);

  const { actions, mixer } = useAnimations(animations, clone);
  const birdRef = useRef();
  
  // Reusable vector refs to prevent per-frame garbage collection
  const currentPos = useRef(new THREE.Vector3(...initialPosition));
  const prevPos = useRef(new THREE.Vector3(...initialPosition));
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action.play();
      action.setEffectiveTimeScale(speed);
      if (mixer) {
        mixer.setTime(offset);
      }
    }
  }, [actions, mixer, speed, offset]);

  useFrame((state, delta) => {
    if (!birdRef.current) return;
    
    const t = state.clock.getElapsedTime() * speed * 0.4 + offset;
    
    const newX = Math.cos(t) * radius + Math.sin(t * 0.5) * (radius * 0.3);
    const newZ = Math.sin(t) * radius + Math.cos(t * 0.8) * (radius * 0.3);
    const newY = verticalOffset + Math.sin(t * 1.5) * 4;

    currentPos.current.set(newX, newY, newZ);
    birdRef.current.position.copy(currentPos.current);

    direction.current.subVectors(currentPos.current, prevPos.current).normalize();
    
    if (direction.current.lengthSq() > 0.0001) {
      const targetYaw = Math.atan2(direction.current.x, direction.current.z) + Math.PI / 2;
      
      birdRef.current.rotation.y = THREE.MathUtils.lerp(birdRef.current.rotation.y, targetYaw, delta * 5);
      
      const bankAmount = Math.cos(t) * 0.3;
      birdRef.current.rotation.z = THREE.MathUtils.lerp(birdRef.current.rotation.z, bankAmount, delta * 2);
      
      const pitchAmount = direction.current.y * 2.0; 
      birdRef.current.rotation.x = THREE.MathUtils.lerp(birdRef.current.rotation.x, -pitchAmount, delta * 3);
    }
    
    prevPos.current.copy(currentPos.current);
  });

  return <primitive ref={birdRef} object={clone} scale={scale} raycast={() => null} />;
}

export default function FlyingBirds({ count = 12 }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    if (group.current) {
      // Slowly rotate the entire flock's orbit as a whole
      group.current.rotation.y -= delta * 0.05;
      // Smoothly follow camera altitude so birds are always in the sky with us
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, state.camera.position.y + 15, delta * 2);
    }
  });

  const birds = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const radius = 20 + Math.random() * 25; // How wide this bird flies
      const offset = Math.random() * Math.PI * 2; // Where it starts in the pattern
      const verticalOffset = Math.random() * 15 - 7.5; // Its base altitude offset
      
      return {
        key: i,
        initialPosition: [0, 0, 0], // Overridden by useFrame instantly
        radius,
        verticalOffset,
        scale: 3.5 + Math.random() * 1.5, // Large scale for visibility
        speed: 0.6 + Math.random() * 0.4, // Slower, more graceful speed
        offset
      };
    });
  }, [count]);

  return (
    <group ref={group} position={[0, 15, 0]}>
      {birds.map(props => (
        <Bird key={props.key} {...props} />
      ))}
    </group>
  );
}

useGLTF.preload('/bird.glb');
