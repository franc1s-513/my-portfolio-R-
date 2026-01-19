import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Certificates = ({ isDark }) => {
  // 1. Detect screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const certs = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Udemy / Meta",
      date: "2023",
      image: "https://api.placeholder.com/600/400", 
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
    <div style={{
      ...styles.section,
      padding: isMobile ? '100px 5% 60px' : '120px 10% 60px' // Less padding on mobile
    }}>
      <div style={styles.container}>
        
        <div style={styles.header}>
          <PageTransition direction="down" delay={0.2}>
            <h1 style={{
              ...styles.title,
              fontSize: isMobile ? '2.2rem' : '3rem' // Scaled title
            }}>
              My <span style={styles.highlight}>Certificates</span>
            </h1>
          </PageTransition>
          <PageTransition direction="down" delay={0.4}>
            <p style={styles.subtitle}>Recognitions and verified skills</p>
          </PageTransition>
        </div>

        <div style={{
          ...styles.grid,
          // Shift to 1 column earlier on very small screens
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? '25px' : '40px'
        }}>
          {certs.map((cert, index) => (
            <PageTransition 
              key={cert.id} 
              delay={0.6 + (index * 0.1)} 
              direction="up"
            >
              <motion.div
                whileHover={isMobile ? {} : { // Disable hover effects on mobile for better scrolling
                  scale: 1.05, 
                  rotate: 1,
                  boxShadow: isDark ? '0 20px 40px rgba(14, 165, 233, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.2)'
                }}
                style={{
                  ...styles.certCard,
                  background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.2)',
                  borderColor: isDark ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div style={{
                  ...styles.imageBox,
                  height: isMobile ? '180px' : '220px' // Shorter images for mobile
                }}>
                  <img src={cert.image} alt={cert.title} style={styles.image} />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.certTitle}>{cert.title}</h3>
                  <p style={styles.issuer}>{cert.issuer} • {cert.date}</p>
                </div>
              </motion.div>
            </PageTransition>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  section: { minHeight: '100vh', zIndex: 10, position: 'relative' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { color: '#fff', fontWeight: '800' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', marginTop: '10px' },
  grid: { display: 'grid' },
  certCard: { borderRadius: '20px', padding: '15px', backdropFilter: 'blur(10px)', border: '1px solid', transition: 'all 0.3s ease', cursor: 'pointer' },
  imageBox: { width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { textAlign: 'left', padding: '0 10px' },
  certTitle: { color: '#fff', fontSize: '1.2rem', margin: '5px 0', fontWeight: '700' },
  issuer: { color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }
};

export default Certificates;