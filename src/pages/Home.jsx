import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import PageTransition from '../components/PageTransition';
import MagneticWrapper from '../components/MagneticWrapper'; 
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5';

const Home = ({ isDark }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 968);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/franc1s-513", label: "GITHUB" },
    { Icon: FaLinkedin, url: "https://linkedin.com/in/francis-fernando-v-bb81a432a", label: "LINKEDIN" },
    { Icon: FaInstagram, url: "https://instagram.com/franc1s._txt", label: "INSTA" },
    { Icon: IoMail, url: "mailto:francisfernandov07@gmail.com", label: "EMAIL" }
  ];

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? '120px 5% 100px' : '0 10%',
      height: isMobile ? 'auto' : '100vh',
    }}>
      <div style={{
        ...styles.wrapper,
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
      }}>
        
        <div style={{ 
          ...styles.textSide, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>
          <PageTransition delay={0.2} direction="up">
            
          </PageTransition>

          <PageTransition delay={0.4} direction="up">
            <h1 style={{
              ...styles.name,
              fontSize: isMobile ? '3.5rem' : '6rem',
              textShadow: isDark ? '0 0 30px rgba(14, 165, 233, 0.4)' : 'none',
            }}>
              FRANCIS FERNANDO<span style={styles.dot}>.</span>
            </h1>
          </PageTransition>

          <PageTransition delay={0.6} direction="up">
            <p style={{
              ...styles.tagline,
              fontSize: isMobile ? '1.5rem' : '2.1rem', 
              color: '#fff'
            }}>
              Engineering the Solution <br/> 
              <span style={{fontWeight: '800'}}>behind an interface.</span>
            </p>
          </PageTransition>

          <PageTransition delay={0.8} direction="up">
            <div style={styles.ctaGroup}>
              {/* DOWNLOAD RESUME BUTTON */}
              <MagneticWrapper>
                <motion.a 
                  href="/Francis_Resume.pdf" // Put your pdf in public folder
                  download="Francis_Fernando_CV.pdf"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(14, 165, 233, 0.6)' }}
                  style={styles.primaryBtn}
                >
                  DOWNLOAD_CV.EXE
                </motion.a>
              </MagneticWrapper>

              {/* CONTACT ME BUTTON */}
              <MagneticWrapper>
                <motion.button 
                  onClick={() => navigate('/contact')} // Go to contact page
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                  style={styles.secondaryBtn}
                >
                  CONTACT_ME
                </motion.button>
              </MagneticWrapper>
            </div>
          </PageTransition>
        </div>

        {/* IMAGE SECTION */}
        <PageTransition delay={1.0} direction={isMobile ? "up" : "left"}>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}
          >
            <MagneticWrapper sensitivity={0.2}>
              <motion.div 
                animate={{ 
                  borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%', 
                    '50% 50% 33% 67% / 55% 27% 73% 45%', 
                    '30% 70% 70% 30% / 30% 30% 70% 70%'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={styles.imageFrame}
              >
                <img src="/your-photo.jpg" alt="Francis" style={styles.image} />
              </motion.div>
            </MagneticWrapper>
          </motion.div>
        </PageTransition>
      </div>

      {/* FOOTER */}
      {!isMobile && (
        <div style={styles.statusBar}>
           <div style={styles.statusLeft}>
              <div style={styles.blink} /> 
              
           </div>
           <div style={styles.socialStrip}>
              {socialLinks.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" style={styles.statusLink}>
                  <item.Icon size={16} /> {item.label}
                </a>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflowX: 'hidden', minHeight: '100vh' },
  wrapper: { display: 'grid', gap: '50px', alignItems: 'center', width: '100%', maxWidth: '1200px', zIndex: 2 },
  textSide: { textAlign: 'inherit' },
  imageFrame: { 
    width: '420px', height: '480px', overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 0.15)'
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  greeting: { color: '#0ea5e9', letterSpacing: '4px', fontSize: '0.75rem', fontWeight: '800', fontFamily: 'monospace' },
  name: { fontWeight: '900', color: '#fff', margin: '5px 0', lineHeight: '0.9', letterSpacing: '-3px' },
  dot: { color: '#0ea5e9' },
  tagline: { margin: '25px 0 0', fontWeight: '300', lineHeight: '1.2', letterSpacing: '-1px' },
  ctaGroup: { display: 'flex', gap: '20px', marginTop: '40px' },
  
  // PILL SHAPED LIGHT BLUE BUTTON
  primaryBtn: { 
    padding: '16px 35px', borderRadius: '50px', border: 'none', 
    fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', 
    fontFamily: 'monospace', textDecoration: 'none',
    background: '#0ea5e9', color: '#fff' // Blue with White text
  },
  
  // PILL SHAPED OUTLINE BUTTON
  secondaryBtn: { 
    padding: '16px 35px', borderRadius: '50px', 
    border: '2px solid rgba(255, 255, 255, 0.3)', 
    background: 'transparent', color: '#fff', 
    fontWeight: '900', fontSize: '0.85rem', 
    cursor: 'pointer', fontFamily: 'monospace' 
  },

  statusBar: {
    position: 'absolute', bottom: '25px', left: '5%', right: '5%', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
    fontFamily: 'monospace', fontSize: '0.65rem', color: '#fff'
  },
  statusLeft: { display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.6 },
  blink: { width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' },
  socialStrip: { display: 'flex', gap: '25px' },
  statusLink: { color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px', fontWeight: '600' }
};

export default Home;