const About = () => {
  return (
    <div style={{ padding: '120px 20px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#38bdf8', fontSize: '2.5rem' }}>About Me</h2>
      <p style={{ lineHeight: '1.6', fontSize: '1.2rem', marginTop: '20px' }}>
        I am a passionate React Developer focusing on building clean, 
        user-friendly interfaces. My journey started with a fascination for 
        how the web works, and now I build modern web applications using 
        the latest technologies.
      </p>
      
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#38bdf8' }}>My Skills</h3>
        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', listStyle: 'none', padding: 0 }}>
          <li>🔹 React.js</li>
          <li>🔹 JavaScript (ES6+)</li>
          <li>🔹 CSS Glassmorphism</li>
          <li>🔹 Vite Tooling</li>
        </ul>
      </div>
    </div>
  );
};

export default About;