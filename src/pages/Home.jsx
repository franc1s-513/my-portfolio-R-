import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px', color: '#0f172a' }}>
        Hi, I'm <span style={{ color: '#0ea5e9' }}>Francis</span>
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#64748b' }}>
        Full-Stack Developer & UI Designer
      </p>
      
      {/* Button Row */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
        <button style={styles.primaryButton}>
          Let's Talk
        </button>

        <a 
          href="/resume.pdf" 
          download="Francis_Resume.pdf" 
          style={styles.secondaryButton}
        >
          Download CV
        </a>
      </div>

      {/* Social Icons Row */}
      <div style={{ display: 'flex', gap: '25px', marginTop: '40px' }}>
        <a href="https://github.com/your-username" target="_blank" rel="noreferrer" style={styles.socialLink}>
          <Github size={28} />
        </a>
        <a href="https://linkedin.com/in/your-username" target="_blank" rel="noreferrer" style={styles.socialLink}>
          <Linkedin size={28} />
        </a>
        <a href="https://instagram.com/your-username" target="_blank" rel="noreferrer" style={styles.socialLink}>
          <Instagram size={28} />
        </a>
      </div>
    </div>
  );
};

const styles = {
  primaryButton: {
    padding: '12px 30px',
    backgroundColor: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(14, 165, 233, 0.4)',
    textDecoration: 'none',
    transition: '0.3s'
  },
  secondaryButton: {
    padding: '12px 30px',
    backgroundColor: 'transparent',
    color: '#0ea5e9',
    border: '2px solid #0ea5e9',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: '0.3s'
  },
  socialLink: {
    color: '#64748b',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Home;