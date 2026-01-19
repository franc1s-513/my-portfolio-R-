import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';

// REUSABLE ELITE GLASS WRAPPER
const EliteGlassCard = ({ children, isDark, style = {} }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      style={{
        ...styles.glassCard,
        rotateX, rotateY,
        transformStyle: "preserve-3d",
        // PURE ELITE GLASS: Minimal color, high blur
        background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)',
        ...style,
      }}
    >
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
};

const Contact = ({ isDark }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 5000);
      }, () => setStatus('idle'));
  };

  return (
    <div style={styles.section}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Get In <span style={styles.highlight}>Touch</span></h1>
          <p style={styles.subtitle}>Available for elite digital collaborations</p>
        </div>

        <div style={styles.grid}>
          {/* Card 1: Direct Mail */}
          <EliteGlassCard isDark={isDark}>
            <Mail color="#0ea5e9" size={32} />
            <h3 style={styles.cardTitle}>Email</h3>
            <p style={styles.cardText}>yourname@email.com</p>
            <motion.a whileHover={{ x: 5 }} href="mailto:yourname@email.com" style={styles.viewLink}>Send Email →</motion.a>
          </EliteGlassCard>

          {/* Card 2: Social Presence */}
          <EliteGlassCard isDark={isDark}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <Github color="#fff" size={24} />
              <Linkedin color="#fff" size={24} />
            </div>
            <h3 style={styles.cardTitle}>Socials</h3>
            <p style={styles.cardText}>Check my latest commits and posts.</p>
            <motion.a whileHover={{ x: 5 }} href="#" style={styles.viewLink}>Follow →</motion.a>
          </EliteGlassCard>

          {/* Card 3: Form (The Interactive Tile) */}
          <EliteGlassCard isDark={isDark} style={styles.spanMobile}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.success}>
                  <CheckCircle size={40} color="#10b981" />
                  <h3 style={{ color: '#fff', margin: '10px 0' }}>Success</h3>
                </motion.div>
              ) : (
                <form ref={form} onSubmit={sendEmail} style={styles.form}>
                  <div style={styles.formTitleGroup}>
                    <Globe color="#0ea5e9" size={18} />
                    <span style={styles.formLabel}>Direct Message</span>
                  </div>
                  <div style={styles.inputGroup}>
                    <input name="user_name" type="text" placeholder="Name" required style={styles.input} />
                    <input name="user_email" type="email" placeholder="Email" required style={styles.input} />
                  </div>
                  <textarea name="message" placeholder="Project details..." rows="3" required style={styles.textarea}></textarea>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'} 
                    style={styles.button}
                  >
                    {status === 'sending' ? 'Sending...' : 'Transmit'} <Send size={14} style={{ marginLeft: '10px' }} />
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </EliteGlassCard>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: { minHeight: '100vh', padding: '120px 10% 60px', position: 'relative', zIndex: 10, perspective: '1200px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: '900', letterSpacing: '-2px' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.75rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px'
  },
  glassCard: {
    padding: '35px',
    borderRadius: '24px',
    backdropFilter: 'blur(12px) saturate(160%)',
    WebkitBackdropFilter: 'blur(12px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.12)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border 0.3s ease'
  },
  cardTitle: { color: '#fff', fontSize: '1.5rem', margin: '15px 0 8px', fontWeight: '800' },
  cardText: { color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' },
  viewLink: { color: '#0ea5e9', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formTitleGroup: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px' },
  formLabel: { color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' },
  inputGroup: { display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', outline: 'none', fontSize: '0.9rem' },
  textarea: { padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', outline: 'none', resize: 'none', fontSize: '0.9rem' },
  button: { padding: '14px', borderRadius: '12px', border: 'none', background: '#0ea5e9', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)' },
  success: { textAlign: 'center', padding: '20px 0' }
};

export default Contact;