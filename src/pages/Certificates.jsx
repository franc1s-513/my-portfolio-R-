import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Download, ShieldCheck } from 'lucide-react';

// IMPORT YOUR IMAGES
import IotCert from '../assets/certificates/iot.png';
import GdgCert from '../assets/certificates/gdg.png';
import LlmCert from '../assets/certificates/nxt.png';
import CloudCert from '../assets/certificates/cloud.png';
import PsgCert from '../assets/certificates/psg.png';

const Certificates = ({ isDark }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certs = [
    { id: 1, title: "IoT Specialist", size: "large", issuer: "NPTEL (IIT-K)", status: "Elite", image: IotCert, color: "#fbbf24" },
    { id: 2, title: "GDG Global", size: "small", issuer: "Google", status: "Participant", image: GdgCert, color: "#0ea5e9" },
    { id: 3, title: "GenAI Expert", size: "tall", issuer: "VIT SCOPE", status: "Workshop", image: LlmCert, color: "#a855f7" },
    { id: 4, title: "Cloud Architect", size: "small", issuer: "NPTEL", status: "Certified", image: CloudCert, color: "#10b981" },
    { id: 5, title: "Research Lead", size: "large", issuer: "PSG Tech", status: "Award", image: PsgCert, color: "#f43f5e" }
  ];

  const doubledRow1 = [...certs, ...certs];
  const doubledRow2 = [...certs].reverse().concat([...certs].reverse());

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} style={styles.title}>
           <span style={styles.highlight}>Achievements</span>
        </motion.h1>
       </div>

      <div style={styles.maskContainer}>
        <div style={styles.bentoContainer}>
          {/* ROW 1: LEFT */}
          <div style={styles.marqueeRow}>
            <motion.div 
              style={styles.track}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
            >
              {doubledRow1.map((cert, i) => (
                <EnhancedBentoCard key={`r1-${i}`} cert={cert} onOpen={() => setSelectedCert(cert)} />
              ))}
            </motion.div>
          </div>

          {/* ROW 2: RIGHT */}
          <div style={styles.marqueeRow}>
            <motion.div 
              style={styles.track}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 65, ease: "linear" }}
            >
              {doubledRow2.map((cert, i) => (
                <EnhancedBentoCard key={`r2-${i}`} cert={cert} onOpen={() => setSelectedCert(cert)} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.overlay} onClick={() => setSelectedCert(null)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} style={styles.modalContent} onClick={e => e.stopPropagation()}>
               <div style={styles.modalHeader}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <ShieldCheck color={selectedCert.color} size={24}/>
                    <h2 style={{color: '#fff', margin: 0, fontSize: '1.2rem'}}>{selectedCert.title}</h2>
                  </div>
                  <button style={styles.closeBtn} onClick={() => setSelectedCert(null)}><X size={24}/></button>
               </div>
               <img src={selectedCert.image} style={styles.fullImage} alt="Certificate"/>
               <div style={styles.modalFooter}>
                  <a href={selectedCert.image} download style={styles.downloadBtn}>
                    <Download size={18} style={{marginRight: '8px'}}/> Download Verified PDF
                  </a>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EnhancedBentoCard = ({ cert, onOpen }) => {
  const cardWidth = cert.size === "large" ? "380px" : cert.size === "tall" ? "260px" : "310px";

  return (
    <div style={{ padding: '15px' }}>
      <motion.div
        whileHover={{ y: -8, boxShadow: `0 10px 30px rgba(0,0,0,0.3)` }}
        style={{
          ...styles.bentoCard,
          width: cardWidth,
          border: `1px solid rgba(255,255,255,0.08)`,
          // Subtle static shadow that doesn't "trail"
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{...styles.imageWrapper, border: `1.5px solid ${cert.color}44`}}>
          <img src={cert.image} style={styles.bentoImg} alt="" />
          <div style={{ ...styles.badge, background: cert.color }}>{cert.status}</div>
        </div>
        
        <div style={styles.cardContent}>
          <div style={{flex: 1}}>
            <h3 style={styles.bentoTitle}>{cert.title}</h3>
            <p style={styles.bentoIssuer}>{cert.issuer}</p>
          </div>
          
          <button 
            style={{...styles.viewBtn, border: `1px solid ${cert.color}66`, color: '#fff'}}
            onClick={onOpen}
          >
            <Maximize2 size={12} style={{marginRight: '6px'}}/> View
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: { padding: '80px 0', overflow: 'hidden', minHeight: '100vh', position: 'relative', background: 'transparent' },
  header: { textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 1 },
  title: { color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.4)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem' },
  
  maskContainer: {
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  },
  bentoContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
  marqueeRow: { display: 'flex', width: '100vw', overflow: 'hidden' },
  track: { display: 'flex', flexShrink: 0 },

  bentoCard: {
    height: '220px',
    borderRadius: '28px',
    background: 'rgba(255, 255, 255, 0.05)', 
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    padding: '18px',
    gap: '12px',
    transition: 'box-shadow 0.3s ease'
  },
  imageWrapper: { 
    width: '100%', 
    height: '110px', 
    borderRadius: '16px', 
    overflow: 'hidden', 
    position: 'relative', 
    background: 'rgba(0,0,0,0.2)',
    // The "Outline" you asked for
    boxSizing: 'border-box'
  },
  bentoImg: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 },
  badge: { position: 'absolute', top: '10px', right: '10px', padding: '5px 12px', borderRadius: '10px', color: '#000', fontSize: '0.6rem', fontWeight: '900' },
  
  cardContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexGrow: 1 },
  bentoTitle: { color: '#fff', fontSize: '1.05rem', margin: 0, fontWeight: '800' },
  bentoIssuer: { color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' },
  viewBtn: { display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' },
  modalContent: { background: 'rgba(30, 30, 30, 0.8)', padding: '24px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '90%', width: '750px', backdropFilter: 'blur(20px)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  fullImage: { width: '100%', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' },
  modalFooter: { marginTop: '20px', display: 'flex', justifyContent: 'center' },
  downloadBtn: { background: '#0ea5e9', color: '#fff', padding: '12px 30px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: '700' },
  closeBtn: { background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer' }
};

export default Certificates;