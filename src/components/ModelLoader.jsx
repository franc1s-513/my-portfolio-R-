import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOAT_PRESETS = {
  castle1: { freq: 1.3, phase: 0, amp: 2.0 },
  castle2: { freq: 1.4, phase: 2, amp: 2.2 },
  castle3: { freq: 1.2, phase: 0.5, amp: 2.5 },
  stones:  { freq: 0.8, phase: 1.2, amp: 1.8 },
};

export function ModelLoader({ modelPath, floatPreset = 'castle1', onClick, ...props }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef();
  const float = FLOAT_PRESETS[floatPreset] || FLOAT_PRESETS.castle1;

  const { clonedScene, modelScale } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        child.raycast = () => null;
        if (child.material) {
          child.material.side = THREE.FrontSide;
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

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = (props.position?.[1] || 0) + Math.sin(t * float.freq + float.phase) * float.amp;
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

export default ModelLoader;

useGLTF.preload('/Castle.glb');
useGLTF.preload('/Castle 2.glb');
useGLTF.preload('/Castle 3.glb');
useGLTF.preload('/mystic_stones_of_the_sky.glb');
