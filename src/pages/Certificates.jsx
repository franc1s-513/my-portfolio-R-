import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const certificates = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    issuer: "Coursera / Meta",
    date: "Dec 2025",
    link: "#", 
    image: "https://via.placeholder.com/400x250?text=Fullstack+Certificate" 
  },
  {
    id: 2,
    title: "UI/UX Design Essentials",
    issuer: "Google",
    date: "Oct 2025",
    link: "#",
    image: "https://via.placeholder.com/400x250?text=UI+UX+Design"
  },
  {
    id: 3,
    title: "Advanced React & Next.js",
    issuer: "Udemy",
    date: "Jan 2026",
    link: "#",
    image: "https://via.placeholder.com/400x250?text=React+Pro"
  }
];

// 1. Define Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time between each card appearing
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const Certificates = () => {
  return (
    <div className="page-container" style={styles.container}>
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.header}
      >
        <h2 style={styles.title}>My <span style={{ color: '#0ea5e9' }}>Certifications</span></h2>
        <p style={styles.subtitle}>Verified proof of my technical expertise and commitment to learning.</p>
      </motion.div>

      {/* Animated Grid Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Starts when 10% of grid is visible
        style={styles.grid}
      >
        {certificates.map((cert) => (
          <motion.div 
            key={cert.id} 
            variants={cardVariants}
            className="cert-card" 
            style={styles.card}
            whileHover={{ y: -10 }} // Framer motion hover lift
          >
            <div style={styles.imageContainer}>
              <img src={cert.image} alt={cert.title} style={styles.image} />
              <div className="cert-overlay" style={styles.overlay}>
                <Award size={48} color="white" />
              </div>
            </div>
            
            <div style={styles.content}>
              <h3 style={styles.certTitle}>{cert.title}</h3>
              <p style={styles.issuer}>{cert.issuer} • {cert.date}</p>
              <a href={cert.link} target="_blank" rel="noreferrer" style={styles.viewLink}>
                View Certificate <ExternalLink size={16} style={{ marginLeft: '5px' }} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    padding: '140px 20px 80px', // Extra top padding for the fixed pill nav
    maxWidth: '1100px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '15px',
    fontWeight: '800',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1.2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '35px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    height: '220px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(14, 165, 233, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: '0.4s ease',
  },
  content: {
    padding: '25px',
  },
  certTitle: {
    fontSize: '1.4rem',
    marginBottom: '10px',
    fontWeight: '700',
  },
  issuer: {
    color: '#64748b',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  viewLink: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#0ea5e9',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default Certificates;