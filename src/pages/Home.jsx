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
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>
        Hi, I'm <span style={{ color: '#38bdf8' }}>Francis</span>
      </h1>
      <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>
        Full-Stack Developer & UI Designer
      </p>
      
      <button style={{
        marginTop: '30px',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#38bdf8',
        color: '#0f172a',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        View My Work
      </button>
    </div>
  );
};

export default Home;