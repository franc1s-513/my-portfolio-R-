import React from 'react';
import AshenPress from '../components/AshenPress/AshenPress';

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
};

export default Projects;
