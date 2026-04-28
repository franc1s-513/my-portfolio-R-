import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython, SiMongodb, SiGit, SiCplusplus, SiFramer } from 'react-icons/si';
import { FaJava, FaGithub, FaLinkedin, FaInstagram, FaCoffee } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { FiMaximize2, FiExternalLink } from "react-icons/fi"; 
import PageTransition from '../components/PageTransition';

const About = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
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
      imgUrl: "/10th_marksheet.jpg" 
    },
    {
      year: "2024",
      title: "HIGHER SECONDARY EDUCATION ",
      institution: "Asian Christian Academy",
      detail: "Officially entered the world of professional development. Started mastering the core languages of the modern web.",
      imgUrl: "/12th_marksheet.jpg" 
    },
    {
      year: "2024 - 2028",
      title: "COLLEGE",
      institution: "KSR College of Engineering",
      detail: "Currently a II-Year student, deep-diving into complex architectures and scaling my knowledge in full-stack engineering.",
      imgUrl: null,
      hasLink: true 
    }
  ];

  return (
    <div style={styles.container} ref={containerRef}>
      <PageTransition direction="up">
        <div style={styles.systemLog}>
          
        </div>

        <header style={styles.header}>
          <h1 style={styles.title}>DECODING <br/> <span style={styles.highlight}>FRANCIS</span></h1>
        </header>

        <section style={styles.grid}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={styles.card}>
            <span style={styles.cardLabel}>THE_ORIGIN</span>
            <p style={styles.cardBody}>
              Entered the world in March 2006, in the city of <b>Hosur</b>. Since then, I've always been hands-on—exploring in diffrent field had lot's of set back ,and comback with everything I set my mind to.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={styles.card}>
            <span style={styles.cardLabel}>THE_HOOK</span>
            <p style={styles.cardBody}>
              By the end of my schooling, my focus shifted toward computers. It started with gaming day and night, which evolved into a fascination with web visuals and a drive to build a digital space of my own.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={styles.card}>
            <span style={styles.cardLabel}>THE_MISSION</span>
            <p style={styles.cardBody}>
              Chasing and competing in this fast-moving world. My intent is to solve complex problems and deliver them through interfaces where people remember me by the lines of code I create.
            </p>
          </motion.div>
        </section>

        <section style={{ marginBottom: '120px' }}>
          <div style={styles.marqueeContainer}>
            <motion.div style={styles.marqueeTrack} animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
              {[...techStack, ...techStack].map((tech, i) => (
                <div key={i} style={styles.techPill}>{tech}</div>
              ))}
            </motion.div>
          </div>
        </section>

        <section style={styles.objectiveSection}>
            <div style={styles.objectiveContent}>
                <h3 style={styles.cardLabel}>OBJECTIVE</h3>
                <p style={styles.cardBody}>
                    To leverage my background in full-stack software development and AI engineering to solve real-world problems. I strive to create intuitive, performant, and scalable digital solutions.
                </p>
            </div>
            <div style={styles.photoContainer}>
                <div style={styles.photoShape}>[PHOTO]</div>
            </div>
        </section>

        <section style={{ marginTop: '150px', marginBottom: '120px' }}>
          <div style={styles.tWrapper}>
            <div style={styles.vLineBase} />
            <motion.div style={{ ...styles.vLineActive, scaleY }} />

            {timelineData.map((milestone, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={styles.tItem}>
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

                {milestone.imgUrl && (
                  <motion.button onClick={() => setSelectedImage(milestone.imgUrl)} style={styles.pillBtn}>
                    VIEW_CREDENTIALS <FiMaximize2 size={12} />
                  </motion.button>
                )}

                {milestone.hasLink && (
                  <motion.button 
                    onClick={() => navigate('/projects')}
                    whileHover={{ scale: 1.05, backgroundColor: '#0ea5e9', color: '#fff' }}
                    style={styles.projectBtn}
                  >
                    VIEW_MY_PROJECTS <FiExternalLink size={14} />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '50px' }}>
            <div style={styles.marqueeContainer}>
                <motion.div style={styles.marqueeTrack} animate={{ x: [0, -800] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                    {[...iconStack, ...iconStack].map((Icon, i) => (
                        <div key={i} style={styles.iconPill}><Icon size={40} /></div>
                    ))}
                </motion.div>
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
          {selectedImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} style={styles.modalOverlay}>
               <motion.div style={{ position: 'relative' }}>
                  <img src={selectedImage} style={styles.zoomedImg} alt="Doc" />
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </div>
  );
};

const styles = {
  container: { padding: '140px 10% 100px', color: '#fff', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', position: 'relative' },
  header: { marginBottom: '80px' },
  title: { fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '950', lineHeight: '0.9', letterSpacing: '-3px' },
  highlight: { color: '#0ea5e9' },
  
  flexLayout: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' },
  fuelInline: { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', maxWidth: '300px' },
  fuelIcon: { color: '#fff' },
  fuelTitle: { margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: '900', color: '#fff' },
  fuelQuote: { margin: 0, fontSize: '0.8rem', opacity: 0.7, fontFamily: 'monospace', color: '#fff' },

  systemLog: { position: 'fixed', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 15px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 100 },
  logDot: { width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%' },
  logText: { fontFamily: 'monospace', fontSize: '0.6rem', color: '#fff', opacity: 0.8 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '120px' },
  card: { background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '45px', borderRadius: '24px' },
  cardLabel: { color: '#0ea5e9', fontFamily: 'monospace', fontSize: '1.2rem', marginBottom: '25px', display: 'block', fontWeight: '900' }, 
  cardBody: { opacity: 0.8, fontSize: '1.25rem', lineHeight: '1.6' },

  objectiveSection: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '50px', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', padding: '60px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)' },
  objectiveContent: {},
  photoContainer: { display: 'flex', justifyContent: 'center' },
  photoShape: { width: '250px', height: '250px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255, 255, 255, 0.2)', fontSize: '0.8rem', opacity: 0.5 },

  marqueeContainer: { overflow: 'hidden', padding: '30px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  marqueeTrack: { display: 'flex', gap: '60px' },
  techPill: { fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)' }, 
  iconPill: { color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  tWrapper: { position: 'relative', paddingLeft: '45px' },
  vLineBase: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)' },
  vLineActive: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: '#0ea5e9' },
  tItem: { position: 'relative', marginBottom: '80px' },
  tDot: { position: 'absolute', left: '-51px', top: '10px', width: '12px', height: '12px', borderRadius: '50%', background: '#0ea5e9' },
  tYear: { fontWeight: 'bold', fontFamily: 'monospace', color: '#0ea5e9', fontSize: '1.2rem' },
  tTitle: { fontSize: '2.2rem', margin: '10px 0', fontWeight: '900' },
  tInstitution: { opacity: 0.5, fontSize: '0.9rem', marginBottom: '15px' },
  tDetail: { opacity: 0.8, maxWidth: '650px', lineHeight: '1.6' },

  pillBtn: { marginTop: '20px', padding: '10px 20px', borderRadius: '50px', border: '1px solid #0ea5e9', background: 'transparent', color: '#0ea5e9', fontFamily: 'monospace', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  projectBtn: { marginTop: '25px', padding: '14px 28px', borderRadius: '50px', border: '1px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', fontFamily: 'monospace', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s' },

  statusBar: { position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 0 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'monospace', fontSize: '0.65rem', color: '#fff', marginTop: '100px' },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.6 },
  blink: { width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' },
  socialStrip: { display: 'flex', gap: '25px' },
  statusLink: { color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px', fontWeight: '600' },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' },
  zoomedImg: { maxWidth: '80vw', maxHeight: '80vh', borderRadius: '8px' }
};

export default About;