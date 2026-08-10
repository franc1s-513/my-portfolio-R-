import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#020617',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          padding: '20px',
          zIndex: 99999,
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(14, 165, 233, 0.4)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            boxShadow: '0 0 40px rgba(14, 165, 233, 0.2)'
          }}>
            <h2 style={{ color: '#0ea5e9', marginBottom: '16px', fontSize: '1.5rem' }}>
              SYSTEM RECOVERY ACTIVE
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '24px', fontSize: '0.9rem', lineHeight: '1.5' }}>
              An unexpected display glitch occurred while rendering components.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#0ea5e9',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '50px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'
              }}
            >
              RELOAD APPLICATION ↻
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
