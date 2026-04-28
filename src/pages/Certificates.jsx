import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Download, ShieldCheck } from 'lucide-react';

// IMPORT YOUR IMAGES (Keep your existing imports here)
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
      <style>{`
        /* MOBILE OVERRIDES */
        @media (max-width: 768px) {
          .bento-card {
            width: 260px !important; /* Force smaller cards on mobile */
            height: 200px !important;
            padding: 12px !important;
          }
          .card-image-wrapper {
            height: 90px !important;
          }
          .bento-title {
            font-size: 0.9rem !important;
          }
          .modal-box {
            width: 95% !important;
            padding: 15px !important;
            border-radius: 20px !important;
          }
          .marquee-row {
            margin-bottom: 10px !important;
          }
        }
      `}</style>

      <div style={styles.header}>
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} style={styles.title}>
           <span style={styles.highlight}>Achievements</span>
        </motion.h1>
      </div>

      <div style={styles.maskContainer}>
        <div style={styles.bentoContainer}>
          {/* ROW 1: LEFT */}
          <div className="marquee-row" style={styles.marqueeRow}>
            <motion.div 
              style={styles.track}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {doubledRow1.map((cert, i) => (
                <EnhancedBentoCard key={`r1-${i}`} cert={cert} onOpen={() => setSelectedCert(cert)} />
              ))}
            </motion.div>
          </div>

          {/* ROW 2: RIGHT */}
          <div className="marquee-row" style={styles.marqueeRow}>
            <motion.div 
              style={styles.track}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
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
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="modal-box" style={styles.modalContent} onClick={e => e.stopPropagation()}>
               <div style={styles.modalHeader}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px', overflow:'hidden'}}>
                    <ShieldCheck color={selectedCert.color} size={20} style={{flexShrink:0}}/>
                    <h2 style={{color: '#fff', margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{selectedCert.title}</h2>
                  </div>
                  <button style={styles.closeBtn} onClick={() => setSelectedCert(null)}><X size={20}/></button>
               </div>
               <img src={selectedCert.image} style={styles.fullImage} alt="Certificate"/>
               <div style={styles.modalFooter}>
                  <a href={selectedCert.image} download style={styles.downloadBtn}>
                    <Download size={16} style={{marginRight: '8px'}}/> Download PDF
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
  // Use a class name so the CSS media query can override the width
  return (
    <div style={{ padding: '8px' }}>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="bento-card"
        style={{
          ...styles.bentoCard,
          width: cert.size === "large" ? "380px" : cert.size === "tall" ? "260px" : "310px",
          border: `1px solid rgba(255,255,255,0.08)`,
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
        }}
      >
        <div className="card-image-wrapper" style={{...styles.imageWrapper, border: `1.5px solid ${cert.color}44`}}>
          <img src={cert.image} style={styles.bentoImg} alt="" />
          <div style={{ ...styles.badge, background: cert.color }}>{cert.status}</div>
        </div>
        
        <div style={styles.cardContent}>
          <div style={{flex: 1, overflow:'hidden'}}>
            <h3 className="bento-title" style={styles.bentoTitle}>{cert.title}</h3>
            <p style={styles.bentoIssuer}>{cert.issuer}</p>
          </div>
          
          <button 
            style={{...styles.viewBtn, border: `1px solid ${cert.color}66`, color: '#fff'}}
            onClick={onOpen}
          >
            <Maximize2 size={10} style={{marginRight: '4px'}}/> View
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: { padding: '60px 0', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'transparent' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { color: '#fff', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', margin: 0 },
  highlight: { color: '#0ea5e9' },
  
  maskContainer: {
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
  },
  bentoContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  marqueeRow: { display: 'flex', width: '100%', overflow: 'hidden' },
  track: { display: 'flex', flexShrink: 0 },

  bentoCard: {
    height: '220px',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.05)', 
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '16px',
    gap: '10px',
  },
  imageWrapper: { 
    width: '100%', 
    height: '115px', 
    borderRadius: '14px', 
    overflow: 'hidden', 
    position: 'relative', 
    background: 'rgba(0,0,0,0.2)',
  },
  bentoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '8px', right: '8px', padding: '4px 10px', borderRadius: '8px', color: '#000', fontSize: '0.55rem', fontWeight: '900' },
  
  cardContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexGrow: 1, gap: '5px' },
  bentoTitle: { color: '#fff', fontSize: '1rem', margin: 0, fontWeight: '800', lineHeight: 1.2 },
  bentoIssuer: { color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' },
  viewBtn: { display: 'flex', alignItems: 'center', padding: '6px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', fontWeight: '700', fontSize: '0.7rem', cursor: 'pointer' },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)', padding: '20px' },
  modalContent: { background: '#1a1a1a', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px', width: '90%' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  fullImage: { width: '100%', borderRadius: '12px', display: 'block' },
  modalFooter: { marginTop: '15px', display: 'flex', justifyContent: 'center' },
  downloadBtn: { background: '#0ea5e9', color: '#fff', padding: '10px 20px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: '700', fontSize: '0.9rem' },
  closeBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }
};

export default Certificates;