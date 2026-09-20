import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, useProgress } from '@react-three/drei';

import { ModelLoader } from './ModelLoader';
import { ScrollCamera } from './ScrollCamera';
import FlyingBirds from './FlyingBirds';
import IgnitionButton from './IgnitionButton';
import { User, Layers, Rocket, Mail } from 'lucide-react';

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

function SkyboxModel() {
  const { scene: animeScene } = useGLTF('/free_-_skybox_anime_sky.glb');
  const animeRef = useRef();

  useFrame(({ camera }) => {
    if (animeRef.current) animeRef.current.position.y = camera.position.y;
  });

  return (
    <>
      <primitive ref={animeRef} object={animeScene} raycast={() => null} />
    </>
  );
}

/* DRY Nav Button for 3D HTML overlays with ThreeUI Ignition WebGL Effect */
function NavButton3D({ label, icon: Icon, color, onClick }) {
  return (
    <Html position={[0, -18, 0]} center distanceFactor={120} style={{ pointerEvents: 'auto' }}>
      <IgnitionButton
        color={color}
        variant="pill"
        disableObserver={true}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="nav-3d-ignition-btn"
        style={{ transformOrigin: 'center center' }}
      >
        <span>{label}</span>
        {Icon && <Icon size={16} strokeWidth={2.4} className="nav-btn-icon" />}
      </IgnitionButton>
    </Html>
  );
}

const NAV_ZONES = [
  { position: [18, -100, -45], modelPath: '/Castle 3.glb', floatPreset: 'castle3', glowColor: '#22c55e', color: 'green', label: 'ABOUT PAGE', icon: User, key: 'about', rotation: [0, -Math.PI / 6, 0] },
  { position: [-18, -200, -45], modelPath: '/Castle.glb', floatPreset: 'castle1', glowColor: '#0ea5e9', color: 'blue', label: 'PROJECTS PAGE', icon: Layers, key: 'projects', rotation: [0, Math.PI / 4, 0] },
  { position: [15, -300, -45], modelPath: '/Castle 2.glb', floatPreset: 'castle2', glowColor: '#38bdf8', color: 'cyan', label: 'TECH JOURNEY', icon: Rocket, key: 'tech-journey', rotation: [0, -Math.PI / 8, 0] },
  { position: [-15, -400, -45], modelPath: '/mystic_stones_of_the_sky.glb', floatPreset: 'stones', glowColor: '#eab308', color: 'gold', label: 'CONTACT PAGE', icon: Mail, key: 'contact', rotation: [0, Math.PI / 6, 0] },
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
                    icon={zone.icon}
                    color={zone.color}
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

export default AnimeSkybox;
