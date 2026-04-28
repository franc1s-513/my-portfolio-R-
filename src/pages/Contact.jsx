import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ShieldCheck, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const FinalPortfolioPage = () => {
  const form = useRef();
  const [status, setStatus] = useState('IDLE');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('SENDING');
    emailjs.sendForm('service_dxpn5fs', 'template_45eaf39', form.current, 'Mb0nA1eh4ItwUR3EI')
      .then(() => {
        setStatus('SUCCESS');
        form.current.reset();
        setTimeout(() => setStatus('IDLE'), 4000);
      }, (error) => {
        setStatus('ERROR');
        console.log(error.text);
      });
  };

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: transparent;
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .layout-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          width: 100%;
          max-width: 1200px;
        }

        /* CLOUD & BRANDING */
        .glass-cloud {
          fill: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          stroke: rgba(255, 255, 255, 0.3);
          stroke-width: 1.5px;
        }

        .cloud-section {
          position: relative;
          width: 100%;
          max-width: 520px;
          aspect-ratio: 120/100;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .name-wrapper {
          text-align: center;
          z-index: 10;
          padding-top: 40px; 
        }

        .brand-text {
          margin: 0; 
          font-weight: 900; 
          font-size: clamp(2rem, 8vw, 3.5rem);
          letter-spacing: 0.25em; 
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(255,255,255,0.2);
        }

        /* FORM STYLES */
        .transparent-form-container {
          background: transparent;
          width: 100%;
          max-width: 460px;
        }

        .glow-pill {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 16px 25px;
          color: #fff;
          outline: none;
          transition: all 0.4s ease;
          margin-top: 8px;
          box-sizing: border-box;
        }

        .glow-pill:focus {
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
        }

        .textarea-glow {
          border-radius: 20px;
          resize: none;
        }

        .glow-btn {
          width: 100%;
          background: #fff;
          color: #000;
          border: none;
          padding: 18px;
          border-radius: 50px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: 0.3s ease;
          margin-top: 10px;
        }

        .glow-btn:hover {
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        /* MOBILE RESPONSIVE QUERIES */
        @media (max-width: 900px) {
          .layout-container {
            flex-direction: column;
            gap: 40px;
            text-align: center;
          }
          
          .cloud-section {
            max-width: 350px; /* Smaller cloud on mobile */
          }

          .name-wrapper {
             padding-top: 20px;
          }

          .transparent-form-container {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="layout-container">
        
        {/* LEFT PART: IDENTITY & SOCIALS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%' }}>
          <div className="cloud-section animate-float">
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 120 100">
              <path className="glass-cloud" d="M25,80 H95 C110,80 118,70 118,55 C118,40 108,30 95,30 C92,10 75,2 55,5 C40,8 32,18 28,30 C12,28 2,40 2,55 C2,72 10,80 25,80 Z" />
            </svg>
            <div className="name-wrapper">
              <h1 className="brand-text">FRANCIS</h1>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[<Github />, <Linkedin />, <Instagram />, <Mail />].map((icon, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={socialCircle}
              >
                {React.cloneElement(icon, { size: 22, color: '#fff' })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT PART: FORM */}
        <div className="transparent-form-container">
          <div style={formHeader}>
            <ShieldCheck size={14} /> 
            <span>{status === 'SUCCESS' ? 'UPLINK_SUCCESSFUL' : ''}</span>
          </div>

          <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={fieldLabel}>NAME</label>
              <input type="text" name="user_name" className="glow-pill" placeholder="ENTER_NAME..." required />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label style={fieldLabel}>EMAIL</label>
              <input type="email" name="user_email" className="glow-pill" placeholder="ENTER_EMAIL..." required />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label style={fieldLabel}>FEEDBACK</label>
              <textarea name="message" className="glow-pill textarea-glow" rows="4" placeholder="ENTER_MESSAGE..." required />
            </div>

            <button type="submit" disabled={status === 'SENDING'} className="glow-btn">
              {status === 'SENDING' ? 'SENDING...' : 'TRANSMIT'} <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

// --- STYLING OBJECTS (Updated for consistency) ---
const socialCircle = { 
  width: '50px', 
  height: '50px', 
  borderRadius: '50%', 
  border: '1px solid rgba(255,255,255,0.2)', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  cursor: 'pointer', 
  background: 'rgba(255,255,255,0.05)'
};

const fieldLabel = { 
  color: '#fff', 
  fontSize: '0.7rem', 
  fontWeight: '900', 
  letterSpacing: '2px', 
  marginLeft: '15px', 
  opacity: 0.8 
};

const formHeader = { 
  color: 'rgba(255,255,255,0.5)', 
  fontSize: '0.6rem', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  gap: '10px', 
  fontFamily: 'monospace', 
  marginBottom: '20px', 
  letterSpacing: '2px' 
};

export default FinalPortfolioPage;