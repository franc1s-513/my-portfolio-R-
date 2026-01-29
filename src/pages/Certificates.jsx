import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react'; // Added X for closing the popup
import PageTransition from '../components/PageTransition';

// IMPORT YOUR IMAGES
import IotCert from '../assets/certificates/iot.png';
import GdgCert from '../assets/certificates/gdg.png';
import LlmCert from '../assets/certificates/nxt.png';
import CloudCert from '../assets/certificates/cloud.png';
import PsgCert from '../assets/certificates/psg.png'; // Added based on your files

const Certificates = ({ isDark }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedImg, setSelectedImg] = useState(null); // Track selected image for popup

  // Handle Scroll Lock
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'unset';  // Unlock scroll
    }
  }, [selectedImg]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const certs = [
    {
      id: 1,
      title: "Introduction To Internet Of Things",
      issuer: "NPTEL (IIT Kharagpur)",
      date: "Jan-Apr 2026",
      status: "Elite",
      score: "75%",
      image: IotCert,
    },
    {
      id: 2,
      title: "GDG Solution Challenge",
      issuer: "Google Developer Groups",
      date: "2026",
      status: "Participant",
      score: null,
      image: GdgCert,
    },
    {
      id: 3,
      title: "LLM in Generative AI",
      issuer: "VIT Vellore (SCOPE)",
      date: "Oct 2026",
      status: "Workshop",
      score: "Research Focused",
      image: LlmCert,
    },
    {
      id: 4,
      title: "Cloud Computing",
      issuer: "NPTEL (IIT Kharagpur)",
      date: "Jul-Oct 2026",
      status: "Certified",
      score: "54%",
      image: CloudCert,
    },
    {
      id: 5,
      title: "Paper Presentation",
      issuer: "PSG Institute of Technology",
      date: "March 2026",
      status: "Award",
      score: "Participation",
      image: PsgCert,
    }
  ];

  return (
    <div style={{
      ...styles.section,
      padding: isMobile ? '100px 5% 60px' : '140px 10% 60px'
    }}>
      <div style={styles.container}>
        
        <div style={styles.header}>
          <PageTransition direction="down" delay={0.2}>
            <h1 style={{
              ...styles.title,
              fontSize: isMobile ? '2.4rem' : '3.5rem'
            }}>
              Official <span style={styles.highlight}>Certifications</span>
            </h1>
          </PageTransition>
          <PageTransition direction="down" delay={0.4}>
            <p style={styles.subtitle}>Verified Technical Expertise & Research</p>
          </PageTransition>
        </div>

        <div style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: isMobile ? '35px' : '50px'
        }}>
          {certs.map((cert, index) => (
            <PageTransition key={cert.id} delay={0.5 + (index * 0.1)} direction="up">
              <motion.div
                whileHover={{ y: -12 }}
                style={{
                  ...styles.certCard,
                  background: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.3)',
                  borderColor: isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.1)',
                  boxShadow: isDark 
                    ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(14, 165, 233, 0.1)' 
                    : '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={styles.imageBox}>
                  <img src={cert.image} alt={cert.title} style={styles.image} />
                  {cert.status && (
                    <div style={{
                      ...styles.badge,
                      background: cert.status === "Elite" ? "#fbbf24" : "#0ea5e9"
                    }}>
                      {cert.status}
                    </div>
                  )}
                </div>
                
                <div style={styles.info}>
                  <h3 style={styles.certTitle}>{cert.title}</h3>
                  <p style={styles.issuer}>{cert.issuer}</p>
                  
                  <div style={styles.footer}>
                    <div style={styles.details}>
                        <span style={styles.date}>{cert.date}</span>
                        {cert.score && <span style={styles.score}>Score: {cert.score}</span>}
                    </div>

                    <motion.button
                      onClick={() => setSelectedImg(cert.image)} // Opens the popup
                      whileHover={{ scale: 1.05, backgroundColor: '#0ea5e9', color: '#fff' }}
                      whileTap={{ scale: 0.95 }}
                      style={styles.viewBtn}
                    >
                      View <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </PageTransition>
          ))}
        </div>
      </div>

      {/* --- PHOTO POPUP (MODAL) --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.overlay}
            onClick={() => setSelectedImg(null)} // Close when clicking background
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()} // Don't close when clicking image
            >
              <button style={styles.closeBtn} onClick={() => setSelectedImg(null)}>
                <X size={30} />
              </button>
              <img src={selectedImg} alt="Certificate Full View" style={styles.fullImage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  // ... (Your existing styles remain the same)
  section: { minHeight: '100vh', zIndex: 10, position: 'relative' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '70px' },
  title: { color: '#fff', fontWeight: '900', letterSpacing: '-1px' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', marginTop: '15px', textTransform: 'uppercase', fontSize: '0.75rem' },
  grid: { display: 'grid' },
  certCard: { 
    borderRadius: '30px', 
    padding: '24px', 
    backdropFilter: 'blur(20px)', 
    border: '1px solid',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  imageBox: { width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '22px', position: 'relative', height: '220px', border: '1px solid rgba(255,255,255,0.05)' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '15px', right: '15px', padding: '6px 14px', borderRadius: '30px', color: '#000', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase' },
  info: { textAlign: 'left' },
  certTitle: { color: '#fff', fontSize: '1.2rem', marginBottom: '6px', fontWeight: '800', lineHeight: '1.3' },
  issuer: { color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '20px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '18px' },
  details: { display: 'flex', flexDirection: 'column', gap: '2px' },
  date: { color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' },
  score: { color: '#0ea5e9', fontSize: '0.85rem', fontWeight: '800' },
  viewBtn: { 
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer',
    padding: '8px 18px', 
    borderRadius: '15px', 
    fontSize: '0.8rem', 
    fontWeight: '700', 
    color: '#0ea5e9', 
    border: '1px solid #0ea5e9',
    transition: 'all 0.3s ease',
    background: 'transparent'
  },

  // NEW STYLES FOR THE POPUP
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    padding: '20px'
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    justifyContent: 'center'
  },
  fullImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    borderRadius: '15px',
    boxShadow: '0 0 50px rgba(14, 165, 233, 0.3)'
  },
  closeBtn: {
    position: 'absolute',
    top: '-50px',
    right: '0',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  }
};

export default Certificates