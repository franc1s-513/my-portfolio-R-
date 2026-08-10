import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { projectsData } from '../data/projectsData';
import PageTransition from '../components/PageTransition';
import { FaGithub } from 'react-icons/fa6';
import { FiExternalLink, FiSearch, FiArrowLeft } from 'react-icons/fi';
import GlareHover from '../components/GlareHover';

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
        id={`project-card-${index}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
        onMouseMove={(e) => {
          if (isMobile) return;
          const rect = cardRef.current.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
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
          gridColumn: !isMobile && project.featured ? "span 1" : "span 1",
          gridRow: !isMobile && project.featured ? "span 2" : "span 1",
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
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
              backgroundColor: project.status === 'empty' ? 'rgba(255,255,255,0.2)' : '#22c55e',
              boxShadow: project.status === 'empty' ? 'none' : '0 0 12px #22c55e'
            }} />
          </div>

          <div style={{
            ...styles.imageContainer,
            height: project.featured ? '280px' : '180px',
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
            <div>
              <h3 style={styles.titleText}>{project.title.toUpperCase()}</h3>
              <p style={styles.descText}>{project.fullDescription || project.description}</p>
              {project.tags && (
                <div style={styles.tagRow}>
                  {project.tags.map((t, idx) => (
                    <span key={idx} style={styles.tag}>{t}</span>
                  ))}
                </div>
              )}
            </div>
            {project.status !== 'empty' && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <GlareHover borderRadius="6px">
                  <motion.a 
                    id={index === 0 ? "first-live-demo-btn" : undefined}
                    href={project.link} 
                    target="_blank"
                    rel="noreferrer"
                    style={styles.actionBtn}
                    whileHover={{ backgroundColor: '#fff', color: '#0ea5e9', boxShadow: '0 0 20px #fff' }}
                  >
                    LIVE_DEMO <FiExternalLink size={14} />
                  </motion.a>
                </GlareHover>
                {project.github && (
                  <GlareHover borderRadius="6px">
                    <motion.a 
                      href={project.github} 
                      target="_blank"
                      rel="noreferrer"
                      style={styles.githubBtn}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#fff' }}
                    >
                      <FaGithub size={15} /> CODE
                    </motion.a>
                  </GlareHover>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

const Projects = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', 'AI / ML', 'Web Dev', 'DevOps / Cloud'];
  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.fullDescription && p.fullDescription.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Back to Home & Title */}
        <div style={styles.topBar}>
          <GlareHover borderRadius="50px">
            <motion.button
              onClick={() => {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={styles.backBtn}
              whileHover={{ scale: 1.05, x: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft size={18} /> BACK TO HOME
            </motion.button>
          </GlareHover>
        </div>

        <div style={styles.mainTitleBox}>
          <h2 style={styles.mainTitle}>ALL_<span style={{color: '#fff'}}>PROJECTS</span></h2>
          <p style={styles.subtitle}>COMPLETE DIRECTORY OF DEVELOPED SYSTEMS AND ARCHITECTURES</p>
        </div>

        {/* Filter Controls (Search + Category Buttons) */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '20px', marginBottom: '40px' }}>
          {/* Category Filter Buttons */}
          <div style={styles.filterRow}>
            {categories.map((cat, i) => (
              <GlareHover key={i} borderRadius="50px">
                <motion.button
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    ...styles.filterBtn,
                    backgroundColor: activeCategory === cat ? '#0ea5e9' : 'rgba(255,255,255,0.05)',
                    borderColor: activeCategory === cat ? '#0ea5e9' : 'rgba(255,255,255,0.2)',
                    color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.7)',
                    boxShadow: activeCategory === cat ? '0 0 20px rgba(14,165,233,0.4)' : 'none',
                  }}
                  whileHover={{ scale: 1.05, borderColor: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.toUpperCase()}
                </motion.button>
              </GlareHover>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '280px' }}>
            <FiSearch size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
            <input
              type="text"
              placeholder="SEARCH MODULES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                outline: 'none',
                backdropFilter: 'blur(10px)',
                boxShadow: searchQuery ? '0 0 15px rgba(14,165,233,0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Grid of Projects */}
        {filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gridAutoRows: 'minmax(280px, auto)', 
            gap: '30px',
            gridAutoFlow: 'dense'
          }}>
            {filteredProjects.map((p, index) => (
              <ProjectCard key={p.id} project={p} index={index} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: '1rem', margin: 0 }}>
              NO MODULES FOUND MATCHING "{searchQuery.toUpperCase()}"
            </p>
          </div>
        )}

        {/* Bottom Back to Home */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <GlareHover borderRadius="50px">
            <motion.button
              onClick={() => {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={styles.backBtnBottom}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft size={18} /> RETURN TO INDEX
            </motion.button>
          </GlareHover>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', padding: '100px 5% 80px', position: 'relative' },
  container: { maxWidth: '1400px', margin: '0 auto' },
  topBar: { marginBottom: '30px' },
  backBtn: { padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: '0.3s' },
  backBtnBottom: { padding: '14px 32px', borderRadius: '50px', border: '2px solid #fff', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  mainTitleBox: { marginBottom: '40px', borderLeft: '5px solid #fff', paddingLeft: '25px' },
  mainTitle: { color: '#fff', fontSize: '2.8rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '2px' },
  subtitle: { color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontFamily: 'monospace', marginTop: '5px' },
  filterRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' },
  filterBtn: { padding: '10px 22px', borderRadius: '50px', border: '1px solid', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' },
  
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
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  systemId: { color: '#fff', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '1px' },
  statusDot: { width: '10px', height: '10px', borderRadius: '50%' },
  
  imageContainer: { borderRadius: '22px', overflow: 'hidden', marginBottom: '20px', background: 'rgba(255,255,255,0.03)' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
  
  emptyState: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#fff', fontSize: '11px', letterSpacing: '4px', fontFamily: 'monospace', opacity: 0.7 },
  
  contentBox: { textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  titleText: { color: '#fff', fontSize: '1.6rem', fontWeight: '900', marginBottom: '12px', letterSpacing: '1px' },
  descText: { color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' },
  tagRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' },
  tag: { padding: '5px 14px', borderRadius: '50px', background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.35)', color: '#38bdf8', fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: '700' },
  
  actionBtn: { 
    alignSelf: 'flex-start', 
    padding: '12px 22px', 
    border: '2px solid #fff', 
    color: '#fff', 
    borderRadius: '15px', 
    fontSize: '11px', 
    fontFamily: 'monospace', 
    fontWeight: 'bold', 
    textDecoration: 'none', 
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
  },
  githubBtn: {
    alignSelf: 'flex-start', 
    padding: '12px 20px', 
    border: '1px solid rgba(255,255,255,0.3)', 
    background: 'rgba(255,255,255,0.06)',
    color: '#fff', 
    borderRadius: '15px', 
    fontSize: '11px', 
    fontFamily: 'monospace', 
    fontWeight: 'bold', 
    textDecoration: 'none', 
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: '0.3s'
  }
};

export default Projects;