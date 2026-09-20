import React, { useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  ArrowUp
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import Lanyard from '../components/Lanyard';
import { PortalFieldCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import IgnitionButton from '../components/IgnitionButton';
import idFront from '../assets/lanyard/id-front.svg';
import './Contact.css';

const connectChannels = [
  {
    id: 'github',
    label: 'GITHUB',
    tag: 'CODE & REPOSITORIES',
    handle: '@franc1s-513',
    url: 'https://github.com/franc1s-513',
    hint: 'Explore open-source systems, AI architectures & full-stack code'
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    tag: 'CAREER & NETWORK',
    handle: 'in/francis-fernando-v',
    url: 'https://linkedin.com/in/francis-fernando-v-bb81a432a',
    hint: 'Professional journey, achievements & engineering updates'
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    tag: 'CREATIVE & LOGS',
    handle: '@franc1s._txt',
    url: 'https://instagram.com/franc1s._txt',
    hint: 'UI/UX experimentation, dev workflow & visual design notes'
  },
  {
    id: 'email',
    label: 'EMAIL',
    tag: 'DIRECT INQUIRIES',
    handle: 'francisfernandov07@gmail.com',
    url: 'mailto:francisfernandov07@gmail.com',
    hint: 'Direct communication for contracts, full-time roles & projects',
    isEmail: true
  }
];

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('IDLE');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) return;

    setStatus('SENDING');
    emailjs.sendForm('service_dxpn5fs', 'template_45eaf39', form.current, 'Mb0nA1eh4ItwUR3EI')
      .then(() => {
        setStatus('SUCCESS');
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        if (form.current) form.current.reset();
        setTimeout(() => setStatus('IDLE'), 5000);
      }, (error) => {
        setStatus('ERROR');
        console.error('EmailJS Error:', error);
        setTimeout(() => setStatus('IDLE'), 5000);
      });
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('francisfernandov07@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="editorial-contact-wrapper">
      {/* ThreeUI Cloud Field Background */}
      <div className="shader-frame">
        <PortalFieldCollection
          variant="cloud-field"
          hue={0}
          saturation={1.00}
          brightness={1.00}
        />
      </div>

      <div className="editorial-contact-container">
        
        {/* Top Header Block */}
        <header className="editorial-top-block">
          <motion.h1 
            className="editorial-main-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact me
          </motion.h1>

          {/* Thin Horizontal Divider Rule with Gold Accent */}
          <div className="editorial-divider-rule" />
        </header>

        {/* Two-Column Layout: 3D Lanyard ID Card on Left, Content on Right */}
        <div className="editorial-columns-row">
          
          {/* LEFT: 3D LANYARD HERO ID CARD */}
          <div className="editorial-left-side lanyard-column">
            <div className="editorial-lanyard-stage">
              <div className="editorial-peg-anchor" aria-hidden="true" />
              <Suspense fallback={<div className="lanyard-skeleton" />}>
                <Lanyard 
                  position={[0, -0.25, 16.2]} 
                  gravity={[0, -25, 0]} 
                  frontImage={idFront} 
                  transparent={true} 
                />
              </Suspense>
              <div className="lanyard-drag-hint">
                <span>PULL &amp; RELEASE TO INTERACT</span>
              </div>
            </div>
          </div>

          {/* RIGHT: SEND A MESSAGE FORM */}
          <div className="editorial-right-side">
            <div className="editorial-heading-row">
              <h2 className="editorial-column-heading">Get In Touch</h2>
            </div>
            
            <p className="editorial-lead-text">
              Have a breakthrough project, an open engineering role, or an ambitious vision in AI? Drop a line below — let’s build something extraordinary together.
            </p>

            <form ref={form} onSubmit={sendEmail} className="editorial-inquiry-form">
              {/* Anti-spam honeypot */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Field: FULL NAME */}
              <div className="editorial-form-group">
                <label className="editorial-mono-label" htmlFor="user_name">FULL NAME *</label>
                <input 
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  autoComplete="name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="editorial-box-input"
                />
              </div>

              {/* Field: EMAIL ADDRESS */}
              <div className="editorial-form-group">
                <label className="editorial-mono-label" htmlFor="user_email">EMAIL ADDRESS *</label>
                <input 
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  autoComplete="email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="editorial-box-input"
                />
              </div>

              {/* Field: SUBJECT */}
              <div className="editorial-form-group">
                <label className="editorial-mono-label" htmlFor="subject">SUBJECT *</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can I help?"
                  className="editorial-box-input"
                />
              </div>

              {/* Field: MESSAGE */}
              <div className="editorial-form-group">
                <label className="editorial-mono-label" htmlFor="message">MESSAGE *</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message..."
                  className="editorial-box-textarea"
                />
              </div>

              {/* Submit Button & Direct HTML Quick Contact */}
              <div className="editorial-submit-wrap">
                <div className="editorial-btn-action-row">
                  <IgnitionButton 
                    type="submit"
                    color="gold"
                    disabled={status === 'SENDING'}
                    className="editorial-dark-btn"
                  >
                    {status === 'SENDING' ? (
                      <span>SENDING...</span>
                    ) : status === 'SUCCESS' ? (
                      <><span>SENT SUCCESSFULLY</span> <Check size={16} /></>
                    ) : (
                      <><span>SEND MESSAGE</span> <ArrowRight size={16} /></>
                    )}
                  </IgnitionButton>

                  <div className="editorial-direct-quick-links">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="editorial-quick-email-btn"
                      title="Click to copy email address"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedEmail ? 'Copied!' : 'Copy email'}</span>
                    </button>
                    <a 
                      href="mailto:francisfernandov07@gmail.com" 
                      className="editorial-quick-icon-link"
                      title="Send email directly"
                    >
                      <Mail size={15} />
                    </a>
                  </div>
                </div>

                <AnimatePresence>
                  {status === 'SUCCESS' && (
                    <motion.span 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="editorial-feedback-text success"
                    >
                      Sent. I&apos;ll reply within 48 hours.
                    </motion.span>
                  )}
                  {status === 'ERROR' && (
                    <motion.span 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="editorial-feedback-text error"
                    >
                      Unable to send automatically. Please email directly at francisfernandov07@gmail.com
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Connect / Direct Channels Section */}
        <section className="contact-connect-section">
          <div className="contact-connect-badge-wrap">
            <span className="contact-connect-pill">
              <span className="contact-pulse-dot" />
              DIRECT CHANNELS
            </span>
          </div>

          <div className="contact-connect-header">
            <h2 className="contact-connect-title">Find me elsewhere.</h2>
            <p className="contact-connect-desc">
              Open for software engineering roles, product design collaborations, and AI partnership opportunities.
            </p>
          </div>

          <div className="contact-connect-links-grid">
            {connectChannels.map((item, idx) => (
              <motion.a
                key={item.id}
                href={item.url}
                target={item.isEmail ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="contact-connect-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact-card-inner">
                  <div className="contact-card-header-row">
                    <span className="contact-card-tag">{item.tag}</span>
                    <span className="contact-card-handle">{item.handle}</span>
                  </div>

                  <div className="contact-card-title-row">
                    <span className="contact-card-huge-label">{item.label}</span>
                    <div className="contact-card-actions-group">
                      {item.isEmail && (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className={`contact-card-copy-pill ${copiedEmail ? 'copied' : ''}`}
                          title="Copy email to clipboard"
                          aria-label="Copy email address"
                        >
                          {copiedEmail ? (
                            <>
                              <Check size={13} />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy Address</span>
                            </>
                          )}
                        </button>
                      )}
                      <div className="contact-card-arrow-circle">
                        <ArrowUpRight size={26} className="contact-card-arrow" />
                      </div>
                    </div>
                  </div>

                  <div className="contact-card-footer-row">
                    <span className="contact-card-hint">{item.hint}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Editorial Footer Status Bar */}
          <footer className="contact-editorial-footer">
            <div className="footer-status-pill">
              <span className="status-indicator-dot" />
              <span className="status-indicator-text">AVAILABLE FOR ENGINEERING ROLES</span>
            </div>

            <div className="footer-meta-block">
              <span className="footer-location">TAMIL NADU, INDIA (IST • UTC+5:30)</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="footer-back-to-top"
                title="Back to top"
              >
                <span>BACK TO TOP</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </footer>
        </section>

      </div>
    </div>
  );
};

export default Contact;
