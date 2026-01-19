import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isDark, setIsDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
      if (window.innerWidth >= 850) setIsOpen(false); // Close menu if scaling up
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const navLinks = ['Home', 'About', 'Projects', 'Certificates', 'Contact'];

  // Theme-aware colors for text and icons
  const textColor = isDark ? '#FFFFFF' : '#0f172a';
  const iconColor = isDark ? '#FFFFFF' : '#0f172a';

  return (
    <>
      <nav style={{
        ...styles.nav,
        background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
        borderColor: isDark ? 'rgba(14, 165, 233, 0.3)' : 'rgba(14, 165, 233, 0.2)',
      }}>
        <div style={styles.navContainer}>
          
          <div style={styles.leftSection}>
            <span style={{ ...styles.logoText, color: textColor }}>FRANCIS</span>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)} 
              style={{
                ...styles.toggleBtn,
                background: isDark ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.1)',
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
                  {isDark ? 
                    <Sun size={18} color="#fbbf24" fill="#fbbf24" /> : 
                    <Moon size={18} color="#0ea5e9" fill="#0ea5e9" />
                  }
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* DESKTOP LINKS */}
          {!isMobile && (
            <div style={styles.links}>
              {navLinks.map((item) => (
                <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{...styles.linkText, color: textColor}}>
                  <motion.span whileHover={{ color: '#0ea5e9' }}>{item}</motion.span>
                </Link>
              ))}
            </div>
          )}

          {/* MOBILE HAMBURGER ICON */}
          {isMobile && (
            <div 
              onClick={() => setIsOpen(!isOpen)} 
              style={{ cursor: 'pointer', display: 'flex', zIndex: 1001 }} // Higher zIndex than overlay
            >
              {isOpen ? <X color={isOpen && !isDark ? '#0f172a' : iconColor} /> : <Menu color={iconColor} />}
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            style={{
              ...styles.mobileOverlay,
              background: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            }}
          >
            {navLinks.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (i * 0.05) }}
              >
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    ...styles.mobileLink, 
                    color: isDark ? 'white' : '#0f172a',
                    borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
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
    maxWidth: '800px', 
    padding: '0 20px',
    height: '65px',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '50px', 
    border: '1px solid',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s ease, border-color 0.3s ease',
  },
  navContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoText: { fontWeight: '900', fontSize: '1.2rem', letterSpacing: '1px' },
  toggleBtn: { border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  links: { display: 'flex', gap: '25px' },
  linkText: { textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', transition: '0.3s' },
  
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
    gap: '20px',
  },
  mobileLink: {
    fontSize: '1.8rem',
    fontWeight: '800',
    textDecoration: 'none',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '10px 20px',
    display: 'block',
    textAlign: 'center',
    width: '200px'
  }
};

export default Navbar;