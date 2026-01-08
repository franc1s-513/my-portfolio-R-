const Contact = () => {
  return (
    <div style={{ padding: '120px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 20px 50px rgba(56, 189, 248, 0.15)',
        width: '100%',
        maxWidth: '500px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#0ea5e9', marginBottom: '10px' }}>Get In Touch</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Have a project in mind? Let's build something great together.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Your Name" style={styles.input} />
          <input type="email" placeholder="Your Email" style={styles.input} />
          <textarea placeholder="Your Message" rows="5" style={styles.input}></textarea>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  input: {
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    transition: '0.3s'
  },
  button: {
    padding: '15px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#0ea5e9',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
  }
};

export default Contact;