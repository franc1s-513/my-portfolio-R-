import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENTS ---
import SkyAndBirds from './components/SkyAndBirds';
import WindParticles from './components/WindParticles';

import CustomCursor from './components/CustomCursor';
import LightTunnel from './components/LightTunnel';
import GlareHover from './components/GlareHover';

// --- PAGES ---
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpenModal = (modalName) => {
    setIsTransitioning(true);
    // Play transition for 2 seconds, then open the modal
    setTimeout(() => {
      setIsTransitioning(false);
      setActiveModal(modalName);
    }, 2000);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  // --- RENDER BACKEND WAKE-UP ---
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await fetch("https://my-ai-backend-vdxv.onrender.com/");
        console.log("Uplink Established: Render Backend is Awake.");
      } catch {
        console.warn("Backend is still spinning up...");
      }
    };
    
    wakeServer();
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      width: '100%', 
      overflowX: 'hidden',
      background: 'transparent', 
      transition: 'background-color 0.5s ease'
    }}>
      <CustomCursor />
      
      {/* LAYER 1: BACKGROUND (Main 3D Sky World + Castles) */}
      <SkyAndBirds isDark={isDark} onOpenModal={handleOpenModal} activeModal={activeModal} />
      <WindParticles isDark={isDark} />

      {/* LAYER 2: MAIN CONTENT (Scroll Track & Modals) */}
      <main style={{ position: 'relative', zIndex: 10, background: 'transparent', pointerEvents: 'none' }}>
        <div id="home" style={{ pointerEvents: 'auto' }}><Home isDark={isDark} /></div>
        
        {/* Invisible scroll track to allow diving down the 3D scene */}
        <div style={{ height: '350vh' }}></div>
      </main>

      {/* LAYER 3: 3D PAGE MODALS (Using fantasy_sky_background.glb as 3D background) */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: isDark ? 'rgba(10, 15, 30, 0.35)' : 'rgba(240, 248, 255, 0.35)',
              overflowY: 'auto',
            }}
          >
            {/* FANTASY SKY BACKGROUND IS HANDLED IN AnimeSkybox.jsx DIRECTLY */}

            <GlareHover borderRadius="50px">
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'fixed',
                  top: '25px',
                  right: '25px',
                  zIndex: 10000,
                background: 'rgba(255,255,255,0.2)',
                border: '1.5px solid rgba(14, 165, 233, 0.6)',
                color: isDark ? '#fff' : '#0f172a',
                padding: '12px 28px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '900',
                letterSpacing: '1px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.9)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = isDark ? '#fff' : '#0f172a';
              }}
            >
              CLOSE [X]
            </button>
            </GlareHover>
            
            <div style={{ position: 'relative', zIndex: 10, paddingTop: '80px', paddingBottom: '40px' }}>
              {activeModal === 'about' && <About isDark={isDark} />}
              {activeModal === 'projects' && <Projects isDark={isDark} />}
              {activeModal === 'certificates' && <Certificates isDark={isDark} />}
              {activeModal === 'contact' && <Contact isDark={isDark} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HYPER-SPEED TRANSITION LAYER */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: '#0a0f1e', // Dark cosmic background
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LightTunnel
              cableColor="#0ea5e9"
              pulseColor="#38bdf8"
              tunnelColor="#0284c7"
              tunnelOpacity={0.2}
              speed={0.3}
              flowDirection="outward"
              pulseSpeed={3}
              pulseLength={0.4}
              cableCount={30}
              size={1.2}
              glow={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;