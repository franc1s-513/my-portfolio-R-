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
    // 1. Widened the bar
    width: '95%',            
    maxWidth: '800px', // Increased from 850px for a more "full" look
    padding: '0 20px',
    height: '60px',
    background: 'rgba(255, 255, 255, 0.3)', // Lowered from 0.4 for more "clear" glass
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
    // 2. This creates the "Space in the middle" by pushing items to the ends
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 15px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px', // Keep Francis and Toggle close together
  
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
    // 3. Spaced out the links on the right corner
    gap: '30px', 
  },
};

export default Navbar;