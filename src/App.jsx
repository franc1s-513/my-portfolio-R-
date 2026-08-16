import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- COMPONENTS (3D scene is code-split into its own chunk) ---
import WindParticles from './components/WindParticles';

import CustomCursor from './components/CustomCursor';
import LightTunnel from './components/LightTunnel';
import GlareHover from './components/GlareHover';
import LoadingScreen from './components/LoadingScreen';

const SkyAndBirds = lazy(() => import('./components/SkyAndBirds'));

// --- PAGES (code-split, loaded on demand when their modal opens) ---
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const [isDark] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    const handleKey = (e) => {
      if (e.key === 'Escape' && activeModal) setActiveModal(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeModal]);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLoading]);

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
      <AnimatePresence>
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      
      {/* LAYER 1: BACKGROUND (Main 3D Sky World + Castles) */}
      <Suspense fallback={null}>
        <SkyAndBirds onOpenModal={handleOpenModal} activeModal={activeModal} />
      </Suspense>
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={() => setActiveModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: isDark ? 'rgba(10, 15, 30, 0.55)' : 'rgba(240, 248, 255, 0.55)',
              overflowY: 'auto',
            }}
          >
            {/* FANTASY SKY BACKGROUND IS HANDLED IN AnimeSkybox.jsx DIRECTLY */}

            {/* CLOSE BUTTON — circular, consistent, good affordance */}
            <motion.button
              aria-label="Close page"
              title="Close (Esc)"
              onClick={(e) => { e.stopPropagation(); setActiveModal(null); }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              style={{
                position: 'fixed',
                top: '25px',
                right: '25px',
                zIndex: 10000,
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.75)',
                border: '1.5px solid rgba(0, 0, 0, 0.25)',
                color: isDark ? '#fff' : '#000000',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.9)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                e.currentTarget.style.color = isDark ? '#fff' : '#000000';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.25)';
              }}
            >
              <X size={22} strokeWidth={2.5} />
            </motion.button>

            <div
              style={{ position: 'relative', zIndex: 10, paddingTop: '45px', paddingBottom: '30px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={null}>
                {activeModal === 'about' && <About isDark={isDark} />}
                {activeModal === 'projects' && <Projects isDark={isDark} />}
                {activeModal === 'certificates' && <Certificates isDark={isDark} />}
                {activeModal === 'contact' && <Contact isDark={isDark} />}
              </Suspense>
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