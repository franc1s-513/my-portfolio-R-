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
    <div style={pageContainer}>
      <style>{`
        /* 1. CLOUD & LOWERED BRANDING */
        .glass-cloud {
          fill: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          stroke: rgba(255, 255, 255, 0.3);
          stroke-width: 1.5px;
        }

        .name-wrapper {
          text-align: center;
          z-index: 10;
          /* Pushing FRANCIS even lower into the cloud base */
          padding-top: 80px; 
        }

        .brand-text {
          margin: 0; color: #fff; font-weight: 900; font-size: 3.5rem;
          letter-spacing: 0.25em; text-transform: uppercase;
          text-shadow: 0 0 20px rgba(255,255,255,0.2);
        }

        /* 2. FULLY TRANSPARENT RIGHT SIDE & GLOW EFFECTS */
        .transparent-form-container {
          background: transparent; /* Full transparency as requested */
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
        }

        /* Hover & Focus Shadow Light Effects */
        .glow-pill:hover, .glow-pill:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .textarea-glow {
          border-radius: 25px;
          resize: none;
        }

        /* 3. GLOWING TRANSMIT BUTTON */
        .glow-btn {
          width: 100%;
          background: #fff;
          color: #000;
          border: none;
          padding: 18px;
          border-radius: 50px;
          font-weight: 900;
          letter-spacing: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-top: 15px;
          box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }

        .glow-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
      `}</style>

      <div style={layoutGrid}>
        
        {/* LEFT PART: LOWERED IDENTITY & SOCIALS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
          <div className="animate-float" style={{ position: 'relative', width: '520px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 120 100">
              <path className="glass-cloud" d="M25,80 H95 C110,80 118,70 118,55 C118,40 108,30 95,30 C92,10 75,2 55,5 C40,8 32,18 28,30 C12,28 2,40 2,55 C2,72 10,80 25,80 Z" />
            </svg>
            <div className="name-wrapper">
              <h1 className="brand-text">FRANCIS</h1>
              
            </div>
          </div>

          <div style={{ display: 'flex', gap: '30px' }}>
            {[<Github />, <Linkedin />, <Instagram />, <Mail />].map((icon, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.1)' }}
                style={socialCircle}
              >
                {React.cloneElement(icon, { size: 26, color: '#fff' })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT PART: FULLY TRANSPARENT & COMPACT */}
        <div className="transparent-form-container">
          <div style={formHeader}>
            <ShieldCheck size={16} color="rgba(255,255,255,0.6)" /> 
            <span>{status === 'SUCCESS' ? 'UPLINK_SUCCESSFUL' : ''}</span>
          </div>

          <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <label style={fieldLabel}>NAME</label>
              <input type="text" name="user_name" className="glow-pill" placeholder="ENTER_NAME..." required />
            </div>


            

            <div>
              <label style={fieldLabel}>PUT YOUR MAIL
                
                </label>
              <input type="email" name="user_email" className="glow-pill" placeholder="ENTER_EMAIL..." required />
            </div>

            <div>
              <label style={fieldLabel}>DROP YOUR FEEDBACK</label>
              <textarea name="message" className="glow-pill textarea-glow" rows="5" placeholder="ENTER_MESSAGE..." required />
            </div>

            <button type="submit" disabled={status === 'SENDING'} className="glow-btn">
              {status === 'SENDING' ? 'TRANSMITTING...' : 'TRANSMIT_MESSAGE'} <Send size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

// --- STYLING OBJECTS ---
const pageContainer = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10%', background: 'transparent' };
const layoutGrid = { display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '100px', width: '100%', maxWidth: '1400px', alignItems: 'center' };
const socialCircle = { width: '60px', height: '60px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' };
const fieldLabel = { color: '#fff', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '3px', marginLeft: '20px', opacity: 0.9 };
const formHeader = { color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace', marginBottom: '35px', letterSpacing: '2px' };

export default FinalPortfolioPage;