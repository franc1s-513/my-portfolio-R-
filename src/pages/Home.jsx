import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div style={styles.container}>
      {/* This main content area is transparent so you see the birds clearly */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={styles.content}
      >
        <h2 style={styles.greeting}>HELLO, I'M</h2>
        
        {/* Massive White Heading for a premium feel */}
        <h1 style={styles.name}>
          FRANCIS<span style={styles.dot}>.</span>
        </h1>

        <p style={styles.tagline}>
          Building <span style={styles.highlight}>digital experiences</span> that 
          blend logic with creative design.
        </p>
        
        <div style={styles.ctaGroup}>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#0ea5e9' }}
            whileTap={{ scale: 0.95 }}
            style={styles.primaryBtn}
          >
            View Projects
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={styles.secondaryBtn}
          >
            Download CV
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
  },
  content: {
    zIndex: 2,
    maxWidth: '800px',
  },
  greeting: {
    fontSize: '0.9rem',
    letterSpacing: '5px',
    color: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    fontWeight: '600',
    marginBottom: '15px',
  },
  name: {
    fontSize: 'clamp(3.5rem, 12vw, 8rem)', // Large and breathable
    fontWeight: '900',
    margin: '0',
    lineHeight: '0.8',
    color: '#FFFFFF', // Solid White
    letterSpacing: '-2px',
    // Adds that "Elevated" look to the text
    textShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', 
  },
  dot: {
    color: '#0ea5e9', // Sky blue dot for a pop of color
  },
  tagline: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: '30px',
    fontWeight: '400',
  },
  highlight: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecoration: 'none', // REMOVES THAT UNDERLINE
    borderBottom: '2px solid #0ea5e9', // Cleaner, stylish highlight
    paddingBottom: '2px',
  },
  ctaGroup: {
    marginTop: '50px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  },
  primaryBtn: {
    padding: '16px 36px',
    borderRadius: '50px',
    border: 'none',
    backgroundColor: '#FFFFFF', // High contrast
    color: '#0ea5e9',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
  secondaryBtn: {
    padding: '16px 36px',
    borderRadius: '50px',
    border: '2px solid #FFFFFF',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }
};

export default Home;