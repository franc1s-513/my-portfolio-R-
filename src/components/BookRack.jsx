import React from 'react';
import { motion } from 'framer-motion';

const BookRack = () => {
  const library = [
    { 
      title: "Ikigai", 
      cover: "/books/ikigai.jpg", // The "/" is very important!
      color: "#87ceeb", 
      tag: "Purpose" 
    },
    { 
      title: "Atomic Habits", 
      cover: "/books/atomic.jpg", 
      color: "#f59e0b", 
      tag: "Systems" 
    },
    { 
      title: "Fullmetal Alchemist", 
      cover: "/books/fma.jpg", 
      color: "#ef4444", 
      tag: "Philosophy" 
    }
  
  ];

  return (
    <section style={styles.rackSection}>
      <p style={styles.mono}>// KNOWLEDGE_ARCHIVE.LOG</p>
      
      <div style={styles.rackContainer}>
        {/* THE SHELF BASE - Now aligned to start from left */}
        <div style={styles.shelfRail}>
            <div style={styles.railGlow} />
        </div>

        <div style={styles.bookWrapper}>
          {library.map((book, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -45, 
                rotateY: -20,
                z: 50,
                transition: { type: "spring", stiffness: 200 }
              }}
              style={styles.bookCard}
            >
              <div 
                style={{
                  ...styles.coverImage, 
                  backgroundColor: book.color,
                  backgroundImage: `url(${book.cover})`
                }} 
              >
                <div style={styles.bindingLine} />
                <div style={styles.coverOverlay}>
                    <div style={{...styles.tag, background: book.color}}>{book.tag}</div>
                </div>
              </div>

              <div style={styles.pageThickness} />
              <div style={styles.reflection} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  rackSection: { 
    padding: '80px 0', 
    position: 'relative', 
    overflow: 'visible',
    width: '100%' 
  },
  mono: { 
    fontFamily: 'monospace', 
    fontSize: '0.7rem', 
    color: '#0ea5e9', 
    letterSpacing: '4px', 
    marginBottom: '40px',
    textAlign: 'left' // Explicitly left
  },
  
  rackContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start', // THE FIX: Aligns books to the left
    perspective: '1200px',
    paddingBottom: '60px',
    paddingLeft: '10px' // Small breathing room from the left edge
  },

  shelfRail: {
    position: 'absolute',
    bottom: '40px',
    width: '100%', // Stretch across
    left: 0,
    height: '2px',
    // Gradient starts strong on the left and fades out to the right
    background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.8) 0%, rgba(14, 165, 233, 0.1) 80%, transparent 100%)',
    zIndex: 1
  },

  railGlow: {
    position: 'absolute',
    inset: 0,
    boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)',
  },

  bookWrapper: {
    display: 'flex',
    gap: '25px', // Increased gap for a cleaner look when left-aligned
    zIndex: 2,
    transformStyle: 'preserve-3d',
    flexWrap: 'wrap',
    justifyContent: 'flex-start' // Ensure the inner wrapper stays left
  },

  bookCard: {
    width: '140px',
    height: '210px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    cursor: 'pointer',
  },

  coverImage: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '2px 8px 8px 2px',
    position: 'relative',
    zIndex: 3,
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '10px 10px 20px rgba(0,0,0,0.5)'
  },
  
  bindingLine: { position: 'absolute', left: '8px', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)' },
  pageThickness: {
    position: 'absolute',
    top: '2%',
    right: '-8px',
    width: '15px',
    height: '96%',
    background: '#e0e0e0',
    transform: 'rotateY(90deg)',
    transformOrigin: 'left',
    zIndex: 2,
    backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.05) 3px)'
  },
  coverOverlay: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 40%)' },
  tag: { fontSize: '0.6rem', fontFamily: 'monospace', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: '900' },
  reflection: { position: 'absolute', bottom: '-25px', width: '100%', height: '20px', background: 'rgba(0,0,0,0.4)', filter: 'blur(12px)', transform: 'rotateX(90deg) scale(0.8)', pointerEvents: 'none' }
};

export default BookRack;