import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Maximize2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import BookRack from '../components/BookRack'; 

const About = () => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const isMobile = window.innerWidth < 768;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const techStack = ["React", "Node.js", "Framer Motion", "TailwindCSS", "JavaScript", "Python", "MongoDB", "Git"];

  const timelineData = [
    {
      year: "2022",
      title: "SECONDARY_EDUCATION // 10TH",
      institution: "Completed Board Examinations",
      detail: "Achieved foundational academic stability and developed an early interest in logical problem solving.",
      imgUrl: "/10th_marksheet.jpg" 
    },
    {
      year: "2024",
      title: "COLLEGE_ADMISSION // DEV_FOUNDATION",
      institution: "First Year Undergraduate",
      detail: "Official entry into higher education. Took my first step into project development and mastering languages.",
      imgUrl: "/12th_marksheet.jpg" 
    },
    {
      year: "2025",
      title: "SYSTEM_BUILDING // GROWTH",
      institution: "Self-Driven Learning",
      detail: "Currently scaling knowledge in modern web architectures and exploring creative design protocols.",
      imgUrl: null
    }
  ];

  return (
    <div style={styles.container} ref={containerRef}>
      <PageTransition direction="up">
        
        {/* SYSTEM STATUS LOG */}
        <div style={styles.systemLog}>
          <div style={styles.logDot} />
          <span style={styles.logText}>SYSTEM_STATUS: <span style={{color: '#0ea5e9'}}>DECODING_ACTIVE</span></span>
        </div>

        {/* HERO */}
        <header style={styles.header}>
          <p style={styles.mono}>// IDENTITY_PROTOCOL</p>
          <h1 style={styles.title}>DECODING <br/> <span style={styles.highlight}>FRANCIS</span></h1>
        </header>

        {/* 1. PILLARS SECTION */}
        <section style={styles.grid}>
          {['THE_ORIGIN', 'THE_LOGIC', 'THE_MISSION'].map((pillar, i) => (
            <motion.div key={pillar} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} style={styles.card}>
              <span style={styles.cardLabel}>{`0${i+1} // ${pillar}`}</span>
              <p style={styles.cardBody}>
                {i === 0 && "Navigating the digital frontier of 2026. My path started with an obsession for how code creates reality."}
                {i === 1 && "I view code as architecture. Every project is an opportunity to refine scalability and clean design."}
                {i === 2 && "Looking for the next challenge. Ready to merge complex logic with seamless human interfaces."}
              </p>
            </motion.div>
          ))}
        </section>

        {/* 2. TECH MARQUEE */}
        <section style={{ marginBottom: '120px' }}>
          <p style={styles.mono}>// CORE_STACK_CAPABILITIES</p>
          <div style={styles.marqueeContainer}>
            <motion.div style={styles.marqueeTrack} animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
              {[...techStack, ...techStack].map((tech, i) => (
                <div key={i} style={styles.techPill}>{tech}</div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. TIMELINE SECTION */}
        <section style={{ marginBottom: '150px' }}>
          <p style={styles.mono}>// ACADEMIC_CHRONOLOGY</p>
          <div style={styles.tWrapper}>
            <div style={styles.vLineBase} />
            <motion.div style={{ ...styles.vLineActive, scaleY }} />

            {timelineData.map((milestone, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={styles.tItem}>
                <div style={styles.tDot} />
                <span style={styles.tYear}>{milestone.year}</span>
                <h3 style={styles.tTitle}>{milestone.title}</h3>
                <p style={styles.tInstitution}>{milestone.institution}</p>
                <p style={styles.tDetail}>{milestone.detail}</p>

                {milestone.imgUrl && (
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(14, 165, 233, 0.15)' }} 
                    onClick={() => setSelectedImage(milestone.imgUrl)}
                    style={styles.pillBtn}
                  >
                    <motion.div style={styles.btnShine} animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3 }} />
                    <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       VIEW_CREDENTIALS <Maximize2 size={12} />
                    </span>
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. THE BOOK RACK */}
        <BookRack />

        {/* 5. SOCIAL CONNECT */}
        <section style={styles.socialGrid}>
          <p style={{...styles.mono, gridColumn: '1/-1', marginTop: '60px'}}>// CONNECT_WITH_THE_SYSTEM</p>
          <SocialLink icon={<Github size={18}/>} label="GITHUB" href="https://github.com/yourusername" />
          <SocialLink icon={<Linkedin size={18}/>} label="LINKEDIN" href="https://linkedin.com/in/yourusername" />
          <SocialLink icon={<Mail size={18}/>} label="EMAIL" href="mailto:your@email.com" />
        </section>

        {/* MODAL OVERLAY */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} style={styles.modalOverlay}>
               <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ position: 'relative' }}>
                  <motion.div animate={{ top: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} style={styles.scanline} />
                  <img src={selectedImage} style={styles.zoomedImg} alt="Marksheet" />
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </PageTransition>
    </div>
  );
};

// Sub-components
const SocialLink = ({ icon, label, href }) => (
  <motion.a 
    href={href} target="_blank" rel="noopener noreferrer"
    whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.1)', borderColor: '#0ea5e9' }} 
    style={styles.socialBtn}
  >
    {icon} <span>{label}</span>
  </motion.a>
);

