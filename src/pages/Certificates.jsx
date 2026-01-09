import React from 'react';
import { motion } from 'framer-motion';

const Certificates = ({ isDark }) => {
  const certs = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Udemy / Meta",
      date: "2023",
      image: "https://api.placeholder.com/600/400", // Replace with your cert image
    },
    {
      id: 2,
      title: "React Advanced Patterns",
      issuer: "Coursera",
      date: "2023",
      image: "https://api.placeholder.com/600/400",
    },
    {
      id: 3,
      title: "UI/UX Design Essentials",
      issuer: "Google",
      date: "2024",
      image: "https://api.placeholder.com/600/400",
    }
  ];

  return (
    <div style={styles.section}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.container}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>My <span style={styles.highlight}>Certificates</span></h1>
          <p style={styles.subtitle}>Recognitions and verified skills</p>
        </div>

        <div style={styles.grid}>
          {certs.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ scale: 1.05, rotate: 1 }}
              style={{
                ...styles.certCard,
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isDark ? '0 10px 30px rgba(14, 165, 233, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={styles.imageBox}>
                <img src={cert.image} alt={cert.title} style={styles.image} />
              </div>
              <div style={styles.info}>
                <h3 style={styles.certTitle}>{cert.title}</h3>
                <p style={styles.issuer}>{cert.issuer} • {cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    padding: '120px 10% 60px',
    zIndex: 10,
    position: 'relative'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  title: {
    fontSize: '3rem',
    color: '#fff',
    fontWeight: '800'
  },
  highlight: {
    color: '#0ea5e9'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '2px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px'
  },
  certCard: {
    borderRadius: '20px',
    padding: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  imageBox: {
    width: '100%',
    height: '220px',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '15px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  info: {
    textAlign: 'left',
    padding: '0 10px'
  },
  certTitle: {
    color: '#fff',
    fontSize: '1.2rem',
    margin: '5px 0'
  },
  issuer: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.9rem'
  }
};

export default Certificates;