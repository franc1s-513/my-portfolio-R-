import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profilePhoto from '../assets/photos/profile.jpg';
import PageTransition from '../components/PageTransition';
import MagneticWrapper from '../components/MagneticWrapper';
import GlareHover from '../components/GlareHover';
import useScrollReveal from '../components/useScrollReveal';

/* ── Framer Motion variants ─────────────────────────────────────── */
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
  visible: {
    transition: {
      staggerChildren: 0.04
    }
  }
};

const letterVariants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
};


/* ── Component ──────────────────────────────────────────────────── */
const Home = ({ isDark }) => {
  const styles = getStyles();
  const pageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);
  const [isExploring, setIsExploring] = useState(false);

  useScrollReveal(pageRef, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 968);
    const handleExplore = () => setIsExploring(true);
    const handleExit = (e) => {
      if (e.key === 'Escape') setIsExploring(false);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('enterExploreMode', handleExplore);
    window.addEventListener('keydown', handleExit);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('enterExploreMode', handleExplore);
      window.removeEventListener('keydown', handleExit);
    };
  }, []);

  const isReduced = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <PageTransition direction="up">
      <div ref={pageRef} style={styles.outerContainer}>
        {/* FLOATING GRADIENT BLOBS REMOVED to clear the sky background */}

        {/* EXPLORE MODE HUD */}
        <AnimatePresence>
          {isExploring && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              style={{
                position: 'fixed',
                top: '40px',
                left: '50%',
                zIndex: 100,
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(12px)',
                padding: '12px 26px',
                borderRadius: '50px',
                color: '#38bdf8',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                border: '1px solid rgba(14,165,233,0.4)',
                letterSpacing: '1px',
                pointerEvents: 'none',
                boxShadow: '0 0 25px rgba(14,165,233,0.3)'
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
        <div
          style={{
            ...styles.container,
            padding: isMobile ? '130px 6% 80px' : '150px 10% 80px',
            minHeight: isMobile ? 'auto' : '100vh',
          }}
        >
          <div
            style={{
              ...styles.wrapper,
              gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            }}
          >
            {/* ── TEXT SIDE ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                ...styles.textSide,
                alignItems: isMobile ? 'center' : 'flex-start',
              }}
            >
              {/* Name character reveal animation */}
              <motion.h1
                variants={isReduced ? itemVariants : undefined}
                  style={{
                    ...styles.name,
                    fontSize: isMobile ? '3.2rem' : '5.8rem',
                    textShadow: isDark ? '0 0 30px rgba(14, 165, 233, 0.4)' : '0 2px 30px rgba(255, 255, 255, 0.45)',
                    textAlign: isMobile ? 'center' : 'left',
                  }}
              >
                {isReduced ? (
                  <>FRANCIS<br />FERNANDO<span style={styles.dot}>.</span></>
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
                      <motion.span variants={letterVariants} style={{ display: 'inline-block', color: '#0ea5e9' }}>.</motion.span>
                    </motion.span>
                  </>
                )}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                style={{
                  ...styles.tagline,
                  fontSize: isMobile ? '1.3rem' : '1.9rem',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                Engineering the Solution{' '}
                <br />
                <span style={{ fontWeight: '800' }}>behind an interface.</span>
              </motion.p>


            </motion.div>

            {/* ── IMAGE SIDE ── */}
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
                    onClick={() => {
                      const el = document.getElementById('about');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
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
                      boxShadow: '0 0 0 10px rgba(14, 165, 233, 0.15), 0 0 0 20px rgba(14, 165, 233, 0.05), 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(14, 165, 233, 0.25)' 
                    }}
                    style={{
                      ...styles.imageFrame,
                      width: isMobile ? '280px' : '420px',
                      height: isMobile ? '320px' : '480px',
                    }}
                  >
                    <img src={profilePhoto} alt="Francis Fernando" style={styles.image} />
                  </motion.div>
                </MagneticWrapper>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* PROJECTS SECTION REMOVED */}
      </motion.div>
      )}
    </AnimatePresence>
  </div>
</PageTransition>
  );
};

