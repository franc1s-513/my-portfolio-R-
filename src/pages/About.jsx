import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = ({ isDark }) => {
  // 1. Screen size detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 850);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div style={{
      ...styles.section,
      padding: isMobile ? '100px 5% 60px' : '120px 10% 60px'
    }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={styles.container}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} style={{
          ...styles.header,
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <h2 style={styles.subtitle}>GET TO KNOW</h2>
          <h1 style={{
            ...styles.title,
            fontSize: isMobile ? '2.5rem' : '3.5rem' // Scale down title for small screens
          }}>
            About <span style={styles.highlight}>Me</span>
          </h1>
        </motion.div>

        <div style={{
          ...styles.grid,
          // Collapse grid to 1 column on mobile
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
        }}>
          
          {/* Main Bio - Glass Card */}
          <motion.div 
            variants={itemVariants} 
            style={{
              ...styles.mainCard,
              gridColumn: isMobile ? '1 / -1' : '1 / 3', // Full width on mobile
              boxShadow: isDark 
                ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
                : '0 20px 40px rgba(0, 0, 0, 0.1)',
              background: isDark 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <h3 style={styles.cardTitle}>My Story</h3>
            <p style={styles.text}>
              I'm a developer who thrives at the intersection of **clean code** and 
              **immersive design**. Much like the sky, I believe digital spaces should feel 
              limitless and fluid. I specialize in building React applications that 
              don't just work—they feel alive.
            </p>
          </motion.div>

          {/* Skills Bento Box */}
          <motion.div 
            variants={itemVariants} 
            style={{
              ...styles.skillCard,
              background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <h3 style={styles.cardTitle}>Tech Stack</h3>
            <div style={styles.skillGrid}>
              {['React', 'Framer Motion', 'Node.js', 'UI Design'].map((skill) => (
                <span key={skill} style={styles.tag}>{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* Education Box */}
          <motion.div 
            variants={itemVariants} 
            style={{
              ...styles.infoCard,
              gridColumn: isMobile ? '1 / -1' : '3 / 4', // Full width on mobile
              background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <h3 style={styles.cardTitle}>Education</h3>
            <p style={styles.smallText}>Currently exploring the depths of Software Engineering and modern Web Architectures.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10, 
  },
  container: { maxWidth: '1100px', width: '100%' },
  header: { marginBottom: '50px' },
  subtitle: { fontSize: '0.9rem', letterSpacing: '4px', color: 'rgba(255, 255, 255, 0.7)', margin: 0 },
  title: { fontWeight: '900', color: '#fff', margin: '10px 0' },
  highlight: { color: '#0ea5e9' },
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gap: '20px',
  },
  mainCard: {
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '30px',
    padding: '40px',
    transition: 'all 0.5s ease',
  },
  skillCard: {
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '30px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.5s ease',
  },
  infoCard: {
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '30px',
    padding: '30px',
    transition: 'all 0.5s ease',
  },
  cardTitle: { color: '#fff', fontSize: '1.4rem', marginBottom: '15px', fontWeight: '700' },
  text: { color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', fontSize: '1.1rem' },
  smallText: { color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', fontSize: '0.95rem' },
  skillGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  tag: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '6px 14px',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }
};

export default About;