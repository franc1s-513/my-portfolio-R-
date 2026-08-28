import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Download, ShieldCheck } from 'lucide-react';
import GlareHover from '../components/GlareHover';
import './Certificates.css';

// IMPORT YOUR IMAGES (Keep your existing imports here)
import IotCert from '../assets/certificates/iot.png';
import GdgCert from '../assets/certificates/gdg.png';
import LlmCert from '../assets/certificates/nxt.png';
import CloudCert from '../assets/certificates/cloud.png';
import PsgCert from '../assets/certificates/psg.png';

const Certificates = () => {
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
    <div className="certificates-page">
      <div className="certificates-header">
        <motion.h1 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}} 
          className="certificates-title"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#0A192F',
            WebkitTextStroke: '2px #D4AF37',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
           <span className="certificates-highlight">Achievements</span>
        </motion.h1>
      </div>

      <div className="certificates-mask">
        <div className="certificates-bento-container">
          {/* ROW 1: LEFT */}
          <div className="marquee-row">
            <motion.div 
              className="cert-track"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {doubledRow1.map((cert, i) => (
                <EnhancedBentoCard key={`r1-${i}`} cert={cert} onOpen={() => setSelectedCert(cert)} />
              ))}
            </motion.div>
          </div>

          {/* ROW 2: RIGHT */}
          <div className="marquee-row">
            <motion.div 
              className="cert-track"
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
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="cert-overlay" 
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              className="cert-modal" 
              onClick={e => e.stopPropagation()}
            >
               <div className="cert-modal-header">
                  <div style={{display:'flex', alignItems:'center', gap:'12px', overflow:'hidden'}}>
                    <ShieldCheck color={selectedCert.color} size={20} style={{flexShrink:0}}/>
                    <h2 className="cert-modal-title">{selectedCert.title}</h2>
                  </div>
                  <GlareHover borderRadius="50%">
                    <button className="cert-close-btn" onClick={() => setSelectedCert(null)}><X size={20}/></button>
                  </GlareHover>
               </div>
               <img src={selectedCert.image} className="cert-modal-image" alt="Certificate"/>
               <div className="cert-modal-footer">
                  <a href={selectedCert.image} download className="cert-download-btn">
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
  return (
    <div className="cert-card-wrapper">
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="cert-card"
        style={{
          width: cert.size === "large" ? "380px" : cert.size === "tall" ? "260px" : "310px",
        }}
      >
        <div className="cert-card-image-wrapper" style={{border: `1.5px solid ${cert.color}44`}}>
          <img src={cert.image} className="cert-card-image" alt="" />
          <div className="cert-card-badge" style={{ background: cert.color }}>{cert.status}</div>
        </div>
        
        <div className="cert-card-content">
          <div style={{flex: 1, overflow:'hidden'}}>
            <h3 className="cert-card-title">{cert.title}</h3>
            <p className="cert-card-issuer">{cert.issuer}</p>
          </div>
          
          <button 
            className="cert-view-btn"
            style={{border: `1px solid ${cert.color}66`}}
            onClick={onOpen}
          >
            <Maximize2 size={10} style={{marginRight: '4px'}}/> View
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Certificates;