import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion, useScroll, useSpring } from 'framer-motion';
import { SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython, SiMongodb, SiGit, SiCplusplus, SiFramer } from 'react-icons/si';
import { FaJava, FaGithub, FaLinkedin, FaInstagram, FaCoffee } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { FiExternalLink, FiCompass, FiCpu, FiTarget } from "react-icons/fi"; 
import PageTransition from '../components/PageTransition';
import LogoLoop from '../components/LogoLoop';

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

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

  const timelineData = [
    {
      year: "2022",
      title: "SECONDARY EDUCATION",
      institution: "ST.joseph's Academy",
      detail: "Completed my board examinations, marking the start of my logical and analytical problem-solving journey.",
    },
    {
      year: "2024",
      title: "HIGHER SECONDARY EDUCATION ",
      institution: "Asian Christian Academy",
      detail: "Officially entered the world of professional development. Started mastering the core languages of the modern web.",
    },
    {
      year: "2024 - 2028",
      title: "COLLEGE",
      institution: "KSR College of Engineering",
      detail: "Currently a II-Year student, deep-diving into complex architectures and scaling my knowledge in full-stack engineering.",
      hasLink: true 
    }
  ];

  return (
    <div style={styles.container} ref={containerRef}>
      <style>{`
        @media (max-width: 768px) {
          .objective-responsive {
            grid-template-columns: 1fr !important;
            padding: 28px !important;
            gap: 30px !important;
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

        <section style={{ marginTop: '90px', marginBottom: '100px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={styles.storyIndex}>04 / ACADEMIC JOURNEY</h3>
            <h2 style={styles.sectionHeading}>Education Timeline</h2>
          </div>

          <div style={styles.tWrapper}>
            <div style={styles.vLineBase} />
            <motion.div style={{ ...styles.vLineActive, scaleY }} />

            {timelineData.map((milestone, index) => {
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

  sectionHeading: { fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: '900', color: '#fff', margin: '0 0 10px 0', fontFamily: "'Outfit', 'Inter', sans-serif'", letterSpacing: '-1px' },

  marqueeContainer: { overflow: 'hidden', padding: '28px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
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

  projectBtn: { marginTop: '22px', padding: '14px 28px', borderRadius: '50px', border: '1px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', fontFamily: 'monospace', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s' },

  statusBar: { position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 0 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'monospace', fontSize: '0.65rem', color: '#fff', marginTop: '60px' },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.6 },
  blink: { width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' },
  socialStrip: { display: 'flex', gap: '25px' },
  statusLink: { color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px', fontWeight: '600' },
};

export default About;