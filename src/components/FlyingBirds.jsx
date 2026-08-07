import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

function Bird({ position, rotation, scale, speed, offset }) {
  const { scene, animations } = useGLTF('/bird.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, mixer } = useAnimations(animations, clone);
  
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

  return <primitive object={clone} position={position} rotation={rotation} scale={scale} />;
}

export default function FlyingBirds({ count = 15 }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y -= delta * 0.25; // Rotate whole flock
      // Smoothly follow camera altitude so birds are always in the sky
      group.current.position.y = state.camera.position.y + 15;
    }
  });

  const birds = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 25 + Math.random() * 30;
      const y = Math.random() * 25 - 5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Calculate rotation so bird faces forward along its circular path
      const birdRotationY = -angle - Math.PI / 2;
      
      return {
        key: i,
        position: [x, y, z],
        rotation: [0, birdRotationY, 0],
        scale: 0.15 + Math.random() * 0.1, 
        speed: 0.8 + Math.random() * 0.6,
        offset: Math.random() * 10
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
