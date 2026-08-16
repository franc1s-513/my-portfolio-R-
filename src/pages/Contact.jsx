import React, { useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import GlareHover from '../components/GlareHover';
import Lanyard from '../components/Lanyard';
import idFront from '../assets/lanyard/id-front.svg';

const Contact = () => {
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
    <div className="contact-wrapper">
      <style>{`
        .contact-wrapper {
          min-height: auto;
          width: 100%;
          background: transparent;
          color: #f8fafc;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          padding-top: 0;
        }

        /* Subtle Background Glow */
        .contact-wrapper::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
          width: 100%;
          height: 100%;
          max-width: 1350px;
          z-index: 1;
          padding: 0 30px 20px 30px;
          align-items: flex-start;
        }

        /* LEFT SIDE: LANYARD HANGING */
        .lanyard-section {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 520px;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
        }

        .lanyard-section .lanyard-wrapper {
          height: 100% !important;
          width: 100% !important;
        }

        .hanging-peg {
          position: absolute;
          top: 0px; /* Positioned at the top */
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #f1f5f9, #64748b, #0f172a);
          box-shadow: 0 10px 20px rgba(0,0,0,0.8), inset 0 -2px 6px rgba(0,0,0,0.5);
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
          background: #020617;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.2);
        }

        /* RIGHT SIDE: INFO & FORM */
        .content-section {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
          padding: 0 20px;
        }

        .content-header {
          margin-bottom: 20px;
        }

        .pre-heading {
          color: #00f0ff;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .pre-heading::before {
          content: '';
          display: block;
          width: 28px;
          height: 3px;
          background: #00f0ff;
          border-radius: 2px;
          box-shadow: 0 0 8px #00f0ff;
        }

        .main-heading {
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 3.8vw, 3.6rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 12px;
          color: #080c3e;
          text-shadow: 0 2px 20px rgba(14, 165, 233, 0.2);
        }

        .sub-heading {
          font-size: 1rem;
          color: #334155;
          font-weight: 500;
          line-height: 1.5;
          max-width: 480px;
        }

        /* COMBINED FORM & SOCIALS */
        .form-and-socials {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        /* HIGH-VISIBILITY FORM CARD */
        .form-card {
          flex: 1;
          background: rgba(8, 12, 62, 0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1.5px solid rgba(229, 169, 60, 0.55);
          border-radius: 20px;
          padding: 28px 26px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45), 0 0 30px rgba(8, 12, 62, 0.35);
          transition: all 0.3s ease;
        }

        .form-card:hover {
          border-color: rgba(229, 169, 60, 0.85);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55), 0 0 35px rgba(229, 169, 60, 0.3);
        }

        .input-group {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
        }

        .modern-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.08) !important;
          border: none !important;
          border-bottom: 2px solid rgba(229, 169, 60, 0.55) !important;
          border-radius: 8px 8px 0 0 !important;
          padding: 12px 14px !important;
          font-size: 0.95rem !important;
          font-weight: 500 !important;
          color: #ffffff !important;
          outline: none !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
          font-family: inherit !important;
        }

        .modern-input::placeholder {
          color: #cbd5e1 !important;
          font-weight: 500 !important;
          opacity: 0.85 !important;
        }

        .modern-input:focus {
          background: rgba(255, 255, 255, 0.14) !important;
          border-bottom-color: #00f0ff !important;
          box-shadow: 0 4px 14px rgba(0, 240, 255, 0.25) !important;
        }

        .modern-textarea {
          resize: none;
          min-height: 85px;
        }

        .submit-btn {
          width: 100%;
          background: #080c3e;
          color: #ffffff;
          border: 1.5px solid #e5a93c;
          padding: 13px 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          margin-top: 8px;
          box-shadow: 0 10px 24px rgba(8, 12, 62, 0.5);
        }

        .submit-btn:hover {
          background: #e5a93c;
          border-color: #ffffff;
          color: #080c3e;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(229, 169, 60, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* SOCIAL SIDEBAR */
        .social-sidebar {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-top: 4px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(8, 12, 62, 0.85);
          border: 1.5px solid rgba(229, 169, 60, 0.45);
          color: #ffffff;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(8, 12, 62, 0.3);
          text-decoration: none;
        }

        .social-link:hover {
          color: #080c3e;
          background: #e5a93c;
          border-color: #ffffff;
          transform: translateX(4px) scale(1.05);
          box-shadow: 0 8px 20px rgba(229, 169, 60, 0.5);
        }

        /* MOBILE RESPONSIVE QUERIES */
        @media (max-width: 960px) {
          .contact-wrapper {
            height: auto;
            overflow-y: auto;
            padding: 20px 0;
          }
          .contact-container {
            grid-template-columns: 1fr;
            padding: 15px;
          }
          .lanyard-section {
            height: 380px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 30px;
          }
          .hanging-peg {
            top: 0%;
          }
          .form-and-socials {
            flex-direction: column-reverse;
          }
          .social-sidebar {
            flex-direction: row;
            justify-content: center;
            width: 100%;
          }
          .content-section {
            padding: 0;
          }
        }
      `}</style>

      <div className="contact-container">
        
        {/* LEFT SIDE: LANYARD HANGING */}
        <motion.div 
          className="lanyard-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="hanging-peg"></div>
          <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={idFront} transparent={true} />
          </Suspense>
        </motion.div>

        {/* RIGHT SIDE: INFO & FORM */}
        <div className="content-section">
          
          <motion.div 
            className="content-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="pre-heading">Contact</div>
            <h1 className="main-heading">Let's build something.</h1>
            <p className="sub-heading">
              Whether you have a project in mind or just want to say hi, drop a message below.
            </p>
          </motion.div>

          <div className="form-and-socials">
            
            {/* FORM CARD */}
            <motion.div 
              className="form-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <form ref={form} onSubmit={sendEmail}>
                
                <div className="input-group">
                  <input 
                    type="text" 
                    name="user_name" 
                    className="modern-input" 
                    placeholder="What's your name?" 
                    required 
                  />
                </div>

                <div className="input-group">
                  <input 
                    type="email" 
                    name="user_email" 
                    className="modern-input" 
                    placeholder="What's your email?" 
                    required 
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '32px' }}>
                  <textarea 
                    name="message" 
                    className="modern-input modern-textarea" 
                    placeholder="Write your message here..." 
                    required 
                  />
                </div>

                <GlareHover borderRadius="12px">
                  <button type="submit" disabled={status === 'SENDING'} className="submit-btn">
                    <span>{status === 'SENDING' ? 'Sending...' : status === 'SUCCESS' ? 'Message Sent!' : 'Send Message'}</span>
                    <ArrowRight size={20} />
                  </button>
                </GlareHover>

              </form>
            </motion.div>

            {/* SOCIAL SIDEBAR */}
            <motion.div 
              className="social-sidebar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <a href="mailto:francisfernandov07@gmail.com" className="social-link" title="Email">
                <Mail size={22} />
              </a>
              <a href="https://github.com/franc1s-513" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                <Github size={22} />
              </a>
              <a href="https://instagram.com/franc1s._txt" target="_blank" rel="noreferrer" className="social-link" title="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                <Linkedin size={22} />
              </a>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;