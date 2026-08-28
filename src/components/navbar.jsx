import React, { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlareHover from './GlareHover';

const getMenuVariants = (isReduced) => ({
  hidden: {
    opacity: 0,
    y: isReduced ? 0 : '-100%',
    transition: { duration: isReduced ? 0.05 : 0.35, ease: [0.76, 0, 0.24, 1] }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isReduced ? 0.05 : 0.5, ease: [0.22, 1, 0.36, 1] }
  }
});

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }
};

const getLinkVariants = (isReduced) => ({
  hidden: { opacity: 0, y: isReduced ? 0 : 22 },
  visible: { opacity: 1, y: 0, transition: { duration: isReduced ? 0.05 : 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: isReduced ? 0 : -10, transition: { duration: isReduced ? 0.05 : 0.22, ease: 'easeIn' } }
});

const Navbar = ({ onOpenModal }) => {
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
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      let current = 'Home';
      if (progress < 0.25) current = 'Home';
      else if (progress < 0.55) current = 'About';
      else if (progress < 0.82) current = 'Projects';
      else if (progress < 0.94) current = 'Certificates';
      else current = 'Contact';
      setActiveSection((prev) => (prev === current ? prev : current));
    };
    
    let isThrottled = false;
    const throttledScrollSpy = () => {
      if (!isThrottled) {
        window.requestAnimationFrame(() => {
          handleScrollSpy();
          isThrottled = false;
        });
        isThrottled = true;
      }
    };

    window.addEventListener('scroll', throttledScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', throttledScrollSpy);
  }, []);

  const isActive = (item) => activeSection === item;

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const key = item.toLowerCase();
    if (['about', 'projects', 'certificates', 'contact'].includes(key)) {
      if (onOpenModal) onOpenModal(key);
    } else if (key === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (isOpen) setIsOpen(false);
  };

  const handleScroll = useCallback(() => {
    let ticking = false;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
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
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = ['Home', 'About', 'Projects', 'Certificates', 'Contact'];

  const navStyle = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '850px',
    padding: '0 25px',
    borderRadius: '0px',
    border: '1px solid',
    zIndex: 'var(--z-nav)',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: '#ffffff',
    borderColor: 'rgba(0,0,0,0.1)',
    top: scrolled ? '12px' : '25px',
    height: scrolled ? '54px' : '65px',
    boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
  };

  return (
    <>
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'Home')}
              style={{
                fontWeight: '900',
                fontSize: '1.2rem',
                letterSpacing: '2px',
                transition: 'color 0.3s',
                color: '#0A192F',
                textDecoration: 'none',
                textShadow: 'none',
              }}
              aria-label="Francis Fernando — Home"
            >
              FRANCIS
            </a>
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', gap: '30px' }} role="list">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                  role="listitem"
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                    color: isActive(item) ? '#0A192F' : 'rgba(10, 25, 47, 0.6)',
                    textShadow: 'none',
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
            <GlareHover borderRadius="6px">
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
                {isOpen ? <X color="var(--text-main)" size={24} /> : <Menu color="var(--text-main)" size={24} />}
              </button>
            </GlareHover>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
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
              background: 'rgba(240, 249, 255, 0.97)',
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
                <motion.div key={item} variants={linkVariants}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item)}
                    style={{
                      fontSize: '2rem',
                      fontWeight: '900',
                      textDecoration: 'none',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      padding: '10px',
                      transition: 'color 0.3s',
                      color: isActive(item) ? 'var(--color-primary)' : 'var(--text-main)',
                      textShadow: isActive(item) ? '0 0 20px rgba(14, 165, 233, 0.5)' : 'none',
                    }}
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
