import React from 'react';
import { motion } from 'framer-motion';

const Home = ({ isDark }) => {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* LEFT SIDE: Text Content with Floating Animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={styles.textSide}
        >
          {/* We wrap the text in a floating motion div */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 style={styles.greeting}>HELLO, I'M</h2>
            <h1 style={{
              ...styles.name,
              textShadow: isDark ? '0 0 30px rgba(14, 165, 233, 0.5)' : 'none'
            }}>
              FRANCIS<span style={styles.dot}>.</span>
            </h1>
            <p style={styles.tagline}>
              Building <span style={styles.highlight}>digital experiences</span> that 
              blend logic with creative design.
            </p>
          </motion.div>

          <div style={styles.ctaGroup}>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5, boxShadow: isDark ? '0 10px 20px rgba(14, 165, 233, 0.4)' : '0 10px 20px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...styles.primaryBtn,
                background: isDark ? '#0ea5e9' : '#fff',
                color: isDark ? '#fff' : '#0ea5e9'
              }}
            >
              View Projects
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={styles.secondaryBtn}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Animated Blob Profile Picture */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.5, 1] // Precisely maps the movement
  }}
  style={{ willChange: "transform" }} // Key for performance
>
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              borderRadius: [
                '30% 70% 70% 30% / 30% 30% 70% 70%', 
                '50% 50% 33% 67% / 55% 27% 73% 45%', 
                '30% 70% 70% 30% / 30% 30% 70% 70%'
              ]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              ...styles.imageFrame,
              borderColor: isDark ? 'rgba(14, 165, 233, 0.5)' : 'rgba(255, 255, 255, 0.4)',
              boxShadow: isDark 
                ? '0 30px 60px rgba(14, 165, 233, 0.4)' 
                : '0 30px 60px rgba(0, 74, 124, 0.1)',
            }}
          >
            <img 
              src="YOUR_IMAGE_URL_HERE" 
              alt="Francis" 
              style={styles.image} 
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

// ... (Your styles remain mostly the same, just a few dynamic additions above)
const styles = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10%', position: 'relative', zIndex: 10 },
  wrapper: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center', width: '100%', maxWidth: '1200px' },
  textSide: { textAlign: 'left' },
  imageSide: { display: 'flex', justifyContent: 'center' },
  imageFrame: { width: '380px', height: '450px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', border: '3px solid', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.8s ease' },
  image: { width: '110%', height: '110%', objectFit: 'cover', marginLeft: '-5%', marginTop: '-5%' },
  greeting: { color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: '600' },
  name: { fontSize: '6.5rem', fontWeight: '900', color: '#fff', margin: '5px 0', lineHeight: '1', letterSpacing: '-2px', transition: 'text-shadow 0.8s ease' },
  dot: { color: '#0ea5e9' },
  tagline: { color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.25rem', maxWidth: '500px', marginTop: '20px', lineHeight: '1.6' },
  highlight: { color: '#fff', fontWeight: '700', borderBottom: '2px solid #0ea5e9', paddingBottom: '2px' },
  ctaGroup: { display: 'flex', gap: '20px', marginTop: '40px' },
  primaryBtn: { padding: '15px 35px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.5s ease' },
  secondaryBtn: { padding: '15px 35px', borderRadius: '50px', border: '2px solid #fff', background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' },
};

export default Home;