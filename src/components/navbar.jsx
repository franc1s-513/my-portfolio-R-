import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

// 1. Receive state as props from App.jsx
const Navbar = ({ isDark, setIsDark }) => {

  useEffect(() => {
    // 2. Apply dark mode class to body for global CSS changes
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDark]);

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        
        {/* LEFT SIDE: Name and Toggle */}
        <div style={styles.leftSection}>
          <span style={styles.logoText}>FRANCIS</span>
          <button 
            onClick={() => setIsDark(!isDark)} // 3. Use the passed function
            style={styles.toggleBtn}
          >
            {isDark ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#0ea5e9" />}
          </button>
        </div>

        {/* RIGHT SIDE: Text Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.linkText}>Home</Link>
          <Link to="/about" style={styles.linkText}>About</Link>
          <Link to="/projects" style={styles.linkText}>Projects</Link>
          <Link to="/certificates" style={styles.linkText}>Certificates</Link>
          <Link to="/contact" style={styles.linkText}>Contact</Link>
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
    background: 'rgba(255, 255, 255, 0.2)', 
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '50px', 
    border: '1px solid rgba(255, 255, 255, 0.3)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
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
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease'
  },
  links: {
    display: 'flex',
    gap: '20px', 
  },
  linkText: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500'
  }
};

export default Navbar;