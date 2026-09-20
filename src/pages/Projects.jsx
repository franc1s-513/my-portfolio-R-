import React from 'react';
import AshenPress from '../components/AshenPress/AshenPress';
import IgnitionButton from '../components/IgnitionButton';
import { ArrowUpRight, Compass } from 'lucide-react';

const Projects = ({ onNavigate }) => {
  return (
    <div style={styles.pageWrapper}>
      <AshenPress
        style={{
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          borderRadius: 0,
          boxShadow: 'none',
        }}
        onSelectProject={(proj) => {
          console.log('Selected book:', proj);
        }}
        onNavigate={onNavigate}
      />

      {/* Floating Tactical Ignition Quick-Dock */}
      <div style={styles.floatingDock}>
        {onNavigate && (
          <IgnitionButton
            color="gold"
            size="compact"
            onClick={() => onNavigate('tech-journey')}
            title="Explore Tech Journey"
          >
            <span>Tech Journey</span>
            <Compass size={14} />
          </IgnitionButton>
        )}
        {onNavigate && (
          <IgnitionButton
            color="orange"
            size="compact"
            onClick={() => onNavigate('contact')}
            title="Reach out via Contact page"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={14} />
          </IgnitionButton>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    inset: 0,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    background: '#eae2d3',
    zIndex: 10,
  },
  floatingDock: {
    position: 'fixed',
    top: '24px',
    left: 'clamp(20px, 4vw, 36px)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
};

export default Projects;
