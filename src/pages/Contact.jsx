import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact = ({ isDark }) => {
  return (
    <div style={styles.section}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.container}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>Get In <span style={styles.highlight}>Touch</span></h1>
          <p style={styles.subtitle}>Let's build something amazing together.</p>
        </div>

        <div style={styles.content}>
          {/* Left Side: Contact Info */}
          <div style={styles.infoSide}>
            <div style={styles.infoCard}>
              <Mail color="#0ea5e9" size={24} />
              <div>
                <h4 style={styles.infoTitle}>Email</h4>
                <p style={styles.infoText}>yourname@email.com</p>
              </div>
            </div>

            <div style={styles.socialGroup}>
              <a href="#" style={styles.socialIcon}><Github size={24} /></a>
              <a href="#" style={styles.socialIcon}><Linkedin size={24} /></a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form style={{
            ...styles.form,
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.2)',
          }}>
            <div style={styles.inputGroup}>
              <input type="text" placeholder="Your Name" style={styles.input} />
              <input type="email" placeholder="Your Email" style={styles.input} />
            </div>
            <textarea placeholder="Your Message" rows="5" style={styles.textarea}></textarea>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={styles.button}
            >
              Send Message <Send size={18} style={{marginLeft: '10px'}} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    padding: '120px 10% 60px',
    zIndex: 10,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    maxWidth: '1000px',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: { fontSize: '3.5rem', color: '#fff', fontWeight: '800' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.6)', marginTop: '10px' },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '50px',
    alignItems: 'start'
  },
  infoSide: { display: 'flex', flexDirection: 'column', gap: '30px' },
  infoCard: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    color: '#fff'
  },
  infoTitle: { margin: 0, fontSize: '1.1rem' },
  infoText: { margin: 0, color: 'rgba(255,255,255,0.6)' },
  socialGroup: { display: 'flex', gap: '20px', marginTop: '20px' },
  socialIcon: { color: '#fff', opacity: 0.7, transition: '0.3s' },
  form: {
    padding: '40px',
    borderRadius: '30px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  input: {
    flex: 1,
    padding: '15px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    outline: 'none',
    minWidth: '200px'
  },
  textarea: {
    padding: '15px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    outline: 'none',
    resize: 'none'
  },
  button: {
    padding: '15px',
    borderRadius: '12px',
    border: 'none',
    background: '#0ea5e9',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Contact;