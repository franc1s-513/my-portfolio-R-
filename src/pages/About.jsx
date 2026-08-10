import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import GlareHover from '../components/GlareHover';
import { SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython, SiMongodb, SiGit, SiCplusplus, SiFramer } from 'react-icons/si';
import { FaJava, FaGithub, FaLinkedin, FaInstagram, FaCoffee } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { FiMaximize2, FiExternalLink, FiCompass, FiCpu, FiTarget, FiCheckCircle } from "react-icons/fi"; 
import { ShieldCheck, Download, X, Eye } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import LogoLoop from '../components/LogoLoop';

// Import All Given Certificates
import IotCert from '../assets/certificates/iot.png';
import GdgCert from '../assets/certificates/gdg.png';
import LlmCert from '../assets/certificates/nxt.png';
import CloudCert from '../assets/certificates/cloud.png';
import PsgCert from '../assets/certificates/psg.png';

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const techStack = ["React", "Node.js", "Framer Motion", "TailwindCSS", "JavaScript", "Python", "MongoDB", "Git", "Java", "C++"];
  const iconStack = [SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython, SiMongodb, SiGit, FaJava, SiCplusplus, SiFramer];

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/franc1s-513", label: "GITHUB" },
    { Icon: FaLinkedin, url: "https://linkedin.com/in/francis-fernando-v-bb81a432a", label: "LINKEDIN" },
    { Icon: FaInstagram, url: "https://instagram.com/franc1s._txt", label: "INSTA" },
    { Icon: IoMail, url: "mailto:francisfernandov07@gmail.com", label: "EMAIL" }
  ];

  const allCredentials = [
    { id: 1, title: "IoT Specialist", category: "Certifications", issuer: "NPTEL (IIT-K)", status: "Elite", image: IotCert, color: "#fbbf24", date: "2024", description: "Advanced specialization in Internet of Things architecture and edge computing." },
    { id: 2, title: "GDG Global", category: "Certifications", issuer: "Google", status: "Participant", image: GdgCert, color: "#0ea5e9", date: "2024", description: "Global participation in modern web technologies and cloud ecosystem workshops." },
    { id: 3, title: "GenAI Expert", category: "Certifications", issuer: "VIT SCOPE", status: "Workshop", image: LlmCert, color: "#a855f7", date: "2024", description: "Hands-on implementation of Large Language Models and prompt engineering." },
    { id: 4, title: "Cloud Architect", category: "Certifications", issuer: "NPTEL", status: "Certified", image: CloudCert, color: "#10b981", date: "2024", description: "Comprehensive study of cloud computing infrastructure and distributed systems." },
    { id: 5, title: "Research Lead", category: "Certifications", issuer: "PSG Tech", status: "Award", image: PsgCert, color: "#f43f5e", date: "2024", description: "Leadership and research presentation in cutting-edge technological innovations." },
    { id: 6, title: "12th Higher Secondary", category: "Academic", issuer: "Asian Christian Academy", status: "Completed", image: "/12th_marksheet.jpg", color: "#38bdf8", date: "2024", description: "Official academic record demonstrating analytical excellence and core sciences." },
    { id: 7, title: "10th Secondary Board", category: "Academic", issuer: "St. Joseph's Academy", status: "Completed", image: "/10th_marksheet.jpg", color: "#38bdf8", date: "2022", description: "Foundational secondary education qualification with distinction." }
  ];

  const filteredCredentials = activeFilter === 'All' 
    ? allCredentials 
    : allCredentials.filter(cert => cert.category === activeFilter);

  const timelineData = [
    {
      year: "2022",
      title: "SECONDARY EDUCATION",
      institution: "ST.joseph's Academy",
      detail: "Completed my board examinations, marking the start of my logical and analytical problem-solving journey.",
      certId: 7 
    },
    {
      year: "2024",
      title: "HIGHER SECONDARY EDUCATION ",
      institution: "Asian Christian Academy",
      detail: "Officially entered the world of professional development. Started mastering the core languages of the modern web.",
      certId: 6 
    },
    {
      year: "2024 - 2028",
      title: "COLLEGE",
      institution: "KSR College of Engineering",
      detail: "Currently a II-Year student, deep-diving into complex architectures and scaling my knowledge in full-stack engineering.",
      certId: null,
      hasLink: true 
    }
  ];

  return (
    <div style={styles.container} ref={containerRef}>
      <style>{`
        @media (max-width: 768px) {
          .cert-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .objective-responsive {
            grid-template-columns: 1fr !important;
            padding: 28px !important;
            gap: 30px !important;
          }
          .filter-group-responsive {
            flex-wrap: wrap !important;
            margin-top: 15px !important;
          }
          .cert-header-responsive {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .story-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <PageTransition direction="up">
        <header style={styles.header}>
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={styles.title}
          >
            DECODING <br/> <span style={styles.highlight}>FRANCIS</span>
          </motion.h1>
        </header>

        {/* PREMIUM BENTO-STYLE BIO CARDS */}
        <section style={styles.storySection}>
          <div className="story-grid-responsive" style={styles.storyGrid}>
            {/* CARD 1: ORIGIN */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, borderColor: '#0ea5e9', boxShadow: '0 20px 40px rgba(14, 165, 233, 0.18)' }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={styles.storyCard}
            >
              <div style={styles.cardHeader}>
                <span style={styles.cardBadge}>01 / ORIGIN</span>
                <div style={styles.cardIconWrapper}>
                  <FiCompass size={22} style={{ color: '#0ea5e9' }} />
                </div>
              </div>
              <h3 style={styles.cardSubtitle}>The Beginning in Hosur</h3>
              <p style={styles.storyBody}>
                Entered the world in March 2006 in the city of <b style={styles.highlightText}>Hosur</b>. Since then, I've always been hands-on—exploring different fields, overcoming setbacks, and making strong comebacks with everything I set my mind to.
              </p>
              <div style={styles.cardFooter}>
                <span style={styles.cardMeta}>📍 Hosur, India • Est. 2006</span>
              </div>
            </motion.div>

            {/* CARD 2: HOOK */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, borderColor: '#0ea5e9', boxShadow: '0 20px 40px rgba(14, 165, 233, 0.18)' }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              style={styles.storyCard}
            >
              <div style={styles.cardHeader}>
                <span style={styles.cardBadge}>02 / HOOK</span>
                <div style={styles.cardIconWrapper}>
                  <FiCpu size={22} style={{ color: '#0ea5e9' }} />
                </div>
              </div>
              <h3 style={styles.cardSubtitle}>Gaming to Architecture</h3>
              <p style={styles.storyBody}>
                By the end of my schooling, my focus shifted toward computers. It started with intense gaming sessions, which quickly evolved into a fascination with <b style={styles.highlightText}>web architecture</b> and a drive to build digital ecosystems of my own.
              </p>
              <div style={styles.cardFooter}>
                <span style={styles.cardMeta}>💻 Full-Stack Ecosystems</span>
              </div>
            </motion.div>

            {/* CARD 3: MISSION */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, borderColor: '#0ea5e9', boxShadow: '0 20px 40px rgba(14, 165, 233, 0.18)' }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              style={styles.storyCard}
            >
              <div style={styles.cardHeader}>
                <span style={styles.cardBadge}>03 / MISSION</span>
                <div style={styles.cardIconWrapper}>
                  <FiTarget size={22} style={{ color: '#0ea5e9' }} />
                </div>
              </div>
              <h3 style={styles.cardSubtitle}>Impactful Engineering</h3>
              <p style={styles.storyBody}>
                Chasing innovation and competing in this fast-moving tech landscape. My objective is to solve <b style={styles.highlightText}>complex engineering challenges</b> and deliver them through impactful interfaces where people remember me by the lines of code I craft.
              </p>
              <div style={styles.cardFooter}>
                <span style={styles.cardMeta}>🚀 Innovation Driven</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section style={{ marginBottom: '80px' }}>
          <div style={styles.marqueeContainer}>
            <LogoLoop
              logos={techStack.map(tech => ({ node: <div style={styles.techPill}>{tech}</div> }))}
              speed={60}
              direction="left"
              logoHeight={50}
              gap={60}
              hoverSpeed={15}
            />
          </div>
        </section>

        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="objective-responsive"
          style={styles.objectiveSection}
        >
          <div style={styles.objectiveContent}>
            <h3 style={styles.storyIndex}>OBJECTIVE</h3>
            <p style={styles.storyBody}>
              To leverage my background in full-stack software development and AI engineering to solve real-world problems. I strive to create intuitive, performant, and scalable digital solutions.
            </p>
          </div>
          <div style={styles.photoContainer}>
            <div style={styles.photoShape}>
              <img src="/your-photo.jpg" alt="Francis Fernando" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
            </div>
          </div>
        </motion.section>

        {/* INTERACTIVE CREDENTIALS & CERTIFICATIONS SHOWCASE */}
        <section style={styles.certSection}>
          <div className="cert-header-responsive" style={styles.certSectionHeader}>
            <div>
              <h3 style={styles.storyIndex}>04 / CREDENTIALS & ACHIEVEMENTS</h3>
              <h2 style={styles.sectionHeading}>Verified Certifications</h2>
              <p style={styles.sectionSubtext}>
                A curated showcase of industry certifications, research awards, and official qualifications. Click any credential card to inspect full high-resolution verification.
              </p>
            </div>

            <div className="filter-group-responsive" style={styles.filterGroup}>
              {['All', 'Certifications', 'Academic'].map((filter) => (
                <GlareHover key={filter} borderRadius="50px">
                  <button
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      ...styles.filterBtn,
                      background: activeFilter === filter ? '#0ea5e9' : 'rgba(255, 255, 255, 0.04)',
                      color: activeFilter === filter ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                      borderColor: activeFilter === filter ? '#0ea5e9' : 'rgba(255, 255, 255, 0.12)',
                      boxShadow: activeFilter === filter ? '0 0 16px rgba(14, 165, 233, 0.4)' : 'none',
                    }}
                  >
                    {filter} ({filter === 'All' ? allCredentials.length : allCredentials.filter(c => c.category === filter).length})
                  </button>
                </GlareHover>
              ))}
            </div>
          </div>

          <motion.div layout className="cert-grid-responsive" style={styles.certGrid}>
            <AnimatePresence>
              {filteredCredentials.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -6, borderColor: cert.color, boxShadow: `0 15px 35px ${cert.color}25` }}
                  onClick={() => setSelectedCert(cert)}
                  style={{
                    ...styles.certCard,
                    border: `1px solid rgba(255, 255, 255, 0.08)`,
                  }}
                >
                  <div style={{ ...styles.certImageWrapper, borderBottom: `1.5px solid ${cert.color}33` }}>
                    <img src={cert.image} alt={cert.title} style={styles.certImg} />
                    <div style={{ ...styles.certBadge, background: cert.color }}>
                      {cert.status}
                    </div>
                  </div>

                  <div style={styles.certCardBody}>
                    <div style={styles.certMetaRow}>
                      <span style={{ ...styles.certIssuer, color: cert.color }}>
                        <ShieldCheck size={14} style={{ marginRight: '6px', flexShrink: 0 }} />
                        {cert.issuer}
                      </span>
                      <span style={styles.certDate}>{cert.date}</span>
                    </div>

                    <h4 style={styles.certTitle}>{cert.title}</h4>
                    <p style={styles.certDesc}>{cert.description}</p>

                    <div style={styles.certCardFooter}>
                      <span style={{ ...styles.viewLink, color: cert.color }}>
                        <Eye size={14} style={{ marginRight: '6px' }} /> Inspect Document
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section style={{ marginTop: '90px', marginBottom: '100px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={styles.storyIndex}>05 / ACADEMIC JOURNEY</h3>
            <h2 style={styles.sectionHeading}>Education Timeline</h2>
          </div>

          <div style={styles.tWrapper}>
            <div style={styles.vLineBase} />
            <motion.div style={{ ...styles.vLineActive, scaleY }} />

            {timelineData.map((milestone, index) => {
              const matchedCert = milestone.certId ? allCredentials.find(c => c.id === milestone.certId) : null;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }} 
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={styles.tItem}
                >
                  <div style={styles.tDot} />
                  
                  {milestone.year === "2024" ? (
                      <div style={styles.flexLayout}>
                          <div style={{ flex: 1 }}>
                              <span style={styles.tYear}>{milestone.year}</span>
                              <h3 style={styles.tTitle}>{milestone.title}</h3>
                              <p style={styles.tInstitution}>{milestone.institution}</p>
                              <p style={styles.tDetail}>{milestone.detail}</p>
                          </div>
                          
                          <div style={styles.fuelInline}>
                              <FaCoffee style={styles.fuelIcon} size={85}/>
                              <div>
                                  <h4 style={styles.fuelQuote}>"Have a sip, have a look."</h4>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <>
                          <span style={styles.tYear}>{milestone.year}</span>
                          <h3 style={styles.tTitle}>{milestone.title}</h3>
                          <p style={styles.tInstitution}>{milestone.institution}</p>
                          <p style={styles.tDetail}>{milestone.detail}</p>
                      </>
                  )}

                  {matchedCert && (
                    <motion.button 
                      onClick={() => setSelectedCert(matchedCert)} 
                      whileHover={{ scale: 1.04, background: 'rgba(14, 165, 233, 0.15)' }}
                      style={styles.pillBtn}
                    >
                      VIEW_CREDENTIALS <FiMaximize2 size={12} />
                    </motion.button>
                  )}

                  {milestone.hasLink && (
                    <motion.button 
                      id="about-projects-btn"
                      onClick={() => navigate('/projects')}
                      whileHover={{ scale: 1.05, backgroundColor: '#0ea5e9', color: '#fff' }}
                      style={styles.projectBtn}
                    >
                      VIEW_MY_PROJECTS <FiExternalLink size={14} />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <div style={styles.marqueeContainer}>
            <LogoLoop
              logos={iconStack.map((Icon) => ({ node: <div style={styles.iconPill}><Icon size={40} /></div> }))}
              speed={60}
              direction="right"
              logoHeight={50}
              gap={60}
              hoverSpeed={15}
            />
          </div>
        </section>

        {!isMobile && (
          <div style={styles.statusBar}>
            <div style={styles.statusLeft}>
              <div style={styles.blink} /> 
              <span style={{opacity: 0.3}}>|</span>
            </div>

            <div style={styles.socialStrip}>
              {socialLinks.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" style={styles.statusLink}>
                  <item.Icon size={16} style={{ color: '#fff' }} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {selectedCert && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedCert(null)} 
              style={styles.modalOverlay}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={styles.modalBox} 
                onClick={e => e.stopPropagation()}
              >
                <div style={styles.modalHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <ShieldCheck color={selectedCert.color} size={26} style={{ flexShrink: 0 }} />
                    <div>
                      <h2 style={{ color: '#fff', margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>
                        {selectedCert.title}
                      </h2>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                        Issued by: {selectedCert.issuer} • {selectedCert.date}
                      </span>
                    </div>
                  </div>
                  <GlareHover borderRadius="50%">
                    <button style={styles.closeBtn} onClick={() => setSelectedCert(null)}>
                      <X size={20} />
                    </button>
                  </GlareHover>
                </div>

                <div style={styles.modalImageContainer}>
                  <img src={selectedCert.image} style={styles.modalImg} alt={selectedCert.title} />
                </div>

                <div style={styles.modalFooter}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '0.85rem', fontWeight: '600' }}>
                    <FiCheckCircle size={16} /> Verified Authentic Credential
                  </div>
                  <a href={selectedCert.image} download style={styles.downloadBtn}>
                    <Download size={16} style={{ marginRight: '8px' }} /> Download File
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </div>
  );
};

const styles = {
  container: { padding: '140px 8% 80px', color: '#fff', minHeight: '100vh', maxWidth: '1240px', margin: '0 auto', position: 'relative' },
  header: { marginBottom: '60px' },
  title: { fontSize: 'clamp(3rem, 8vw, 5.8rem)', fontWeight: '950', lineHeight: '0.95', letterSpacing: '-2px', fontFamily: "'Outfit', 'Inter', sans-serif" },
  highlight: { color: '#0ea5e9' },
  
  flexLayout: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px', flexWrap: 'wrap' },
  fuelInline: { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', maxWidth: '300px' },
  fuelIcon: { color: '#fff' },
  fuelQuote: { margin: 0, fontSize: '0.8rem', opacity: 0.7, fontFamily: 'monospace', color: '#fff' },

  storySection: { marginBottom: '80px' },
  storyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '26px' },
  storyCard: { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.09)', borderRadius: '24px', padding: '36px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backdropFilter: 'blur(16px)', boxShadow: '0 10px 30px rgba(0,0,0,0.25)', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' },
  cardBadge: { fontSize: '0.78rem', fontWeight: '900', background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9', padding: '6px 14px', borderRadius: '50px', letterSpacing: '1.5px', fontFamily: "'Outfit', 'Inter', sans-serif'" },
  cardIconWrapper: { width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardSubtitle: { fontSize: '1.35rem', fontWeight: '850', color: '#fff', margin: '0 0 16px 0', fontFamily: "'Outfit', 'Inter', sans-serif'", letterSpacing: '-0.5px' },
  storyIndex: { fontSize: '0.85rem', fontWeight: '900', color: '#0ea5e9', letterSpacing: '2px', marginBottom: '12px', fontFamily: "'Outfit', 'Inter', sans-serif'", textTransform: 'uppercase' },
  storyBody: { fontSize: '1.05rem', lineHeight: '1.75', color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 24px 0', fontWeight: '400', flex: 1 },
  highlightText: { color: '#0ea5e9', fontWeight: '700' },
  cardFooter: { borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px', display: 'flex', alignItems: 'center' },
  cardMeta: { fontSize: '0.8rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.55)', fontWeight: '600' },

  objectiveSection: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: '50px', alignItems: 'center', background: 'rgba(255, 255, 255, 0.025)', padding: '50px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.07)', marginBottom: '90px' },
  objectiveContent: {},
  photoContainer: { display: 'flex', justifyContent: 'center' },
  photoShape: { width: '240px', height: '240px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.12)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.35)' },

  certSection: { marginBottom: '90px' },
  certSectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '36px' },
  sectionHeading: { fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: '900', color: '#fff', margin: '0 0 10px 0', fontFamily: "'Outfit', 'Inter', sans-serif'", letterSpacing: '-1px' },
  sectionSubtext: { fontSize: '0.96rem', color: 'rgba(255, 255, 255, 0.65)', maxWidth: '580px', margin: 0, lineHeight: '1.6' },
  
  filterGroup: { display: 'flex', gap: '10px' },
  filterBtn: { padding: '8px 18px', borderRadius: '50px', border: '1px solid', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'monospace' },
  
  certGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  certCard: { borderRadius: '22px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  certImageWrapper: { width: '100%', height: '175px', position: 'relative', overflow: 'hidden', background: 'rgba(0,0,0,0.3)' },
  certImg: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
  certBadge: { position: 'absolute', top: '12px', right: '12px', padding: '5px 12px', borderRadius: '50px', color: '#000', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' },
  
  certCardBody: { padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' },
  certMetaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  certIssuer: { fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', fontFamily: "'Outfit', 'Inter', sans-serif'" },
  certDate: { fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'monospace', fontWeight: '600' },
  certTitle: { fontSize: '1.3rem', fontWeight: '850', color: '#fff', margin: '0 0 10px 0', fontFamily: "'Outfit', 'Inter', sans-serif'", lineHeight: '1.25' },
  certDesc: { fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: '1.6', margin: '0 0 20px 0', flexGrow: 1 },
  certCardFooter: { borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '15px', display: 'flex', alignItems: 'center' },
  viewLink: { fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', fontFamily: 'monospace' },

  marqueeContainer: { overflow: 'hidden', padding: '28px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  marqueeTrack: { display: 'flex', gap: '60px' },
  techPill: { fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)' }, 
  iconPill: { color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  tWrapper: { position: 'relative', paddingLeft: '45px' },
  vLineBase: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.06)' },
  vLineActive: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: '#0ea5e9' },
  tItem: { position: 'relative', marginBottom: '70px' },
  tDot: { position: 'absolute', left: '-51px', top: '10px', width: '12px', height: '12px', borderRadius: '50%', background: '#0ea5e9', boxShadow: '0 0 12px #0ea5e9' },
  tYear: { fontWeight: 'bold', fontFamily: 'monospace', color: '#0ea5e9', fontSize: '1.2rem' },
  tTitle: { fontSize: '2.1rem', margin: '10px 0', fontWeight: '900', fontFamily: "'Outfit', 'Inter', sans-serif'" },
  tInstitution: { opacity: 0.6, fontSize: '0.95rem', marginBottom: '14px', fontWeight: '600' },
  tDetail: { opacity: 0.8, maxWidth: '650px', lineHeight: '1.65', fontSize: '1.02rem' },

  pillBtn: { marginTop: '18px', padding: '10px 22px', borderRadius: '50px', border: '1px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.06)', color: '#0ea5e9', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' },
  projectBtn: { marginTop: '22px', padding: '14px 28px', borderRadius: '50px', border: '1px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', fontFamily: 'monospace', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s' },

  statusBar: { position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 0 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'monospace', fontSize: '0.65rem', color: '#fff', marginTop: '60px' },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.6 },
  blink: { width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' },
  socialStrip: { display: 'flex', gap: '25px' },
  statusLink: { color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px', fontWeight: '600' },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', padding: '20px' },
  modalBox: { background: '#111827', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.12)', maxWidth: '850px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' },
  closeBtn: { background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', transition: 'background 0.2s' },
  modalImageContainer: { overflow: 'auto', borderRadius: '16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '62vh' },
  modalImg: { maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', display: 'block', borderRadius: '12px' },
  modalFooter: { marginTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' },
  downloadBtn: { background: '#0ea5e9', color: '#fff', padding: '10px 22px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: '700', fontSize: '0.88rem', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)' },
};
export default About;