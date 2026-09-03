import * as THREE from 'three';
import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, useProgress } from '@react-three/drei';

import { ModelLoader } from './ModelLoader';
import { ScrollCamera } from './ScrollCamera';
import FlyingBirds from './FlyingBirds';

function CanvasLoader() {
  const { progress, active } = useProgress();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('asset-progress', { detail: progress }));
  }, [progress]);

  if (!active && progress === 100) return null;

  return (
    <Html center>
      <div style={{
        background: 'rgba(15, 23, 42, 0.92)',
        border: '1px solid rgba(14, 165, 233, 0.5)',
        boxShadow: '0 0 30px rgba(14, 165, 233, 0.4), 0 10px 40px rgba(0,0,0,0.5)',
        borderRadius: '18px',
        padding: '18px 30px',
        color: '#fff',
        fontFamily: "'JetBrains Mono', monospace",
        textAlign: 'center',
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(12px)',
        zIndex: 9999
      }}>
        <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#0ea5e9', marginBottom: '10px', fontWeight: '900' }}>
          UPLINKING 3D ENVIRONMENT...
        </div>
        <div style={{ width: '180px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', margin: '0 auto 8px' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', transition: 'width 0.2s ease' }} />
        </div>
        <div style={{ fontSize: '11px', opacity: 0.85, fontWeight: 'bold' }}>
          {progress.toFixed(0)}% COMPLETED
        </div>
      </div>
    </Html>
  );
}

function SkyboxModel({ activeModal }) {
  const { scene: animeScene } = useGLTF('/free_-_skybox_anime_sky.glb');
  const { scene: fantasyScene } = useGLTF('/fantasy_sky_background.glb');
  const animeRef = useRef();
  const fantasyRef = useRef();

  const clonedFantasy = useMemo(() => {
    if (!fantasyScene) return null;
    const clone = fantasyScene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = false;
      }
    });
    return clone;
  }, [fantasyScene]);

  useFrame(({ camera }, delta) => {
    if (animeRef.current) animeRef.current.position.y = camera.position.y;
    if (fantasyRef.current) {
      fantasyRef.current.position.y = camera.position.y;
      if (activeModal) fantasyRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <primitive ref={animeRef} object={animeScene} raycast={() => null} />
    </>
  );
}

/* DRY Nav Button for 3D HTML overlays */
function NavButton3D({ label, emoji, gradientColors, glowColor, onClick }) {
  const btnStyle = useMemo(() => ({
    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '14px',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: '800',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1.5px solid rgba(255,255,255,0.9)',
    boxShadow: `0 0 25px ${glowColor}, 0 8px 25px rgba(0,0,0,0.35)`,
    whiteSpace: 'nowrap',
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }), [gradientColors, glowColor]);

  const handleEnter = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1.08)';
    e.currentTarget.style.boxShadow = `0 0 35px ${glowColor}, 0 10px 30px rgba(0,0,0,0.45)`;
  }, [glowColor]);

  const handleLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = `0 0 25px ${glowColor}, 0 8px 25px rgba(0,0,0,0.35)`;
  }, [glowColor]);

  return (
    <Html position={[0, -18, 0]} center distanceFactor={120} style={{ pointerEvents: 'auto' }}>
      <button
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        style={btnStyle}
        className="btn-press"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {label} {emoji}
      </button>
    </Html>
  );
}

const NAV_ZONES = [
  { position: [18, -100, -45], modelPath: '/Castle 3.glb', floatPreset: 'castle3', glowColor: '#22c55e', gradientColors: ['#16a34a', '#22c55e'], label: 'ABOUT PAGE', emoji: '👤', key: 'about', rotation: [0, -Math.PI / 6, 0] },
  { position: [-18, -200, -45], modelPath: '/Castle.glb', floatPreset: 'castle1', glowColor: '#0ea5e9', gradientColors: ['#0284c7', '#0ea5e9'], label: 'PROJECTS PAGE', emoji: '🎯', key: 'projects', rotation: [0, Math.PI / 4, 0] },
  { position: [15, -300, -45], modelPath: '/Castle 2.glb', floatPreset: 'castle2', glowColor: '#a855f7', gradientColors: ['#7e22ce', '#a855f7'], label: 'CERTIFICATE PAGE', emoji: '📜', key: 'certificates', rotation: [0, -Math.PI / 8, 0] },
  { position: [-15, -400, -45], modelPath: '/mystic_stones_of_the_sky.glb', floatPreset: 'stones', glowColor: '#eab308', gradientColors: ['#ca8a04', '#eab308'], label: 'CONTACT PAGE', emoji: '📞', key: 'contact', rotation: [0, Math.PI / 6, 0] },
];

const AnimeSkybox = ({ onOpenModal, activeModal }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas 
        camera={{ position: [0, 0, 0.1], fov: 75 }} 
        dpr={[1, 1.5]} 
        performance={{ min: 0.6 }}
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: true, alpha: false }}
      >
        <ambientLight intensity={2.6} />
        <directionalLight position={[20, 50, 30]} intensity={3.8} />
        <directionalLight position={[-30, 20, -20]} intensity={2.0} />

        <ScrollCamera />

        <React.Suspense fallback={<CanvasLoader />}>
          <SkyboxModel activeModal={activeModal} />

          {!activeModal && (
            <>
              <FlyingBirds count={7} />
              {NAV_ZONES.map((zone) => (
                <group key={zone.key} position={zone.position}>
                  <pointLight position={[0, 10, 5]} intensity={6} color={zone.glowColor} distance={40} decay={2} />
                  <ModelLoader
                    modelPath={zone.modelPath}
                    floatPreset={zone.floatPreset}
                    scale={1.0}
                    rotation={zone.rotation}
                  />
                  <NavButton3D
                    label={zone.label}
                    emoji={zone.emoji}
                    gradientColors={zone.gradientColors}
                    glowColor={zone.glowColor}
                    onClick={() => onOpenModal(zone.key)}
                  />
                </group>
              ))}
            </>
          )}
        </React.Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/free_-_skybox_anime_sky.glb');
useGLTF.preload('/fantasy_sky_background.glb');

export default AnimeSkybox;
