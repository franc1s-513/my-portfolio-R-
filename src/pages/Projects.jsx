import React from 'react';
import { motion } from 'framer-motion';

const Projects = ({ isDark }) => {
  // Replace these URLs with your actual project screenshots later
  const projectList = [
    {
      id: 1,
      title: "E-Commerce App",
      description: "A full-stack store built with React and Node.js. Features a custom glassmorphism UI and seamless checkout.",
      tags: ["React", "Redux", "Express"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
      link: "#"
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather tracking using OpenWeather API. Features dynamic backgrounds that change with the weather.",
      tags: ["API", "Chart.js", "Framer"],
      image: "https://images.unsplash.com/photo-1592210633469-a257757462d4?auto=format&fit=crop&q=80&w=1000",
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio 1.0",
      description: "My first creative coding experiment focusing on immersive design and fluid animations.",
      tags: ["Three.js", "GSAP", "React"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
      link: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div style={styles.section}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={styles.container}
      >
        {/* Page Header */}
        <motion.div variants={cardVariants} style={styles.header}>
          <h2 style={styles.subtitle}>MY RECENT WORK</h2>
          <h1 style={styles.title}>Creative <span style={styles.highlight}>Projects</span></h1>
        </motion.div>

        {/* Project Grid */}
        <div style={styles.grid}>
          {projectList.map((project) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              style={{
                ...styles.projectCard,
                background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.12)',
                boxShadow: isDark 
                  ? '0 20px 40px rgba(0, 0, 0, 0.5)' 
                  : '0 15px 35px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Image Container */}
              <div style={styles.imageWrapper}>
                <img src={project.image} alt={project.title} style={styles.image} />
                <div style={styles.imageOverlay} />
              </div>

              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectDesc}>{project.description}</p>
              
              <div style={styles.tagGroup}>
                {project.tags.map(tag => (
                  <span key={tag} style={styles.tag}>{tag}</span>
                ))}
              </div>

              <motion.a 
                href={project.link} 
                style={styles.viewLink}
                whileHover={{ x: 5 }}
              >
                View Project 
                <span style={{ marginLeft: '8px' }}>→</span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    padding: '120px 10% 80px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
  },
  header: {
    marginBottom: '60px',
  },
  subtitle: {
    fontSize: '0.9rem',
    letterSpacing: '4px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: '#fff',
    margin: '10px 0',
  },
  highlight: {
    color: '#0ea5e9',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  projectCard: {
    padding: '25px',
    borderRadius: '35px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    borderRadius: '24px',
    overflow: 'hidden',
    marginBottom: '20px',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
  },
  projectTitle: {
    color: '#fff',
    fontSize: '1.6rem',
    fontWeight: '700',
    margin: '10px 0',
  },
  projectDesc: {
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: '1.6',
    fontSize: '0.95rem',
    marginBottom: '20px',
    flexGrow: 1,
  },
  tagGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '25px',
  },
  tag: {
    background: 'rgba(14, 165, 233, 0.15)',
    color: '#7dd3fc',
    padding: '5px 14px',
    borderRadius: '50px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid rgba(14, 165, 233, 0.3)',
  },
  viewLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  }
};

export default Projects;