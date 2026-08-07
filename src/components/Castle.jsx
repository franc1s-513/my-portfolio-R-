import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Model({ onClick, ...props }) {
  const { scene } = useGLTF('/Castle.glb');
  const groupRef = useRef();

  const { clonedScene, modelScale } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const wrapper = new THREE.Group();
    clone.position.x = -center.x;
    clone.position.y = -box.min.y;
    clone.position.z = -center.z;
    wrapper.add(clone);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 33 / maxDim : 1;

    return { clonedScene: wrapper, modelScale: scaleFactor };
  }, [scene]);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = (props.position?.[1] || 0) + Math.sin(state.clock.getElapsedTime() * 1.3) * 2.0;
    }
  });

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <group 
        scale={modelScale}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

export default Model;
useGLTF.preload('/Castle.glb');

