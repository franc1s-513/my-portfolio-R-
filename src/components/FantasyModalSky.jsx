import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function FantasySkyModel() {
  const { scene } = useGLTF('/fantasy_sky_background.glb');
  const skyRef = useRef();

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = false;
        if ('emissive' in child.material) {
          child.material.emissiveIntensity = 1.2;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (skyRef.current) {
      skyRef.current.rotation.y += delta * 0.05; // Slow ambient 3D rotation
    }
  });

  return <primitive ref={skyRef} object={clonedScene} scale={[5, 5, 5]} />;
}

export const FantasyModalSky = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false }}
      >
        <ambientLight intensity={3.5} />
        <directionalLight position={[20, 50, 30]} intensity={4.0} />
        <directionalLight position={[-30, 20, -20]} intensity={2.5} />
        <React.Suspense fallback={null}>
          <FantasySkyModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/fantasy_sky_background.glb');
export default FantasyModalSky;