const styles = {
  container: { padding: '140px 10% 100px', color: '#fff', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', background: 'transparent' },
  mono: { fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', color: '#0ea5e9' },
  title: { fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '950', lineHeight: '0.9', letterSpacing: '-3px' },
  highlight: { color: '#0ea5e9', textShadow: '0 0 20px rgba(14, 165, 233, 0.2)' },
  
  systemLog: { position: 'fixed', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 15px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 100 },
  logDot: { width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', boxShadow: '0 0 10px #0ea5e9' },
  logText: { fontFamily: 'monospace', fontSize: '0.65rem' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '120px' },
  card: { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '35px', borderRadius: '24px', backdropFilter: 'blur(12px)' },
  cardLabel: { color: '#0ea5e9', fontFamily: 'monospace', fontSize: '0.75rem', marginBottom: '15px', display: 'block' },
  cardBody: { opacity: 0.7, fontSize: '1rem', lineHeight: '1.7', margin: 0 },

  marqueeContainer: { overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  marqueeTrack: { display: 'flex', gap: '40px', whiteSpace: 'nowrap' },
  techPill: { fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.2)' },

  tWrapper: { position: 'relative', paddingLeft: '45px' },
  vLineBase: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)' },
  vLineActive: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: '#0ea5e9', originY: 0, boxShadow: '0 0 15px #0ea5e9' },
  tItem: { position: 'relative', marginBottom: '80px' },
  tDot: { position: 'absolute', left: '-51px', top: '10px', width: '12px', height: '12px', borderRadius: '50%', background: '#0ea5e9', boxShadow: '0 0 10px #0ea5e9', border: '3px solid #000' },
  tYear: { fontWeight: 'bold', fontFamily: 'monospace', color: '#0ea5e9', fontSize: '1.2rem' },
  tTitle: { fontSize: '1.8rem', margin: '10px 0', fontWeight: '800' },
  tInstitution: { opacity: 0.5, fontSize: '0.9rem', fontFamily: 'monospace', marginBottom: '10px' },
  tDetail: { opacity: 0.8, maxWidth: '650px', lineHeight: '1.6' },

  pillBtn: { marginTop: '20px', padding: '10px 20px', borderRadius: '10px', border: '1px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.05)', color: '#0ea5e9', fontFamily: 'monospace', fontSize: '0.7rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' },
  btnShine: { position: 'absolute', top: 0, left: 0, width: '40px', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', skewX: '-20deg' },

  socialGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' },
  socialBtn: { display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', borderRadius: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.75rem', transition: '0.3s' },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' },
  scanline: { position: 'absolute', left: 0, width: '100%', height: '2px', background: '#0ea5e9', boxShadow: '0 0 15px #0ea5e9', zIndex: 10 },
  zoomedImg: { maxWidth: '90vw', maxHeight: '80vh', borderRadius: '12px', border: '1px solid #333' }
};

export default About;