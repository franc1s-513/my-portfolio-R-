import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// Add this CSS to your global styles or inside a <style> tag in your component
const shimmerStyle = `
  @keyframes shimmer {
    0% { transform: translateX(-150%) skewX(-20deg); }
    100% { transform: translateX(150%) skewX(-20deg); }
  }
`;

const ProjectCard = ({ project, index, isMobile }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  return (
    <PageTransition delay={0.1 + (index * 0.05)} direction="up">
      <style>{shimmerStyle}</style>
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
        onMouseMove={(e) => {
          if (isMobile) return;
          const rect = cardRef.current.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        // THE 10/10 UPGRADE: Scaling and specialized shadow
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
        animate={{ 
          y: [0, -12, 0],
          boxShadow: isHovered 
            ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.25)" 
            : "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
          boxShadow: { duration: 0.3 },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        style={{
          ...styles.projectCard,
          gridColumn: !isMobile && project.isFeatured ? "span 1" : "span 1",
          gridRow: !isMobile && project.isFeatured ? "span 2" : "span 1",
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* THE GLINT: A light sweep that appears on hover */}
        {isHovered && !isMobile && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 1.5s infinite',
            zIndex: 2,
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ transform: "translateZ(40px)", display: 'flex', flexDirection: 'column', height: '100%', zIndex: 3 }}>
          <div style={styles.cardHeader}>
            <span style={styles.systemId}>
              {project.status === 'empty' ? '[ SLOT_AVAILABLE ]' : `[ MODULE_${project.id} ]`}
            </span>
            <div style={{
              ...styles.statusDot, 
              backgroundColor: project.status === 'empty' ? 'rgba(255,255,255,0.2)' : '#fff',
              boxShadow: project.status === 'empty' ? 'none' : '0 0 12px #fff'
            }} />
          </div>

          <div style={{
            ...styles.imageContainer,
            height: project.isFeatured ? '300px' : '150px',
            opacity: project.status === 'empty' ? 0.3 : 1,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {project.status !== 'empty' ? (
               <img src={project.image} alt={project.title} style={styles.image} />
            ) : (
               <div style={styles.emptyState}>
                 <span style={styles.emptyText} className="animate-pulse">AWAITING_UPLINK...</span>
               </div>
            )}
          </div>
          
          <div style={styles.contentBox}>
            <h3 style={styles.titleText}>{project.title.toUpperCase()}</h3>
            <p style={styles.descText}>{project.description}</p>
            {project.status !== 'empty' && (
              <motion.a 
                href={project.link} 
                target="_blank"
                style={styles.actionBtn}
                whileHover={{ backgroundColor: '#fff', color: '#0ea5e9', boxShadow: '0 0 20px #fff' }}
              >
                INITIALIZE_CORE →
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

const Projects = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
// WHILE ENTERING THE NEW PROJECTS DO IT HERE!!!!
  const projectList = [
    { id: "KS", title: "Krishi Sakhi", description: "AI-driven agricultural assistant for farmers. Real-time soil and crop intelligence.", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800", link: "https://krishisakhi.streamlit.app/", isFeatured: true, status: 'active' },
    { id: "02", title: "", description: "", status: 'empty' },
    { id: "03", title: "", description: "", status: 'empty' },
    { id: "04", title: "", description: "", status: 'empty' },
    { id: "05", title: "", description: "", status: 'empty' },
    { id: "06", title: "", description: "", status: 'empty' },
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.mainTitleBox}>
          <h2 style={styles.mainTitle}>PROJECT_<span style={{color: '#fff'}}>VALLEY</span></h2>
         
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gridAutoRows: 'minmax(280px, auto)', 
          gap: '30px',
          gridAutoFlow: 'dense'
        }}>
          {projectList.map((p, index) => (
            <ProjectCard key={p.id} project={p} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', padding: '100px 5%', position: 'relative' },
  container: { maxWidth: '1400px', margin: '0 auto' },
  mainTitleBox: { marginBottom: '60px', borderLeft: '5px solid #fff', paddingLeft: '25px' },
  mainTitle: { color: '#fff', fontSize: '2.8rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '2px' },
  subtitle: { color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontFamily: 'monospace', marginTop: '5px' },
  
  projectCard: { 
    background: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: '35px', 
    backdropFilter: 'blur(20px)', 
    padding: '30px',
    transition: 'border 0.4s ease, transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  systemId: { color: '#fff', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '1px' },
  statusDot: { width: '10px', height: '10px', borderRadius: '50%' },
  
  imageContainer: { borderRadius: '22px', overflow: 'hidden', marginBottom: '20px', background: 'rgba(255,255,255,0.03)' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
  
  emptyState: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#fff', fontSize: '11px', letterSpacing: '4px', fontFamily: 'monospace', opacity: 0.7 },
  
  contentBox: { textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  titleText: { color: '#fff', fontSize: '1.6rem', fontWeight: '900', marginBottom: '12px', letterSpacing: '1px' },
  descText: { color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '25px' },
  
  actionBtn: { 
    alignSelf: 'flex-start', 
    padding: '14px 28px', 
    border: '2.5px solid #fff', 
    color: '#fff', 
    borderRadius: '15px', 
    fontSize: '12px', 
    fontFamily: 'monospace', 
    fontWeight: 'bold', 
    textDecoration: 'none', 
    transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
  }
};

export default Projects;