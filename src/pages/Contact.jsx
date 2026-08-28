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
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('IDLE');
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
      <div className="editorial-contact-grid">
        {/* LEFT: 3D LANYARD INTERACTIVE CARD */}
        <motion.div
          className="lanyard-editorial-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hanging-peg" aria-hidden="true" />
          <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={idFront} transparent={true} />
          </Suspense>
        </motion.div>

        {/* RIGHT: CONTENT & FORM */}
        <motion.div
          className="editorial-contact-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* HEADER */}
          <div className="editorial-contact-header">
            <h1 className="contact-editorial-title">Let's engineer<br/>something iconic.</h1>
          </div>

          <div className="editorial-form-wrapper">
              <form ref={form} onSubmit={sendEmail} className="editorial-form">
                <div className="editorial-input-group">
                  <label className="editorial-label" htmlFor="contact-name">Y O U R &nbsp;&nbsp; N A M E</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className="editorial-input"
                    placeholder="Alex Morgan"
                    required
                  />
                </div>

                <div className="editorial-input-group">
                  <label className="editorial-label" htmlFor="contact-email">Y O U R &nbsp;&nbsp; E M A I L</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className="editorial-input"
                    placeholder="alex@company.com"
                    required
                  />
                </div>

                <div className="editorial-input-group">
                  <label className="editorial-label" htmlFor="contact-message">P R O J E C T &nbsp;&nbsp; D E T A I L S</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="editorial-input editorial-textarea"
                    placeholder="Tell me about your goals..."
                    required
                  />
                </div>

                <div className="editorial-submit-row">
                  <button
                    type="submit"
                    disabled={status === 'SENDING'}
                    className="editorial-submit-btn"
                  >
                    {status === 'SENDING'
                      ? 'SENDING...'
                      : status === 'SUCCESS'
                      ? 'DISPATCHED'
                      : 'SEND MESSAGE'}
                    {status === 'SUCCESS' ? <Check size={16} /> : <Send size={15} className="send-icon" />}
                  </button>

                  {/* STATUS FEEDBACK */}
                  <AnimatePresence>
                    {status === 'SUCCESS' && (
                      <motion.div
                        className="editorial-status-msg success"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Message received.
                      </motion.div>
                    )}
                    {status === 'ERROR' && (
                      <motion.div
                        className="editorial-status-msg error"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Error. Try email.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
          </div>

          <div className="editorial-socials-list">
             {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-social-row"
                >
                  <span className="editorial-social-name">{s.name}</span>
                  <div className="editorial-social-right">
                     <span className="editorial-social-handle">{s.handle}</span>
                     <ArrowUpRight size={20} className="editorial-social-arrow" />
                  </div>
                </a>
              ))}
          </div>
          
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
