import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// IMPORT YOUR IMAGES
import IotCert from '../assets/certificates/iot.png';
import GdgCert from '../assets/certificates/gdg.png';
import LlmCert from '../assets/certificates/nxt.png';
import CloudCert from '../assets/certificates/cloud.png';
import PsgCert from '../assets/certificates/psg.png';

// --- 3D TILT COMPONENT ---
const TiltCard = ({ children, isDark }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...styles.certCard,
        background: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.3)',
        borderColor: isDark ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.1)',
        boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
};

const Certificates = ({ isDark }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track index instead of image

  const certs = [
    { id: 1, title: "Introduction To Internet Of Things", issuer: "NPTEL (IIT Kharagpur)", date: "Jan-Apr 2026", status: "Elite", score: "75%", image: IotCert },
    { id: 2, title: "GDG Solution Challenge", issuer: "Google Developer Groups", date: "2026", status: "Participant", score: null, image: GdgCert },
    { id: 3, title: "LLM in Generative AI", issuer: "VIT Vellore (SCOPE)", date: "Oct 2026", status: "Workshop", score: "Research Focused", image: LlmCert },
    { id: 4, title: "Cloud Computing", issuer: "NPTEL (IIT Kharagpur)", date: "Jul-Oct 2026", status: "Certified", score: "54%", image: CloudCert },
    { id: 5, title: "Paper Presentation", issuer: "PSG Institute of Technology", date: "March 2026", status: "Award", score: "Participation", image: PsgCert }
  ];

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : 'unset';
  }, [selectedIndex]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % certs.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + certs.length) % certs.length);

  return (
    <div style={{ ...styles.section, padding: isMobile ? '100px 5% 60px' : '140px 10% 60px' }}>
      <div style={styles.container}>
        <div style={styles.header}>
          <PageTransition direction="down" delay={0.2}>
            <h1 style={{ ...styles.title, fontSize: isMobile ? '2.4rem' : '3.5rem' }}>
              Official <span style={styles.highlight}>Certifications</span>
            </h1>
          </PageTransition>
          <p style={styles.subtitle}>Verified Technical Expertise & Research</p>
        </div>

        <div style={{ ...styles.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', gap: isMobile ? '35px' : '50px' }}>
          {certs.map((cert, index) => (
            <PageTransition key={cert.id} delay={0.5 + (index * 0.1)} direction="up">
              <TiltCard isDark={isDark}>
                <div style={styles.imageBox}>
                  <img src={cert.image} alt={cert.title} style={styles.image} />
                  {cert.status && (
                    <div style={{ ...styles.badge, background: cert.status === "Elite" ? "#fbbf24" : "#0ea5e9" }}>{cert.status}</div>
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
                      onClick={() => setSelectedIndex(index)}
                      whileHover={{ scale: 1.05, backgroundColor: '#0ea5e9', color: '#fff' }}
                      style={styles.viewBtn}
                    >
                      View <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                    </motion.button>
                  </div>
                </div>
              </TiltCard>
            </PageTransition>
          ))}
        </div>
      </div>

      {/* --- GALLERY MODAL --- */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.overlay} onClick={() => setSelectedIndex(null)}>
            
            {/* Left Arrow */}
            <button style={{ ...styles.navBtn, left: '20px' }} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <ChevronLeft size={40} />
            </button>

            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalActions}>
                <a href={certs[selectedIndex].image} download style={styles.downloadBtn}><Download size={20} /></a>
                <button style={styles.closeBtn} onClick={() => setSelectedIndex(null)}><X size={24} /></button>
              </div>
              <img src={certs[selectedIndex].image} alt="Full View" style={styles.fullImage} />
              <p style={{ color: 'white', marginTop: '15px', textAlign: 'center' }}>{certs[selectedIndex].title}</p>
            </motion.div>

            {/* Right Arrow */}
            <button style={{ ...styles.navBtn, right: '20px' }} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight size={40} />
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  // Keeping your existing styles + adding new ones
  section: { minHeight: '100vh', zIndex: 10, position: 'relative', perspective: '1000px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '70px' },
  title: { color: '#fff', fontWeight: '900' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', marginTop: '15px', textTransform: 'uppercase', fontSize: '0.75rem' },
  grid: { display: 'grid' },
  certCard: { borderRadius: '30px', padding: '24px', backdropFilter: 'blur(20px)', border: '1px solid', cursor: 'pointer' },
  imageBox: { width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '22px', height: '220px' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '15px', right: '15px', padding: '6px 14px', borderRadius: '30px', color: '#000', fontSize: '0.65rem', fontWeight: '900' },
  info: { textAlign: 'left' },
  certTitle: { color: '#fff', fontSize: '1.2rem', marginBottom: '6px', fontWeight: '800' },
  issuer: { color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '20px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '18px' },
  details: { display: 'flex', flexDirection: 'column' },
  date: { color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' },
  score: { color: '#0ea5e9', fontSize: '0.85rem', fontWeight: '800' },
  viewBtn: { display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 18px', borderRadius: '15px', color: '#0ea5e9', border: '1px solid #0ea5e9', background: 'transparent' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(10px)' },
  modalContent: { position: 'relative', maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  fullImage: { maxWidth: '100%', maxHeight: '75vh', borderRadius: '15px', boxShadow: '0 0 50px rgba(14,165,233,0.3)' },
  modalActions: { position: 'absolute', top: '-50px', right: 0, display: 'flex', gap: '15px' },
  downloadBtn: { color: '#fff', background: '#0ea5e9', padding: '8px', borderRadius: '50%', display: 'flex' },
  closeBtn: { background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' },
  navBtn: { position: 'absolute', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: '0.3s' }
};

export default Certificates;