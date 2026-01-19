import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isDark, setIsDark }) => {

  useEffect(() => {
    // Apply global class for CSS transitions
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDark]);

  return (
    <nav style={{
      ...styles.nav,
      background: isDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.2)',
      borderColor: isDark ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.3)',
    }}>
      <div style={styles.navContainer}>
        
        {/* LEFT SIDE: Name and Toggle */}
        <div style={styles.leftSection}>
          <span style={styles.logoText}>FRANCIS</span>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)} 
            style={{
              ...styles.toggleBtn,
              background: isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255, 255, 255, 0.2)',
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

        {/* RIGHT SIDE: Text Links */}
        <div style={styles.links}>
          {['Home', 'About', 'Projects', 'Certificates', 'Contact'].map((item) => (
            <Link 
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              style={styles.linkText}
            >
              <motion.span whileHover={{ color: '#0ea5e9' }}>{item}</motion.span>
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: '25px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '95%',            
    maxWidth: '800px', 
    padding: '0 20px',
    height: '60px',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '50px', 
    border: '1px solid',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.8s ease', // Smoothly changes the bar color
  },
  navContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 15px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoText: {
    fontWeight: '900',
    color: '#FFFFFF', 
    fontSize: '1.1rem',
    letterSpacing: '1px'
  },
  toggleBtn: {
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  links: {
    display: 'flex',
    gap: '20px', 
  },
  linkText: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
  }
};

export default Navbar;