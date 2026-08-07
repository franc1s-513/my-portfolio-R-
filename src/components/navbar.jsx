import React, { useEffect, useState, useCallback } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getMenuVariants = (isReduced) => ({
  hidden: {
    opacity: 0,
    y: isReduced ? 0 : '-100%',
    transition: {
      duration: isReduced ? 0.05 : 0.35,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isReduced ? 0.05 : 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    }
  }
};

const getLinkVariants = (isReduced) => ({
  hidden: { opacity: 0, y: isReduced ? 0 : 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isReduced ? 0.05 : 0.45, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: isReduced ? 0 : -10,
    transition: { duration: isReduced ? 0.05 : 0.22, ease: 'easeIn' }
  }
});

const Navbar = ({ isDark, setIsDark, onOpenModal }) => {
  const isReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const menuVariants = getMenuVariants(isReduced);
  const linkVariants = getLinkVariants(isReduced);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about', 'projects', 'certificates', 'contact'];
      let current = 'Home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.charAt(0).toUpperCase() + section.slice(1);
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const isActive = (item) => activeSection === item;

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const key = item.toLowerCase();
    if (key === 'about' || key === 'projects' || key === 'certificates') {
      if (onOpenModal) onOpenModal(key);
    } else if (key === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (isOpen) setIsOpen(false);
  };

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
      if (window.innerWidth >= 850) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = ['Home', 'About', 'Projects', 'Certificates', 'Contact'];
  const textColor = isDark ? '#FFFFFF' : '#0f172a';

  const navStyle = {
    ...styles.nav,
    background: isDark
      ? scrolled ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.4)'
      : scrolled ? 'rgba(224, 242, 254, 0.75)' : 'rgba(224, 242, 254, 0.4)',
    borderColor: isDark
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(14, 165, 233, 0.4)',
    backdropFilter: scrolled ? 'blur(28px) saturate(200%)' : 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(200%)' : 'blur(20px) saturate(180%)',
    top: scrolled ? '12px' : '25px',
    padding: scrolled ? '0 25px' : '0 25px',
    height: scrolled ? '54px' : '65px',
    boxShadow: scrolled
      ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(14, 165, 233, 0.1)'
      : '0 15px 35px rgba(0, 0, 0, 0.12)',
  };

  return (
    <>
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        <div style={styles.navContainer}>

          <div style={styles.leftSection}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'Home')}
              style={{
                ...styles.logoText,
                color: textColor,
                textDecoration: 'none',
                textShadow: isDark ? '0 0 10px rgba(255,255,255,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
              }}
              aria-label="Francis Fernando — Home"
            >
              FRANCIS
            </a>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                ...styles.toggleBtn,
                background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(14, 165, 233, 0.15)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ y: 10, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -10, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {isDark
                    ? <Sun size={18} color="#fbbf24" fill="#fbbf24" />
                    : <Moon size={18} color="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} />
                  }
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {!isMobile && (
            <div style={styles.links} role="list">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                  role="listitem"
                  style={{
                    ...styles.linkText,
                    color: isActive(item) ? '#0ea5e9' : textColor,
                    textShadow: isActive(item)
                      ? '0 0 10px rgba(14, 165, 233, 0.6)'
                      : '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  aria-current={isActive(item) ? 'page' : undefined}
                >
                  <motion.span
                    whileHover={{ color: '#0ea5e9', y: -2 }}
                    style={{ display: 'inline-block', position: 'relative', paddingBottom: '6px' }}
                  >
                    {item}
                    {isActive(item) && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
                          borderRadius: '1px',
                          boxShadow: '0 0 8px #0ea5e9',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </a>
              ))}
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px',
                display: 'flex',
                cursor: 'pointer',
                zIndex: 1001,
                borderRadius: '6px',
              }}
            >
              {isOpen
                ? <X color={isDark ? '#FFFFFF' : '#0f172a'} size={24} />
                : <Menu color={isDark ? '#FFFFFF' : '#0f172a'} size={24} />
              }
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              ...styles.mobileOverlay,
              background: isDark ? 'rgba(2, 6, 23, 0.97)' : 'rgba(240, 249, 255, 0.97)',
              backdropFilter: 'blur(20px)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.div
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
            >
              {navLinks.map((item) => (
                <motion.div
                  key={item}
                  variants={linkVariants}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item)}
                    style={{
                      ...styles.mobileLink,
                      color: isActive(item) ? '#0ea5e9' : (isDark ? '#FFFFFF' : '#0f172a'),
                      textShadow: isActive(item) ? '0 0 20px rgba(14, 165, 233, 0.5)' : 'none',
                    }}
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </a>
                </motion.div>
              ))}

              {/* Mode toggle inside mobile menu */}
              <motion.div
                variants={linkVariants}
                style={{ marginTop: '20px' }}
              >
                <button
                  onClick={() => setIsDark(!isDark)}
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(14,165,233,0.1)',
                    border: '1px solid rgba(14,165,233,0.3)',
                    borderRadius: '50px',
                    padding: '12px 28px',
                    color: isDark ? '#fff' : '#0f172a',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#0ea5e9" />}
                  {isDark ? 'LIGHT_MODE' : 'DARK_MODE'}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: '25px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '850px',
    padding: '0 25px',
    height: '65px',
    borderRadius: '50px',
    border: '1px solid',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important',
  },
  navContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoText: {
    fontWeight: '900',
    fontSize: '1.2rem',
    letterSpacing: '2px',
    transition: 'color 0.3s !important',
  },
  toggleBtn: {
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s !important',
  },
  links: { display: 'flex', gap: '30px' },
  linkText: {
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease !important',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    gap: '28px',
  },
  mobileLink: {
    fontSize: '2rem',
    fontWeight: '900',
    textDecoration: 'none',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    padding: '10px',
    transition: 'color 0.3s !important',
  },
  waypointHud: {
    position: 'fixed',
    right: '25px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 900,
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    padding: '16px 14px',
    background: 'rgba(15, 23, 42, 0.45)',
    backdropFilter: 'blur(16px)',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  waypointNode: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  waypointDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    flexShrink: 0,
  },
  waypointLabel: {
    fontFamily: 'monospace',
    fontSize: '11px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  },
};

export default Navbar;
