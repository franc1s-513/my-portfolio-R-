import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        
        {/* LEFT SIDE: Name and Toggle */}
        <div style={styles.leftSection}>
          <span style={styles.logoText}>FRANCIS</span>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            style={styles.toggleBtn}
          >
            {darkMode ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#0ea5e9" />}
          </button>
        </div>

        {/* RIGHT SIDE: Text Links */}
        <div style={styles.links}>
          <Link to="/" className="nav-link">About</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/certificates" className="nav-link">Certificates</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
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
    width: 'fit-content', // Makes it wrap tightly around the content
    padding: '0 10px',
    height: '55px',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '50px', // Perfect Pill Shape
    border: '1px solid rgba(255, 255, 255, 0.4)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  navContainer: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    padding: '0 25px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoText: {
    fontWeight: '900',
    color: '#0ea5e9',
    fontSize: '1rem',
    letterSpacing: '0.5px'
  },
  toggleBtn: {
    background: 'rgba(14, 165, 233, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease'
  },
  links: {
    display: 'flex',
    gap: '20px',
  }
};

export default Navbar;