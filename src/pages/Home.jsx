import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import profilePhoto from '../assets/photos/profile.jpg';
import PageTransition from '../components/PageTransition';
import MagneticWrapper from '../components/MagneticWrapper';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const letterVariants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const Home = () => {
  const pageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isExploring, setIsExploring] = useState(false);
  const resizeTimer = useRef(null);

  const isReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => setIsMobile(window.innerWidth < 768), 150);
    };
    const handleExplore = () => setIsExploring(true);
    const handleExit = (e) => {
      if (e.key === 'Escape') setIsExploring(false);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('enterExploreMode', handleExplore);
    window.addEventListener('keydown', handleExit);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('enterExploreMode', handleExplore);
      window.removeEventListener('keydown', handleExit);
      clearTimeout(resizeTimer.current);
    };
  }, []);

  return (
    <PageTransition direction="up">
      <div ref={pageRef} style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* EXPLORE MODE HUD */}
        <AnimatePresence>
          {isExploring && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="btn-press"
              style={{
                position: 'fixed',
                top: '40px',
                left: '50%',
                zIndex: 100,
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(12px)',
                padding: '12px 26px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-primary-light)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                border: '1px solid rgba(14,165,233,0.4)',
                letterSpacing: '1px',
                pointerEvents: 'none',
                boxShadow: '0 0 25px rgba(14,165,233,0.3)',
              }}
            >
              EXPLORE MODE [PRESS ESC TO EXIT]
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isExploring && (
            <motion.div
              key="home-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}
            >
              {/* HERO SECTION */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                pointerEvents: 'none',
                padding: isMobile ? '130px 6% 80px' : '150px 10% 80px',
              }}>
                <div style={{
                  display: 'grid',
                  gap: '50px',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '1200px',
                  zIndex: 2,
                  pointerEvents: 'auto',
                  gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
                }}>
                  {/* TEXT SIDE */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'inherit',
                      alignItems: isMobile ? 'center' : 'flex-start',
                    }}
                  >
                    <motion.h1
                      variants={isReduced ? itemVariants : undefined}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: '900',
                        color: '#0A192F', /* Navy Blue */
                        WebkitTextStroke: '2px #D4AF37', /* Gold Outline */
                        margin: '0 0 8px',
                        lineHeight: '0.92',
                        letterSpacing: '-2px',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        fontSize: isMobile ? '3.2rem' : 'clamp(3.5rem, 6vw, 5.8rem)',
                        textAlign: isMobile ? 'center' : 'left',
                      }}
                    >
                      {isReduced ? (
                        <>FRANCIS<br />FERNANDO<span style={{ color: 'var(--color-primary)' }}>.</span></>
                      ) : (
                        <>
                          <motion.span variants={wordVariants} style={{ display: 'block', overflow: 'hidden' }}>
                            {"FRANCIS".split('').map((c, i) => (
                              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>{c}</motion.span>
                            ))}
                          </motion.span>
                          <motion.span variants={wordVariants} style={{ display: 'block', overflow: 'hidden' }}>
                            {"FERNANDO".split('').map((c, i) => (
                              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>{c}</motion.span>
                            ))}
                            <motion.span variants={letterVariants} style={{ display: 'inline-block', color: 'var(--color-primary)' }}>.</motion.span>
                          </motion.span>
                        </>
                      )}
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      style={{
                        margin: '24px 0 0',
                        fontWeight: '600',
                        lineHeight: '1.4',
                        letterSpacing: '-0.2px',
                        color: 'var(--text-sub)',
                        textShadow: '0 1px 12px rgba(255, 255, 255, 0.8)',
                        opacity: 0.95,
                        fontSize: isMobile ? '1.3rem' : 'clamp(1.4rem, 2vw, 1.9rem)',
                        textAlign: isMobile ? 'center' : 'left',
                      }}
                    >
                      Engineering the Solution{' '}
                      <br />
                      <span style={{ fontWeight: '800' }}>behind an interface.</span>
                    </motion.p>
                  </motion.div>

                  {/* IMAGE SIDE */}
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}
                  >
                    <motion.div
                      animate={{ y: [0, -14, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <MagneticWrapper sensitivity={0.2}>
                        <motion.div
                          animate={{
                            borderRadius: [
                              '30% 70% 70% 30% / 30% 30% 70% 70%',
                              '50% 50% 33% 67% / 55% 27% 73% 45%',
                              '30% 70% 70% 30% / 30% 30% 70% 70%',
                            ],
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: '0 0 0 10px rgba(14, 165, 233, 0.15), 0 0 0 20px rgba(14, 165, 233, 0.05), 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(14, 165, 233, 0.25)',
                          }}
                          style={{
                            overflow: 'hidden',
                            background: '#ffffff',
                            border: '4px solid #ffffff',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                            cursor: 'pointer',
                            width: isMobile ? '280px' : 'clamp(320px, 30vw, 420px)',
                            height: isMobile ? '320px' : 'clamp(380px, 40vw, 480px)',
                            position: 'relative',
                            transform: 'rotate(2deg)',
                          }}
                        >
                          <img
                            src={profilePhoto}
                            alt="Francis Fernando - Full-Stack Developer"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center 15%',
                            }}
                          />
                        </motion.div>
                      </MagneticWrapper>
                    </motion.div>
                  </motion.div>
                </div>

                {/* SCROLL INDICATOR */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  style={{
                    position: 'absolute',
                    bottom: isMobile ? '30px' : '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  onClick={() => {
                    window.scrollBy({
                      top: window.innerHeight * 0.8,
                      behavior: 'smooth'
                    });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--text-sub)',
                    opacity: 0.8,
                    textShadow: '0 2px 10px rgba(255,255,255,0.5)'
                  }}>
                    Swipe Down
                  </span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronDown size={24} color="var(--color-primary, #0ea5e9)" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Home;
