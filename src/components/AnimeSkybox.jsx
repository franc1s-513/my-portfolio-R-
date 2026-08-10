import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, useProgress } from '@react-three/drei';

import { Model as Castle } from './Castle';
import Castle2 from './Castle2';
import Castle3 from './Castle3';
import MysticStones from './MysticStones';
import { ScrollCamera } from './ScrollCamera';
import FlyingBirds from './FlyingBirds';
import GlareHover from './GlareHover';

function CanvasLoader() {
  const { progress, active } = useProgress();
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
        fontFamily: 'monospace',
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
    if (animeRef.current) {
      animeRef.current.position.y = camera.position.y;
    }
    if (fantasyRef.current) {
      fantasyRef.current.position.y = camera.position.y;
      if (activeModal) {
        fantasyRef.current.rotation.y += delta * 0.05;
      }
    }
  });

  return (
    <>
      {/* Show regular anime sky when NO modal is open */}
      {!activeModal && <primitive ref={animeRef} object={animeScene} />}
      
      {/* Show 3D fantasy sky when ANY modal IS open */}
      {activeModal && clonedFantasy && (
        <primitive ref={fantasyRef} object={clonedFantasy} scale={[5, 5, 5]} />
      )}
    </>
  );
}

const AnimeSkybox = ({ onOpenModal, activeModal }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas 
        camera={{ position: [0, 0, 0.1], fov: 75 }} 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false }}
      >
        {/* VIBRANT ENVIRONMENT LIGHTING */}
        <ambientLight intensity={2.4} />
        <directionalLight position={[20, 50, 30]} intensity={3.5} />
        <directionalLight position={[-30, 20, -20]} intensity={1.8} />

        {/* SCROLL PARALLAX CAMERA CONTROL */}
        <ScrollCamera />

        <React.Suspense fallback={<CanvasLoader />}>
          {/* ANIME / FANTASY SKYBOX BACKGROUND */}
          <SkyboxModel activeModal={activeModal} />

          {!activeModal && (
            <>
              {/* Flying Birds Flock */}
              <FlyingBirds count={12} />

              {/* Castle 3: About Page (Emerald Glow - Right Sector) */}
              <group position={[18, -100, -45]}>
                <pointLight position={[0, 15, 10]} intensity={12} color="#22c55e" distance={50} />
                <pointLight position={[0, -5, -5]} intensity={6} color="#4ade80" distance={30} />
                <Castle3 scale={1.0} rotation={[0, -Math.PI / 6, 0]} />
                <Html position={[0, -18, 0]} center distanceFactor={120}>
                  <GlareHover borderRadius="14px">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal('about');
                    }}
                    style={{
                      background: 'rgba(34, 197, 94, 0.9)',
                      color: 'white',
                      padding: '12px 26px',
                      borderRadius: '14px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      cursor: 'pointer',
                      border: '2px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 0 30px rgba(34, 197, 94, 0.9), 0 10px 30px rgba(0,0,0,0.4)',
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                      userSelect: 'none',
                      pointerEvents: 'auto',
                    }}
                    className="btn-press"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(34, 197, 94, 1), 0 12px 35px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.9), 0 10px 30px rgba(0,0,0,0.4)';
                    }}
                  >
                    ABOUT PAGE 👤
                  </div>
                  </GlareHover>
                </Html>
              </group>

              {/* Castle 1: Projects Page (Sky Blue Glow - Left Sector) */}
              <group position={[-18, -200, -45]}>
                <pointLight position={[0, 15, 10]} intensity={12} color="#0ea5e9" distance={50} />
                <pointLight position={[0, -5, -5]} intensity={6} color="#38bdf8" distance={30} />
                <Castle scale={1.0} rotation={[0, Math.PI / 4, 0]} />
                <Html position={[0, -18, 0]} center distanceFactor={120}>
                  <GlareHover borderRadius="14px">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal('projects');
                    }}
                    style={{
                      background: 'rgba(14, 165, 233, 0.9)',
                      color: 'white',
                      padding: '12px 26px',
                      borderRadius: '14px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      cursor: 'pointer',
                      border: '2px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 0 30px rgba(14, 165, 233, 0.9), 0 10px 30px rgba(0,0,0,0.4)',
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                      userSelect: 'none',
                      pointerEvents: 'auto',
                    }}
                    className="btn-press"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(14, 165, 233, 1), 0 12px 35px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.9), 0 10px 30px rgba(0,0,0,0.4)';
                    }}
                  >
                    PROJECTS PAGE 🎯
                  </div>
                  </GlareHover>
                </Html>
              </group>

              {/* Castle 2: Certificate Page (Purple Glow - Front/Right Sector) */}
              <group position={[15, -300, -45]}>
                <pointLight position={[0, 15, 10]} intensity={12} color="#a855f7" distance={50} />
                <pointLight position={[0, -5, -5]} intensity={6} color="#c084fc" distance={30} />
                <Castle2 scale={1.0} rotation={[0, -Math.PI / 8, 0]} />
                <Html position={[0, -18, 0]} center distanceFactor={120}>
                  <GlareHover borderRadius="14px">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal('certificates');
                    }}
                    style={{
                      background: 'rgba(168, 85, 247, 0.9)',
                      color: 'white',
                      padding: '12px 26px',
                      borderRadius: '14px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      cursor: 'pointer',
                      border: '2px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.9), 0 10px 30px rgba(0,0,0,0.4)',
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                      userSelect: 'none',
                      pointerEvents: 'auto',
                    }}
                    className="btn-press"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 1), 0 12px 35px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.9), 0 10px 30px rgba(0,0,0,0.4)';
                    }}
                  >
                    CERTIFICATE PAGE 📜
                  </div>
                  </GlareHover>
                </Html>
              </group>

              {/* Mystic Stones: Contact Page (Golden Glow) */}
              <group position={[-15, -400, -45]}>
                <pointLight position={[0, 15, 10]} intensity={12} color="#eab308" distance={50} />
                <pointLight position={[0, -5, -5]} intensity={6} color="#facc15" distance={30} />
                <MysticStones scale={1.0} rotation={[0, Math.PI / 6, 0]} />
                <Html position={[0, -18, 0]} center distanceFactor={120}>
                  <GlareHover borderRadius="14px">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal('contact');
                    }}
                    style={{
                      background: 'rgba(234, 179, 8, 0.9)',
                      color: 'white',
                      padding: '12px 26px',
                      borderRadius: '14px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      cursor: 'pointer',
                      border: '2px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 0 30px rgba(234, 179, 8, 0.9), 0 10px 30px rgba(0,0,0,0.4)',
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                      userSelect: 'none',
                      pointerEvents: 'auto',
                    }}
                    className="btn-press"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(234, 179, 8, 1), 0 12px 35px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(234, 179, 8, 0.9), 0 10px 30px rgba(0,0,0,0.4)';
                    }}
                  >
                    CONTACT PAGE 📞
                  </div>
                  </GlareHover>
                </Html>
              </group>
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
