



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import MagneticWrapper from '../components/MagneticWrapper'; 
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5'; // New icon

const Home = ({ isDark }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 968);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 968);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Defined the social links here for cleaner code
  const socialLinks = [
  { Icon: FaGithub, url: "https://github.com/yourusername" },
  { Icon: FaLinkedin, url: "https://linkedin.com/in/yourusername" },
  { Icon: FaInstagram, url: "https://instagram.com/yourusername" },
  { Icon: IoMail, url: "mailto:francisfernandov07@gmail.com" } // Quick contact
];

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? '120px 5% 60px' : '0 10%',
      height: isMobile ? 'auto' : '100vh',
    }}>
      <div style={{
        ...styles.wrapper,
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        
        <div style={{ 
          ...styles.textSide, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>
          <PageTransition delay={0.2} direction="up">
            <h2 style={styles.greeting}>HELLO, I'M</h2>
          </PageTransition>

          <PageTransition delay={0.4} direction="up">
            <h1 style={{
              ...styles.name,
              fontSize: isMobile ? '3.5rem' : '6.5rem',
              textShadow: isDark ? '0 0 30px rgba(14, 165, 233, 0.5)' : 'none'
            }}>
              FRANCIS<span style={styles.dot}>.</span>
            </h1>
          </PageTransition>

          <PageTransition delay={0.6} direction="up">
            <p style={{
              ...styles.tagline,
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              margin: isMobile ? '20px auto 0' : '20px 0 0'
            }}>
              Building <span style={styles.highlight}>digital experiences</span> that 
              blend logic with creative design.
            </p>
          </PageTransition>

          {/* MAGNETIC CTA BUTTONS */}
          <PageTransition delay={0.8} direction="up">
            <div style={{
              ...styles.ctaGroup,
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : 'auto',
              alignItems: 'center'
            }}>
              <MagneticWrapper>
                <motion.a 
                  href="/Francis_MV_Resume.pdf" 
                  download
                  whileHover={{ scale: 1.05 }}
                  style={{
                    ...styles.primaryBtn,
                    width: isMobile ? '280px' : 'auto',
                    background: isDark ? '#0ea5e9' : '#fff',
                    color: isDark ? '#fff' : '#0ea5e9',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  Download Resume
                </motion.a>
              </MagneticWrapper>

              <MagneticWrapper>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  style={{
                    ...styles.secondaryBtn,
                    width: isMobile ? '280px' : 'auto'
                  }}
                >
                  Contact Me
                </motion.button>
              </MagneticWrapper>
            </div>

            {/* MAGNETIC SOCIALS SECTION - UPDATED */}
            <div style={{ 
                display: 'flex', 
                gap: '25px', 
                marginTop: '40px',
                justifyContent: isMobile ? 'center' : 'flex-start' 
            }}>
              {socialLinks.map((item, i) => (
                <MagneticWrapper key={i} sensitivity={0.8}>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                        color: isDark ? '#fff' : '#333', 
                        fontSize: '1.8rem',
                        display: 'flex',
                        transition: '0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#0ea5e9'}
                    onMouseLeave={(e) => e.target.style.color = isDark ? '#fff' : '#333'}
                  >
                    <item.Icon />
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </PageTransition>
        </div>

        {/* IMAGE SECTION */}
        <PageTransition delay={1.0} direction={isMobile ? "up" : "left"}>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              display: 'flex', 
              justifyContent: isMobile ? 'center' : 'flex-end',
              marginTop: isMobile ? '50px' : '0'
            }}
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
                style={{
                  ...styles.imageFrame,
                  width: isMobile ? '280px' : '380px', 
                  height: isMobile ? '320px' : '450px',
                  borderColor: isDark ? 'rgba(14, 165, 233, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: isDark 
                    ? '0 30px 60px rgba(14, 165, 233, 0.4)' 
                    : '0 30px 60px rgba(0, 74, 124, 0.1)',
                }}
              >
                <img 
                  src="YOUR_IMAGE_URL_HERE" 
                  alt="Francis" 
                  style={styles.image} 
                />
              </motion.div>
            </MagneticWrapper>
          </motion.div>
        </PageTransition>

      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, overflowX: 'hidden' },
  wrapper: { display: 'grid', gap: '50px', alignItems: 'center', width: '100%', maxWidth: '1200px' },
  textSide: { textAlign: 'inherit' },
  imageFrame: { background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', border: '3px solid', overflow: 'hidden', cursor: 'pointer' },
  image: { width: '110%', height: '110%', objectFit: 'cover', marginLeft: '-5%', marginTop: '-5%' },
  greeting: { color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' },
  name: { fontWeight: '900', color: '#fff', margin: '5px 0', lineHeight: '1', letterSpacing: '-2px' },
  dot: { color: '#0ea5e9' },
  tagline: { color: 'rgba(255, 255, 255, 0.9)', maxWidth: '500px', lineHeight: '1.6' },
  highlight: { color: '#fff', fontWeight: '700', borderBottom: '2px solid #0ea5e9', paddingBottom: '2px' },
  ctaGroup: { display: 'flex', gap: '20px', marginTop: '40px' },
  primaryBtn: { padding: '15px 35px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', textAlign: 'center' },
  secondaryBtn: { padding: '15px 35px', borderRadius: '50px', border: '2px solid #fff', background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' },
};

export default Home;