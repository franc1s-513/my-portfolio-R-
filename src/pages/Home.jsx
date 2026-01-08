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
      
      <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
        {/* Primary Action Button */}
        <button style={styles.primaryButton}>
          Let's Talk
        </button>

        {/* Secondary Download Button */}
        <a 
          href="/resume.pdf" 
          download="Francis_Resume.pdf" 
          style={styles.secondaryButton}
        >
          Download CV
        </a>
      </div>
    </div>
  );
};

// This is the part you were missing!
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
  }
};

export default Home;