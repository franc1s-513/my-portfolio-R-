import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');
  const [activeField, setActiveField] = useState(null);
  
  // 1. Dynamic screen size detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    const SERVICE_ID = "service_dxpn5fs"; 
    const TEMPLATE_ID = "template_45eaf39"; 
    const PUBLIC_KEY = "Mb0nA1eh4ItwUR3EI"; 

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error("EmailJS Error:", error);
        alert("Transmission failed. Please check your connection.");
        setStatus('idle');
      });
  };

  const socials = [
    { icon: <Github size={22} />, link: "https://github.com/yourusername" },
    { icon: <Linkedin size={22} />, link: "https://linkedin.com/in/yourusername" },
    { icon: <Instagram size={22} />, link: "https://instagram.com/yourusername" },
    { icon: <Mail size={22} />, link: "mailto:francisfernandov07@gmail.com" }
  ];

  return (
    <div style={{
      ...containerStyle,
      padding: isMobile ? '100px 5% 40px' : '40px 5%'
    }}>
      <div style={{
        ...responsiveGridStyle,
        gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1.2fr',
      }}>
        
        {/* LEFT PANE: Identity */}
        <PageTransition direction={isMobile ? "down" : "right"} delay={0.2}>
          <div style={{
            ...pillFrameStyle,
            borderRadius: isMobile ? '40px' : '80px',
            padding: isMobile ? '40px 20px' : '60px 40px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: isMobile ? '2.8rem' : '3.5rem', 
                fontWeight: '900', 
                color: '#fff', 
                margin: 0, 
                lineHeight: '0.9', 
                letterSpacing: '-2px' 
              }}>
                FRANCIS<br/>MV
              </h1>
              <p style={technicalSubTextStyle}>CONNECT_PROTOCOLS // 2026</p>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: isMobile ? '30px' : '50px', justifyContent: 'center' }}>
              {socials.map((soc, i) => (
                <motion.a
                  key={i}
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, color: '#fff' }}
                  style={socialIconStyle}
                >
                  {soc.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </PageTransition>

        {/* RIGHT PANE: Contact Form */}
        <PageTransition direction={isMobile ? "up" : "left"} delay={0.4}>
          <div style={{ 
            ...pillFrameStyle, 
            borderRadius: isMobile ? '40px' : '80px',
            padding: isMobile ? '40px 25px' : '60px 50px' 
          }}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  style={{ textAlign: 'center', color: '#fff' }}
                >
                  <CheckCircle size={60} strokeWidth={1} style={{ marginBottom: '20px' }} />
                  <h3 style={{ letterSpacing: '5px', fontWeight: '200' }}>TRANSMISSION_COMPLETE</h3>
                  <p style={{ opacity: 0.5, fontSize: '0.7rem', marginTop: '10px' }}>I'LL GET BACK TO YOU SHORTLY.</p>
                </motion.div>
              ) : (
                <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                  
                  <div style={formGroupStyle}>
                    <label style={externalLabelStyle}>01. IDENTIFICATION</label>
                    <div style={getInputPillStyle(activeField === 'name')}>
                      <User size={16} />
                      <input 
                        name="user_name" 
                        placeholder="FULL NAME" 
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        required style={innerInputStyle} 
                      />
                    </div>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={externalLabelStyle}>02. DIGITAL_ADDR</label>
                    <div style={getInputPillStyle(activeField === 'email')}>
                      <Mail size={16} />
                      <input 
                        name="user_email" 
                        type="email" 
                        placeholder="EMAIL@DOMAIN.COM" 
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        required style={innerInputStyle} 
                      />
                    </div>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={externalLabelStyle}>03. INQUIRY_BODY</label>
                    <div style={{ 
                      ...getInputPillStyle(activeField === 'msg'), 
                      borderRadius: '25px', 
                      alignItems: 'flex-start', 
                      paddingTop: '15px' 
                    }}>
                      <MessageSquare size={16} style={{marginTop: '4px'}} />
                      <textarea 
                        name="message" 
                        placeholder="TYPE YOUR MESSAGE..." 
                        rows={isMobile ? "3" : "4"} 
                        onFocus={() => setActiveField('msg')}
                        onBlur={() => setActiveField(null)}
                        required style={innerInputStyle} 
                      />
                    </div>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={status === 'sending'}
                    style={{...pillButtonStyle, opacity: status === 'sending' ? 0.5 : 1}}
                  >
                    {status === 'sending' ? 'UPLOADING...' : 'SEND DISPATCH'}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </PageTransition>

      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = { minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', boxSizing: 'border-box' };
const responsiveGridStyle = { display: 'grid', gap: '30px', width: '100%', maxWidth: '1200px' };
const pillFrameStyle = { border: '2px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 0 60px rgba(255, 255, 255, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)' };
const technicalSubTextStyle = { fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '5px', fontSize: '0.65rem', marginTop: '20px', fontWeight: 'bold' };
const externalLabelStyle = { fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '2px', marginLeft: '20px', marginBottom: '5px' };
const getInputPillStyle = (isActive) => ({ display: 'flex', alignItems: 'center', background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)', border: isActive ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '999px', padding: '2px 20px', gap: '12px', color: isActive ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s ease' });
const innerInputStyle = { background: 'transparent', border: 'none', color: '#fff', padding: '12px 0', outline: 'none', fontSize: '0.95rem', width: '100%', fontFamily: 'inherit' };
const pillButtonStyle = { background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '18px', borderRadius: '999px', fontWeight: '900', letterSpacing: '5px', fontSize: '0.75rem', cursor: 'pointer', marginTop: '10px', transition: 'all 0.4s ease' };
const socialIconStyle = { color: 'rgba(255,255,255,0.4)', transition: '0.3s ease', display: 'flex', alignItems: 'center' };
const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '2px' };

export default Contact;