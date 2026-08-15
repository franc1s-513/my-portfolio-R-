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
          min-height: calc(100vh - 120px);
          width: 100%;
          background: transparent;
          color: #f8fafc;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
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
          gap: 40px;
          width: 100%;
          height: 100%;
          max-width: 1400px;
          z-index: 1;
          padding: 40px;
        }

        /* LEFT SIDE: LANYARD HANGING */
        .lanyard-section {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lanyard-section .lanyard-wrapper {
          height: 100% !important;
          width: 100% !important;
        }

        .hanging-peg {
          position: absolute;
          top: 8px; /* Positioned at the very top tip of the rope */
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
          justify-content: center;
          height: 100%;
          padding: 0 40px;
        }

        .content-header {
          margin-bottom: 30px;
        }

        .pre-heading {
          color: #38bdf8;
          font-size: 0.875rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pre-heading::before {
          content: '';
          display: block;
          width: 30px;
          height: 2.5px;
          background: #38bdf8;
        }

        .main-heading {
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 16px;
          color: #f8fafc;
        }

        .sub-heading {
          font-size: 1.05rem;
          color: #cbd5e1;
          font-weight: 500;
          line-height: 1.6;
          max-width: 480px;
        }

        /* COMBINED FORM & SOCIALS */
        .form-and-socials {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .form-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .input-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .modern-input {
          width: 100%;
          background: transparent !important;
          border: none !important;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.25) !important;
          border-radius: 0 !important;
          padding: 10px 0 !important;
          font-size: 1rem !important;
          font-weight: 400 !important;
          color: #f8fafc !important;
          outline: none !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
          font-family: inherit !important;
        }

        .modern-input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .modern-input:focus {
          border-bottom-color: #38bdf8 !important;
        }

        .modern-textarea {
          resize: none;
          min-height: 80px;
        }

        .submit-btn {
          width: 100%;
          background: #ffffff;
          color: #0f172a;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          margin-top: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .submit-btn:hover {
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* SOCIAL SIDEBAR */
        .social-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 8px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f8fafc;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: #38bdf8;
          background: rgba(255, 255, 255, 0.18);
          border-color: #38bdf8;
          transform: translateX(4px);
        }

        /* MOBILE RESPONSIVE QUERIES */
        @media (max-width: 960px) {
          .contact-wrapper {
            height: auto;
            overflow-y: auto;
            padding: 40px 0;
          }
          .contact-container {
            grid-template-columns: 1fr;
            padding: 20px;
          }
          .lanyard-section {
            height: 400px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 40px;
          }
          .hanging-peg {
            top: 5%;
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