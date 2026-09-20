import React, { useState, useEffect, lazy, Suspense, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { DEFAULT_MILESTONES } from './data/milestones';

// --- COMPONENTS (3D scene is code-split into its own chunk) ---
import WindParticles from './components/WindParticles';
import CustomCursor from './components/CustomCursor';
import LightTunnel from './components/LightTunnel';
import LoadingScreen from './components/LoadingScreen';

const SkyAndBirds = lazy(() => import('./components/SkyAndBirds'));
import { useGLTF } from '@react-three/drei';

// Preload heavy assets globally so they download during the initial LoadingScreen
useGLTF.preload('/eywa_tree.glb');
useGLTF.preload('/free_-_skybox_anime_sky.glb');
useGLTF.preload('/mystic_stones_of_the_sky.glb');
useGLTF.preload('/Castle.glb');
useGLTF.preload('/Castle 2.glb');
useGLTF.preload('/Castle 3.glb');

// --- PAGES (eagerly loaded to remove navigation lag) ---
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import TechJourney from './pages/TechJourney';
import Contact from './pages/Contact';
import MilestoneNode from './pages/MilestoneNode';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenModal = (modalName) => {
    setIsTransitioning(true);
    // Eagerly set the active modal inside a transition so React can prepare the 3D scene in the background
    startTransition(() => {
      setActiveModal(modalName);
    });
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  useEffect(() => {
    window.__openModal = handleOpenModal;
    const handleNavMessage = (e) => {
      if (e.data && e.data.type === 'ASHEN_NAVIGATE' && e.data.page) {
        handleOpenModal(e.data.page);
      }
    };
    window.addEventListener('message', handleNavMessage);
    return () => {
      window.removeEventListener('message', handleNavMessage);
    };
  }, []);

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
      <WindParticles />

      {/* LAYER 2: MAIN CONTENT (Scroll Track & Modals) */}
      <main style={{ position: 'relative', zIndex: 'var(--z-content)', background: 'transparent', pointerEvents: 'none' }}>
        <div id="home" style={{ pointerEvents: 'auto' }}><Home /></div>
        
        {/* Invisible scroll track to allow diving down the 3D scene */}
        <div style={{ height: '350vh' }}></div>
      </main>

      {/* LAYER 3: 3D PAGE MODALS */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={() => setActiveModal(null)}
            data-lenis-prevent="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: activeModal === 'projects' ? '#eae2d3' : (activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal === 'certificates' || activeModal?.startsWith('milestone-')) ? '#02050e' : activeModal === 'contact' ? '#071010' : '#ffffff',
              backdropFilter: (activeModal === 'projects' || activeModal === 'contact' || activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal === 'certificates' || activeModal?.startsWith('milestone-')) ? 'none' : 'blur(20px)',
              WebkitBackdropFilter: (activeModal === 'projects' || activeModal === 'contact' || activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal === 'certificates' || activeModal?.startsWith('milestone-')) ? 'none' : 'blur(20px)',
              overflowY: (activeModal === 'projects' || activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal === 'certificates' || activeModal?.startsWith('milestone-')) ? 'hidden' : 'auto',
            }}
          >
            {activeModal?.startsWith('milestone-') ? (
              <>
                <motion.button
                  aria-label="Back to Journey"
                  onClick={(e) => { e.stopPropagation(); setActiveModal('tech-journey'); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'fixed',
                    top: 'clamp(20px, 4vh, 40px)',
                    right: 'clamp(20px, 4vw, 40px)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'rgba(28, 25, 23, 0.8)',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    color: '#fbbf24',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(42, 39, 37, 0.9)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(28, 25, 23, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Back to Tree</span>
                </motion.button>
                
                {/* Global Title Overlay for Milestone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    position: 'fixed',
                    top: 'clamp(20px, 4vh, 40px)',
                    left: 'clamp(24px, 4vw, 48px)',
                    zIndex: 10000,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <h1 
                    style={{ 
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                      margin: 0, 
                      lineHeight: 1, 
                      color: '#D4AF37', 
                      fontFamily: "var(--font-editorial), 'Playfair Display', serif", 
                      textShadow: '0 4px 16px rgba(0,0,0,0.8)' 
                    }}
                  >
                    {(() => {
                      const m = DEFAULT_MILESTONES.find(x => x.id === activeModal.replace('milestone-', '')) || DEFAULT_MILESTONES[0];
                      return m.overlayTitle || m.title;
                    })()}
                  </h1>
                  <p 
                    style={{ 
                      margin: '8px 0 0 0', 
                      fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', 
                      color: 'rgba(255,255,255,0.9)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      fontWeight: 700, 
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)' 
                    }}
                  >
                    {(() => {
                      const m = DEFAULT_MILESTONES.find(x => x.id === activeModal.replace('milestone-', '')) || DEFAULT_MILESTONES[0];
                      return m.overlaySubtitle || m.badge;
                    })()}
                  </p>
                </motion.div>
              </>
            ) : (
              <motion.button
                aria-label="Close page"
                title="Close (Esc)"
                onClick={(e) => { e.stopPropagation(); setActiveModal(null); }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  position: 'fixed',
                  top: 'clamp(20px, 4vh, 40px)',
                  right: 'clamp(20px, 4vw, 40px)',
                  zIndex: 10000,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: activeModal === 'projects' ? 'rgba(36, 26, 18, 0.88)' : activeModal === 'contact' ? 'rgba(15, 23, 42, 0.85)' : '#1C1917',
                  border: activeModal === 'projects' ? '1.5px solid rgba(255, 255, 255, 0.3)' : activeModal === 'contact' ? '1.5px solid rgba(255, 255, 255, 0.2)' : '1.5px solid transparent',
                  color: activeModal === 'projects' ? '#f6efe1' : activeModal === 'contact' ? '#ffffff' : '#ffffff',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = activeModal === 'contact' ? 'rgba(124, 58, 237, 0.9)' : 'rgba(14, 165, 233, 0.9)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = activeModal === 'contact' ? 'rgba(167, 139, 250, 0.9)' : 'rgba(14, 165, 233, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = activeModal === 'projects' ? 'rgba(36, 26, 18, 0.88)' : activeModal === 'contact' ? 'rgba(15, 23, 42, 0.85)' : '#1C1917';
                  e.currentTarget.style.color = activeModal === 'projects' ? '#f6efe1' : activeModal === 'contact' ? '#ffffff' : '#ffffff';
                  e.currentTarget.style.borderColor = activeModal === 'projects' ? 'rgba(255, 255, 255, 0.3)' : activeModal === 'contact' ? 'rgba(255, 255, 255, 0.2)' : 'transparent';
                }}
              >
                <X size={22} strokeWidth={2.5} />
              </motion.button>
            )}

            <div
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: (activeModal === 'projects' || activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal?.startsWith('milestone-')) ? '100vh' : 'auto',
                paddingTop: (activeModal === 'projects' || activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal?.startsWith('milestone-')) ? 0 : '45px',
                paddingBottom: (activeModal === 'projects' || activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal?.startsWith('milestone-')) ? 0 : '30px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={null}>
                {activeModal === 'about' && <About onNavigate={handleOpenModal} />}
                {activeModal === 'projects' && <Projects onNavigate={handleOpenModal} />}
                {(activeModal === 'tech-journey' || activeModal === 'tech-journy' || activeModal === 'certificates') && (
                  <TechJourney onNavigate={handleOpenModal} />
                )}
                {activeModal?.startsWith('milestone-') && (
                  <MilestoneNode activeModal={activeModal} onNavigate={handleOpenModal} />
                )}
                {activeModal === 'contact' && <Contact />}
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
              background: '#0a0f1e',
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
