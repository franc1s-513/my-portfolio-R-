import React, { useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Clock, 
  MapPin, 
  User, 
  MessageSquare, 
  ArrowUpRight 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import GlareHover from '../components/GlareHover';
import Lanyard from '../components/Lanyard';
import idFront from '../assets/lanyard/id-front.svg';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('francisfernandov07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.message) return;

    setStatus('SENDING');
    emailjs.sendForm('service_dxpn5fs', 'template_45eaf39', form.current, 'Mb0nA1eh4ItwUR3EI')
      .then(() => {
        setStatus('SUCCESS');
        setFormData({ user_name: '', user_email: '', message: '' });
        if (form.current) form.current.reset();
        setTimeout(() => setStatus('IDLE'), 5000);
      }, (error) => {
        setStatus('ERROR');
        console.error('EmailJS Error:', error);
        setTimeout(() => setStatus('IDLE'), 5000);
      });
  };

  const socials = [
    {
      name: 'GitHub',
      handle: '@franc1s-513',
      url: 'https://github.com/franc1s-513',
      icon: <Github size={16} />
    },
    {
      name: 'LinkedIn',
      handle: 'Francis Fernando',
      url: 'https://linkedin.com',
      icon: <Linkedin size={16} />
    },
    {
      name: 'Instagram',
      handle: '@franc1s._txt',
      url: 'https://instagram.com/franc1s._txt',
      icon: <Instagram size={16} />
    },
    {
      name: 'Email Direct',
      handle: 'francisfernandov07@gmail.com',
      url: 'mailto:francisfernandov07@gmail.com',
      icon: <Mail size={16} />
    }
  ];

  return (
    <div className="contact-wrapper">
      <style>{`
        .contact-wrapper {
          height: 100vh;
          max-height: 100vh;
          width: 100%;
          background: transparent;
          color: #080c3e;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 85px 4% 20px 4%;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Ambient Ethereal Glow */
        .ambient-glow-orb {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(56, 189, 248, 0.03) 50%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
        }

        .orb-top-right {
          top: 5%;
          right: 5%;
        }

        .orb-bottom-left {
          bottom: 5%;
          left: 5%;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 30px;
          width: 100%;
          max-width: 1300px;
          height: 100%;
          max-height: calc(100vh - 105px);
          position: relative;
          z-index: 2;
          align-items: center;
        }

        /* LEFT SIDE: LANYARD HANGING */
        .lanyard-card-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          max-height: 520px;
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 28px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.07), inset 0 1px 1px rgba(255, 255, 255, 0.9);
          overflow: hidden;
        }

        .hanging-peg {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffffff, #94a3b8, #334155);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.8);
          z-index: 10;
        }

        .hanging-peg::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0f172a;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
        }

        /* RIGHT SIDE: CONTENT & FORM */
        .content-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          max-height: 520px;
          justify-content: center;
        }

        .content-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .main-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1.2px;
          color: #080c3e;
          margin: 0;
          text-shadow: 0 2px 18px rgba(14, 165, 233, 0.15);
        }

        /* QUICK CONNECT DIRECT EMAIL STRIP */
        .email-direct-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(14, 165, 233, 0.25);
          border-radius: 14px;
          backdrop-filter: blur(16px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.03);
        }

        .email-info-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #080c3e;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          background: rgba(14, 165, 233, 0.12);
          color: #0284c7;
          border: 1px solid rgba(14, 165, 233, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-btn:hover {
          background: #0ea5e9;
          color: #ffffff;
          border-color: #0ea5e9;
        }

        /* FORM & SOCIALS LAYOUT */
        .form-and-socials-grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 16px;
          align-items: stretch;
        }

        /* ELEVATED GLASS FORM CARD */
        .glass-form-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 18px 18px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #475569;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .glass-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.85);
          border: 1.2px solid rgba(203, 213, 225, 0.8);
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 0.86rem;
          font-weight: 500;
          color: #080c3e;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .glass-input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .glass-input:focus {
          border-color: #0ea5e9;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
        }

        .glass-textarea {
          resize: none;
          min-height: 68px;
        }

        .submit-action-btn {
          width: 100%;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 11px 20px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.3);
        }

        .submit-action-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(14, 165, 233, 0.45);
        }

        .submit-action-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        /* STATUS BADGE */
        .status-feedback-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          font-size: 0.76rem;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .status-success {
          background: rgba(34, 197, 94, 0.15);
          color: #15803d;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .status-error {
          background: rgba(239, 68, 68, 0.15);
          color: #b91c1c;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        /* SOCIAL CONNECT STACK */
        .social-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 9px;
          height: 100%;
          justify-content: space-between;
        }

        .social-card-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 14px;
          backdrop-filter: blur(16px);
          text-decoration: none;
          color: #080c3e;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }

        .social-card-item:hover {
          background: #ffffff;
          border-color: #0ea5e9;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(14, 165, 233, 0.16);
        }

        .social-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .social-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(14, 165, 233, 0.12);
          color: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .social-card-item:hover .social-icon-box {
          background: #0ea5e9;
          color: #ffffff;
        }

        .social-text-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .social-name {
          font-size: 0.8rem;
          font-weight: 800;
          color: #080c3e;
        }

        .social-handle {
          font-size: 0.68rem;
          color: #64748b;
          font-family: 'JetBrains Mono', monospace;
        }

        .social-arrow-icon {
          color: #94a3b8;
          transition: transform 0.2s ease;
        }

        .social-card-item:hover .social-arrow-icon {
          color: #0ea5e9;
          transform: translate(2px, -2px);
        }

        /* METRICS ROW AT BOTTOM */
        .metrics-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          margin-top: 2px;
        }

        .metric-mini-card {
          padding: 8px 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(14, 165, 233, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metric-icon {
          color: #0284c7;
        }

        .metric-label {
          font-size: 0.64rem;
          color: #64748b;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
        }

        .metric-value {
          font-size: 0.75rem;
          font-weight: 800;
          color: #080c3e;
        }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 1024px) {
          .contact-wrapper {
            height: auto;
            max-height: none;
            overflow-y: auto;
            padding: 110px 4% 60px;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            max-height: none;
          }
          .lanyard-card-container {
            height: 380px;
          }
          .content-section {
            max-height: none;
          }
          .form-and-socials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Background Ambient Glows */}
      <div className="ambient-glow-orb orb-top-right" />
      <div className="ambient-glow-orb orb-bottom-left" />

      <div className="contact-grid">
        
        {/* LEFT: 3D LANYARD INTERACTIVE CARD */}
        <motion.div 
          className="lanyard-card-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hanging-peg" />
          <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={idFront} transparent={true} />
          </Suspense>
        </motion.div>

        {/* RIGHT: CONTENT & FORM */}
        <motion.div 
          className="content-section"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* HEADER */}
          <div className="content-header">
            <h1 className="main-heading">Let's engineer something iconic.</h1>
          </div>

          {/* 1-CLICK COPY DIRECT EMAIL */}
          <div className="email-direct-strip">
            <div className="email-info-left">
              <Mail size={15} color="#0284c7" />
              <span>francisfernandov07@gmail.com</span>
            </div>
            <button className="copy-btn" onClick={handleCopyEmail}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          {/* FORM & SOCIAL STACK */}
          <div className="form-and-socials-grid">
            
            {/* GLASS FORM */}
            <div className="glass-form-card">
              <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                <div className="input-group">
                  <label className="input-label">
                    <User size={12} />
                    <span>Your Name</span>
                  </label>
                  <input 
                    type="text" 
                    name="user_name" 
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className="glass-input" 
                    placeholder="e.g. Alex Morgan" 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Mail size={12} />
                    <span>Your Email</span>
                  </label>
                  <input 
                    type="email" 
                    name="user_email" 
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className="glass-input" 
                    placeholder="alex@company.com" 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <MessageSquare size={12} />
                    <span>Project Details</span>
                  </label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="glass-input glass-textarea" 
                    placeholder="Tell me about your project goals..." 
                    required 
                  />
                </div>

                <GlareHover borderRadius="12px">
                  <button 
                    type="submit" 
                    disabled={status === 'SENDING'} 
                    className="submit-action-btn"
                  >
                    <span>
                      {status === 'SENDING' 
                        ? 'Sending...' 
                        : status === 'SUCCESS' 
                        ? 'Message Dispatched!' 
                        : 'Send Message'}
                    </span>
                    {status === 'SUCCESS' ? <Check size={16} /> : <Send size={15} />}
                  </button>
                </GlareHover>

                {/* STATUS FEEDBACK */}
                <AnimatePresence>
                  {status === 'SUCCESS' && (
                    <motion.div 
                      className="status-feedback-banner status-success"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Check size={14} />
                      <span>Thank you! Your message was sent successfully.</span>
                    </motion.div>
                  )}
                  {status === 'ERROR' && (
                    <motion.div 
                      className="status-feedback-banner status-error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>Error sending. Please email directly above.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

            {/* SOCIAL CARDS & METRICS */}
            <div className="social-cards-stack">
              {socials.map((s, idx) => (
                <a 
                  key={idx} 
                  href={s.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-card-item"
                  title={s.name}
                >
                  <div className="social-left">
                    <div className="social-icon-box">
                      {s.icon}
                    </div>
                    <div className="social-text-info">
                      <span className="social-name">{s.name}</span>
                      <span className="social-handle">{s.handle}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="social-arrow-icon" />
                </a>
              ))}

              {/* QUICK METRICS */}
              <div className="metrics-strip">
                <div className="metric-mini-card">
                  <Clock size={14} className="metric-icon" />
                  <div>
                    <div className="metric-label">Response</div>
                    <div className="metric-value">&lt; 24h Reply</div>
                  </div>
                </div>
                <div className="metric-mini-card">
                  <MapPin size={14} className="metric-icon" />
                  <div>
                    <div className="metric-label">Location</div>
                    <div className="metric-value">Tamil Nadu, IN</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Contact;