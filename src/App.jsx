import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// --- COMPONENTS (3D scene is code-split into its own chunk) ---
import WindParticles from './components/WindParticles';
import CustomCursor from './components/CustomCursor';
import LightTunnel from './components/LightTunnel';
import LoadingScreen from './components/LoadingScreen';

const SkyAndBirds = lazy(() => import('./components/SkyAndBirds'));

// --- PAGES (code-split, loaded on demand when their modal opens) ---
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const TechJourney = lazy(() => import('./pages/TechJourney'));
const Contact = lazy(() => import('./pages/Contact'));
const MilestoneNode = lazy(() => import('./pages/MilestoneNode'));

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
    // Eagerly set the active modal so it loads and renders behind the opaque tunnel overlay
    setActiveModal(modalName);
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