/* ── Styles ─────────────────────────────────────────────────────── */
const getStyles = () => ({
  outerContainer: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'hidden',
    pointerEvents: 'none',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    pointerEvents: 'none',
  },
  wrapper: {
    display: 'grid',
    gap: '50px',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    zIndex: 2,
    pointerEvents: 'auto',
  },
  textSide: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'inherit',
  },
  greeting: {
    color: '#0ea5e9',
    letterSpacing: '3px',
    fontSize: '0.72rem',
    fontWeight: '800',
    fontFamily: 'monospace',
    marginBottom: '16px',
    opacity: 0.9,
    display: 'inline-block',
  },
  name: {
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 8px',
    lineHeight: '0.92',
    letterSpacing: '-3px',
  },
  dot: { color: '#0ea5e9' },
  tagline: {
    margin: '24px 0 0',
    fontWeight: '300',
    lineHeight: '1.25',
    letterSpacing: '-0.5px',
    color: '#000000',
    opacity: 0.95,
  },
  ctaGroup: {
    display: 'flex',
    gap: '16px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    padding: '15px 32px',
    borderRadius: '50px',
    border: 'none',
    fontWeight: '900',
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
    textDecoration: 'none',
    background: '#0ea5e9',
    color: '#fff',
    letterSpacing: '1px',
    display: 'inline-block',
  },
  secondaryBtn: {
    padding: '15px 32px',
    borderRadius: '50px',
    border: '2px solid rgba(0, 0, 0, 0.35)',
    background: 'rgba(255, 255, 255, 0.5)',
    color: '#000000',
    fontWeight: '900',
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
    letterSpacing: '1px',
  },
  imageFrame: {
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 0.15)',
    cursor: 'pointer',
  },
  image: { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover',
    objectPosition: 'center 15%'
  },
  statusBar: {
    position: 'absolute',
    bottom: '28px',
    left: '5%',
    right: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    color: '#000000',
  },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  blinkDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 10px #22c55e',
    flexShrink: 0,
  },
  socialStrip: { display: 'flex', gap: '22px' },
  statusLink: {
    color: '#000000',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
    fontSize: '0.65rem',
    letterSpacing: '1px',
    opacity: 0.75,
  },
  mobileSocials: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '36px',
    paddingBottom: '20px',
  },
  mobileSocialIcon: {
    color: 'rgba(0,0,0,0.7)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.15)',
    background: 'rgba(255,255,255,0.5)',
  },
  projectsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 5,
    background: 'transparent',
    pointerEvents: 'auto',
  },
  projectsContainer: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  sectionTitle: {
    fontSize: '2.6rem',
    fontWeight: '900',
    color: '#000000',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    margin: '0 0 8px',
  },
  sectionSubtitle: {
    fontSize: '0.82rem',
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'monospace',
    margin: 0,
    letterSpacing: '1px',
  },
  projectsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '110px',
    width: '100%',
  },
  projectRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    width: '100%',
    padding: '16px 0',
  },
  projectImgCol: {
    flex: '1.2',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  projectImgFrame: {
    borderRadius: '24px',
    overflow: 'hidden',
    width: '100%',
    height: '360px',
    boxShadow: '0 20px 45px rgba(0,0,0,0.25), 0 0 35px rgba(14, 165, 233, 0.12)',
    border: '1px solid rgba(0,0,0,0.12)',
  },
  projectImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  projectTextCol: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    textAlign: 'left',
    width: '100%',
  },
  projectSubtitle: {
    fontSize: '0.88rem',
    fontFamily: 'monospace',
    color: '#0369a1',
    letterSpacing: '2px',
    fontWeight: '800',
    opacity: 0.95,
  },
  projectTitle: {
    fontSize: '2.4rem',
    fontWeight: '950',
    color: '#000000',
    margin: '4px 0',
    letterSpacing: '-0.8px',
    lineHeight: '1.15',
  },
  projectDesc: {
    fontSize: '1.02rem',
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '1.65',
    margin: '4px 0 10px 0',
  },
  tagRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '8px',
  },
  tag: {
    padding: '6px 16px',
    borderRadius: '50px',
    background: 'rgba(14,165,233,0.15)',
    border: '1px solid rgba(14,165,233,0.35)',
    color: '#38bdf8',
    fontSize: '0.72rem',
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  projectActionButtonsRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginTop: '8px',
  },
  primaryActionBtn: {
    padding: '14px 28px',
    borderRadius: '50px',
    border: 'none',
    fontWeight: '900',
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
    textDecoration: 'none',
    background: '#0ea5e9',
    color: '#fff',
    letterSpacing: '1px',
    display: 'inline-block',
    boxShadow: '0 10px 25px rgba(14,165,233,0.3)',
    transition: 'all 0.3s',
  },
  secondaryActionBtn: {
    padding: '14px 28px',
    borderRadius: '50px',
    border: '2px solid rgba(0, 0, 0, 0.35)',
    background: 'rgba(255, 255, 255, 0.5)',
    color: '#000000',
    fontWeight: '900',
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
    textDecoration: 'none',
    letterSpacing: '1px',
    display: 'inline-block',
    transition: 'all 0.3s',
  },
  viewMoreBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  viewMoreBtn: {
    padding: '16px 36px',
    borderRadius: '50px',
    background: '#0ea5e9',
    color: '#fff',
    fontWeight: '900',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
    letterSpacing: '1px',
    border: 'none',
  },
  footerSocialsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '60px',
    padding: '30px 0 60px',
    borderTop: '1px solid rgba(0,0,0,0.12)',
    width: '100%',
    flexWrap: 'wrap',
  },
  footerSocialBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    borderRadius: '50px',
    border: '1.5px solid rgba(0,0,0,0.15)',
    background: 'rgba(255,255,255,0.5)',
    color: '#000000',
    fontSize: '0.78rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
});

export default Home;
