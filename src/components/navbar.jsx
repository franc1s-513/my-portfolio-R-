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
      if (window.innerWidth >= 850) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const navLinks = ['Home', 'About', 'Projects', 'Certificates', 'Contact'];

  // FIXED: Explicitly force white in dark mode and dark slate in light mode
  const textColor = isDark ? '#FFFFFF' : '#0f172a';
  const iconColor = isDark ? '#FFFFFF' : '#0f172a';

  return (
    <>
      <nav style={{
        ...styles.nav,
        background: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.75)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(14, 165, 233, 0.2)',
      }}>
        <div style={styles.navContainer}>
          
          <div style={styles.leftSection}>
            <span style={{ 
              ...styles.logoText, 
              color: textColor,
              textShadow: isDark ? '0 0 10px rgba(255,255,255,0.3)' : 'none' 
            }}>
              FRANCIS
            </span>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)} 
              style={{
                ...styles.toggleBtn,
                background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(14, 165, 233, 0.1)',
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

          {/* DESKTOP LINKS - FIXED COLOR LOGIC */}
          {!isMobile && (
            <div style={styles.links}>
              {navLinks.map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  style={{
                    ...styles.linkText, 
                    color: textColor, // Forces color update on state change
                  }}
                >
                  <motion.span 
                    whileHover={{ color: '#0ea5e9', y: -2 }}
                    style={{ display: 'inline-block' }}
                  >
                    {item}
                  </motion.span>
                </Link>
              ))}
            </div>
          )}

          {/* MOBILE HAMBURGER ICON */}
          {isMobile && (
            <div 
              onClick={() => setIsOpen(!isOpen)} 
              style={{ cursor: 'pointer', display: 'flex', zIndex: 1001 }}
            >
              {isOpen ? 
                <X color={isDark ? '#FFFFFF' : '#0f172a'} /> : 
                <Menu color={iconColor} />
              }
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
              background: isDark ? '#0f172a' : '#ffffff',
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
                    color: isDark ? '#FFFFFF' : '#0f172a', // Fixed mobile visibility
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
    padding: '0 25px',
    height: '65px',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '50px', 
    border: '1px solid',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  navContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoText: { fontWeight: '900', fontSize: '1.2rem', letterSpacing: '2px', transition: 'color 0.3s' },
  toggleBtn: { border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' },
  links: { display: 'flex', gap: '30px' },
  linkText: { 
    textDecoration: 'none', 
    fontSize: '0.85rem', 
    fontWeight: '700', 
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease' 
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
    gap: '30px',
  },
  mobileLink: {
    fontSize: '2rem',
    fontWeight: '900',
    textDecoration: 'none',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    padding: '10px',
    transition: '0.3s'
  }
};

export default Navbar;