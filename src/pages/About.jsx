import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const About = ({ isDark }) => {
  const isMobile = window.innerWidth < 768;

  // Your specific timeline details
  const timelineData = [
    {
      year: "2022",
      title: "SECONDARY_EDUCATION // 10TH",
      institution: "Completed Board Examinations",
      detail: "Achieved foundational academic stability and developed an early interest in logical problem solving.",
    },
    {
      year: "2024",
      title: "COLLEGE_ADMISSION // DEV_FOUNDATION",
      institution: "First Year Undergraduate",
      detail: "Official entry into higher education. Took my first step into project development and began mastering a programming language in depth.",
    },
    {
      year: "2024 - PRESENT",
      title: "SYSTEM_BUILDING // GROWTH",
      institution: "Self-Driven Learning",
      detail: "Currently scaling my knowledge in modern web architectures and exploring creative design protocols.",
    }
  ];

  // Personal specs data
  const personalDetails = [
    { label: "IDENTITY", value: "Francis" },
    { label: "LOCATION", value: "India [UTC+5:30]" },
    { label: "STACK", value: "React, Node.js, Framer Motion" },
    { label: "VIBE", value: "Minimalist / Technical" }
  ];

  const styles = {
    container: { 
      padding: isMobile ? '100px 5% 60px' : '140px 10% 100px', 
      color: '#fff', 
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: { marginBottom: '80px' },
    title: { 
      fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', 
      fontWeight: '900', 
      lineHeight: '1', 
      letterSpacing: '-2px',
      margin: 0
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', 
      gap: '20px', 
      marginBottom: '100px' 
    },
    card: { 
      background: 'rgba(255, 255, 255, 0.03)', 
      border: '1px solid rgba(255, 255, 255, 0.1)', 
      padding: '35px', 
      borderRadius: '24px', 
      backdropFilter: 'blur(12px)' 
    },
    cardLabel: { 
      color: '#0ea5e9', 
      fontFamily: 'monospace', 
      fontSize: '0.8rem', 
      letterSpacing: '2px',
      marginBottom: '15px',
      display: 'block'
    },
    tWrapper: { 
      position: 'relative', 
      paddingLeft: '40px', 
      marginTop: '50px' 
    },
    vLine: { 
      position: 'absolute', 
      left: '0', 
      top: '10px', 
      bottom: '0', 
      width: '2px', 
      background: 'linear-gradient(to bottom, #0ea5e9 0%, rgba(14, 165, 233, 0) 100%)', 
      opacity: 0.4 
    },
    tItem: { position: 'relative', marginBottom: '70px' },
    tDot: { 
      position: 'absolute', 
      left: '-44px', 
      top: '8px', 
      width: '10px', 
      height: '10px', 
      borderRadius: '50%', 
      background: '#0ea5e9', 
      boxShadow: '0 0 15px #0ea5e9' 
    },
    tYear: { 
      fontFamily: 'monospace', 
      color: '#0ea5e9', 
      fontWeight: 'bold', 
      fontSize: '1.3rem' 
    },
    sectionLabel: { 
      fontFamily: 'monospace', 
      color: '#0ea5e9', 
      fontSize: '0.8rem', 
      letterSpacing: '4px', 
      marginBottom: '30px', 
      display: 'block',
      opacity: 0.8
    },
    detailGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '20px',
      marginTop: '40px'
    }
  };

  return (
    <div style={styles.container}>
      <PageTransition direction="up">
        
        {/* HERO SECTION */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            DECODING <br/> 
            <span style={{ color: '#0ea5e9' }}>FRANCIS.</span>
          </h1>
        </header>

        {/* PILLAR CARDS */}
        <section style={styles.grid}>
          {['THE_ORIGIN', 'THE_LOGIC', 'THE_MISSION'].map((pillar, i) => (
            <motion.div 
              key={pillar}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              style={styles.card}
            >
              <span style={styles.cardLabel}>{`0${i+1} // ${pillar}`}</span>
              <p style={{ opacity: 0.7, fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
                {i === 0 && "Navigating the digital frontier of 2026. My path started with an obsession for how code creates reality."}
                {i === 1 && "I view code as architecture. Every project is an opportunity to refine scalability and clean design."}
                {i === 2 && "Looking for the next challenge. Ready to merge complex logic with seamless human interfaces."}
              </p>
            </motion.div>
          ))}
        </section>

        {/* TIMELINE SECTION */}
        <section style={{ marginBottom: '120px' }}>
          <span style={styles.sectionLabel}>// ACADEMIC_CHRONOLOGY</span>
          <div style={styles.tWrapper}>
            <div style={styles.vLine} />
            {timelineData.map((milestone, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={styles.tItem}
              >
                <div style={styles.tDot} />
                <span style={styles.tYear}>{milestone.year}</span>
                <h3 style={{ fontSize: '1.6rem', margin: '10px 0 5px', fontWeight: '800' }}>{milestone.title}</h3>
                <p style={{ opacity: 0.5, fontSize: '0.9rem', fontFamily: 'monospace' }}>{milestone.institution}</p>
                <p style={{ opacity: 0.8, fontSize: '1.05rem', marginTop: '15px', maxWidth: '650px', lineHeight: '1.6' }}>
                  {milestone.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PERSONAL SPECS SECTION */}
        <section style={{ marginBottom: '100px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
          <span style={styles.sectionLabel}>// SYSTEM_SPECIFICATIONS</span>
          <div style={styles.detailGrid}>
            {personalDetails.map((detail, idx) => (
              <div key={idx} style={{ padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#0ea5e9', marginBottom: '5px' }}>{detail.label}</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{detail.value}</p>
              </div>
            ))}
          </div>
        </section>

      </PageTransition>
    </div>
  );
};

export default About;
