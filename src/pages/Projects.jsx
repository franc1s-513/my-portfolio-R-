import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition'; // Ensure path is correct

const ProjectCard = ({ project, isDark, index }) => {
  const cardRef = useRef(null);

  // Elite 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    /* We wrap the card in PageTransition. 
       The delay is calculated based on its index in the list.
    */
    <PageTransition delay={0.6 + (index * 0.15)} direction="up">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        style={{
          ...styles.projectCard,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: isDark 
            ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
            : '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ transform: "translateZ(30px)" }}>
          <div style={styles.imageBox}>
            <img src={project.image} alt={project.title} style={styles.image} />
          </div>
          
          <div style={styles.info}>
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
              View Project →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

const Projects = ({ isDark }) => {
  const projectList = [
    { id: 1, title: "E-Commerce App", description: "Full-stack store with custom glassmorphism UI.", tags: ["React", "Redux"], image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800", link: "#" },
    { id: 2, title: "Weather Dashboard", description: "Real-time tracking with dynamic backgrounds.", tags: ["API", "Framer"], image: "https://images.unsplash.com/photo-1592210633469-a257757462d4?w=800", link: "#" },
    { id: 3, title: "Portfolio 1.0", description: "Creative coding focusing on immersive design.", tags: ["Three.js", "GSAP"], image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800", link: "#" }
  ];

  return (
    <div style={styles.section}>
      <div style={styles.container}>
        
        <div style={styles.header}>
          <PageTransition direction="down" delay={0.2}>
            <h1 style={styles.title}>Creative <span style={styles.highlight}>Projects</span></h1>
          </PageTransition>
          <PageTransition direction="down" delay={0.4}>
            <p style={styles.subtitle}>Recent immersive web experiences</p>
          </PageTransition>
        </div>

        <div style={styles.grid}>
          {projectList.map((p, index) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              isDark={isDark} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  section: { minHeight: '100vh', padding: '120px 10% 60px', zIndex: 10, position: 'relative', perspective: '1200px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { fontSize: '3rem', color: '#fff', fontWeight: '800' },
  highlight: { color: '#0ea5e9' },
  subtitle: { color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', fontSize: '0.9rem', marginTop: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' },
  projectCard: { borderRadius: '20px', padding: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' },
  imageBox: { width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { textAlign: 'left', padding: '0 10px' },
  projectTitle: { color: '#fff', fontSize: '1.4rem', fontWeight: '800', margin: '5px 0' },
  projectDesc: { color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.5' },
  tagGroup: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tag: { padding: '4px 12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50px', fontSize: '0.7rem', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' },
  viewLink: { color: '#fff', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block' }
};

export default Projects;