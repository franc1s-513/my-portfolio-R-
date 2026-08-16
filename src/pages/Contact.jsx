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
      {/* Background Ambient Glows */}
      <div className="ambient-glow-orb orb-top-right" aria-hidden="true" />
      <div className="ambient-glow-orb orb-bottom-left" aria-hidden="true" />

      <div className="contact-grid">

        {/* LEFT: 3D LANYARD INTERACTIVE CARD */}
        <motion.div
          className="lanyard-card-container"
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
                  <label className="input-label" htmlFor="contact-name">
                    <User size={12} />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className="glass-input"
                    placeholder="e.g. Alex Morgan"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="contact-email">
                    <Mail size={12} />
                    <span>Your Email</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className="glass-input"
                    placeholder="alex@company.com"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="contact-message">
                    <MessageSquare size={12} />
                    <span>Project Details</span>
                  </label>
                  <textarea
                    id="contact-message"
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
                  rel="noopener noreferrer"
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
