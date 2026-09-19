import React from 'react';
import AshenPress from '../components/AshenPress/AshenPress';

const Projects = () => {
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
    background: '#c6ae8e',
    zIndex: 10,
  },
};

export default Projects;
