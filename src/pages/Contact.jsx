import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');
  const [activeField, setActiveField] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // YOUR ACTUAL INTEGRATED CREDENTIALS
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
    <div style={containerStyle}>
      <div style={responsiveGridStyle}>
        
        {/* LEFT PANE: Identity (Stationary) */}
        <div style={pillFrameStyle}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', margin: 0, lineHeight: '0.8', letterSpacing: '-2px' }}>
              FRANCIS<br/>MV
            </h1>
            <p style={technicalSubTextStyle}>CONNECT_PROTOCOLS // 2026</p>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginTop: '50px', justifyContent: 'center' }}>
            {socials.map((soc, i) => (
              <motion.a
                key={i}
                href={soc.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, color: '#fff', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))' }}
                style={socialIconStyle}
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* RIGHT PANE: Contact Form (Stationary) */}
        <div style={{ ...pillFrameStyle, padding: '60px 50px' }}>
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
              <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%' }}>
                
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
                  <div style={{ ...getInputPillStyle(activeField === 'msg'), borderRadius: '30px', alignItems: 'flex-start', paddingTop: '15px' }}>
                    <MessageSquare size={16} style={{marginTop: '4px'}} />
                    <textarea 
                      name="message" 
                      placeholder="TYPE YOUR MESSAGE..." 
                      rows="4" 
                      onFocus={() => setActiveField('msg')}
                      onBlur={() => setActiveField(null)}
                      required style={innerInputStyle} 
                    />
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000', boxShadow: '0 0 20px rgba(255,255,255,0.4)' }}
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

      </div>
    </div>
  );
};

// --- STYLING LOGIC ---

const containerStyle = {
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 5%',
  background: 'transparent',
  boxSizing: 'border-box'
};

const responsiveGridStyle = {
  display: 'grid',
  gridTemplateColumns: window.innerWidth > 900 ? '0.8fr 1.2fr' : '1fr',
  gap: '40px',
  width: '100%',
  maxWidth: '1200px'
};

const pillFrameStyle = {
  padding: '60px 40px',
  borderRadius: '80px',
  border: '2px solid rgba(255, 255, 255, 0.5)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0 0 60px rgba(255, 255, 255, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
};

const technicalSubTextStyle = {
  fontFamily: 'monospace',
  color: 'rgba(255,255,255,0.4)',
  letterSpacing: '5px',
  fontSize: '0.65rem',
  marginTop: '25px',
  fontWeight: 'bold'
};

const externalLabelStyle = {
  fontFamily: 'monospace',
  color: 'rgba(255,255,255,0.6)',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  letterSpacing: '3px',
  marginLeft: '25px',
  marginBottom: '5px'
};

const getInputPillStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)',
  border: isActive ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '999px',
  padding: '5px 25px',
  gap: '15px',
  color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
  transition: 'all 0.3s ease',
  boxShadow: isActive ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
});

const innerInputStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  padding: '12px 0',
  outline: 'none',
  fontSize: '1rem',
  width: '100%',
  fontFamily: 'inherit'
};

const pillButtonStyle = {
  background: 'transparent',
  border: '1px solid #fff',
  color: '#fff',
  padding: '20px',
  borderRadius: '999px',
  fontWeight: '900',
  letterSpacing: '5px',
  fontSize: '0.8rem',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'all 0.4s ease'
};

const socialIconStyle = {
  color: 'rgba(255,255,255,0.4)',
  transition: '0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '5px' };

export default Contact;