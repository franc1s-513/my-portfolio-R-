import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiMongodb,
  SiGit,
  SiCplusplus,
  SiFramer,
  SiThreedotjs,
  SiFastapi,
  SiDocker
} from 'react-icons/si';
import { FaJava, FaGithub, FaLinkedin, FaInstagram, FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import {
  FiExternalLink,
  FiCompass,
  FiCpu,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
  FiTerminal,
  FiAward,
  FiMapPin
} from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import LogoLoop from '../components/LogoLoop';
import profilePhoto from '../assets/photos/profile.jpg';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const techStack = [
    "React", "Three.js", "Node.js", "Python", "Framer Motion",
    "TailwindCSS", "MongoDB", "FastAPI", "Git", "C++", "Java"
  ];

  const skillDomains = [
    {
      category: "Frontend & 3D Web",
      icon: <SiReact size={18} color="#0ea5e9" />,
      skills: ["React 19", "Three.js / R3F", "Framer Motion", "TailwindCSS", "WebGL Shaders"]
    },
    {
      category: "Backend & Databases",
      icon: <SiNodedotjs size={18} color="#22c55e" />,
      skills: ["Node.js", "FastAPI", "Python", "MongoDB", "RESTful Architecture"]
    },
    {
      category: "DevOps & Cloud Tools",
      icon: <SiDocker size={18} color="#0ea5e9" />,
      skills: ["Git / GitHub", "Docker", "Linux", "Vite", "CI / CD Pipelines"]
    }
  ];

  const timelineData = [
    {
      year: "2024 — 2028",
      status: "CURRENT",
      title: "B.E. Computer Science & Engineering",
      institution: "KSR College of Engineering",
      detail: "II-Year undergraduate specializing in scalable web systems, interactive 3D visualization, and cloud-native software architecture.",
      highlights: ["Core CS Foundations", "Full-Stack Development", "Software Architecture"]
    },
    {
      year: "2022 — 2024",
      status: "COMPLETED",
      title: "Higher Secondary Education (HSC)",
      institution: "Asian Christian Academy",
      detail: "Focused on Mathematics & Computer Science. Built foundational projects in software architecture and algorithms.",
      highlights: ["Computer Science Major", "Algorithmic Logic", "Web Basics"]
    },
    {
      year: "2022",
      status: "COMPLETED",
      title: "Secondary School Education (SSLC)",
      institution: "St. Joseph's Academy",
      detail: "Graduated with excellence, sparking a passion for logic, analytical problem solving, and computational engineering.",
      highlights: ["Mathematics Honors", "Analytical Foundations"]
    }
  ];

  const stats = [
    { label: "Engineering Track", value: "B.E. CSE" },
    { label: "Core Focus", value: "Full-Stack & Systems" },
    { label: "Performance Goal", value: "60+ FPS Polish" },
    { label: "Location", value: "Tamil Nadu, IN" }
  ];

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/franc1s-513", label: "GITHUB" },
    { Icon: FaLinkedin, url: "https://linkedin.com/in/francis-fernando-v-bb81a432a", label: "LINKEDIN" },
    { Icon: FaInstagram, url: "https://instagram.com/franc1s._txt", label: "INSTAGRAM" },
    { Icon: IoMail, url: "mailto:francisfernandov07@gmail.com", label: "EMAIL" }
  ];

  return (
    <div className="about-page-wrapper" ref={containerRef}>
      <PageTransition direction="up">

        {/* HERO BIO SHOWCASE */}
        <motion.section
          className="hero-bio-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-bio-left">
            <div className="badge-pill">
              <FaCode size={13} />
              <span>01 / Profile & Persona</span>
            </div>

            <h1 className="hero-main-title">
              Engineering the <span className="hero-highlight">logic</span> behind the interface.
            </h1>

            <p className="hero-bio-paragraph">
              I am <b>Francis Fernando</b>, an engineering student and full-stack software builder based in Tamil Nadu. I specialize in turning complex system workflows into high-performance web applications, interactive 3D landscapes, and intuitive digital tools.
            </p>

            <div className="stats-grid">
              {stats.map((s, idx) => (
                <div key={idx} className="stat-card">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-bio-right">
            <div className="profile-frame-wrap">
              <img src={profilePhoto} alt="Francis Fernando" className="profile-img-element" />
              <div className="profile-float-tag">
                <div className="float-tag-left">
                  <div className="live-dot" aria-hidden="true" />
                  <span>Building Software</span>
                </div>
                <FiMapPin size={14} color="#38bdf8" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* BENTO BIO TRILOGY */}
        <section style={{ marginBottom: 'var(--space-section)' }}>
          <div className="section-title-wrap">
            <div className="section-label">02 / Narrative Trilogy</div>
            <h2 className="section-title">The Engineering Story</h2>
          </div>

          <div className="bento-grid">
            <motion.div
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div className="bento-card-header">
                  <span className="bento-step-pill">01 / ORIGIN</span>
                  <div className="bento-icon-wrap">
                    <FiCompass size={20} />
                  </div>
                </div>
                <h3 className="bento-title">Roots in Hosur</h3>
                <p className="bento-body">
                  Growing up in Hosur, curiosity was my primary compass. From early experiments with electronics to taking apart computer programs, I learned that failure is just raw data for a comeback.
                </p>
              </div>
              <div className="bento-footer">
                <FiMapPin size={13} color="#0ea5e9" />
                <span>Hosur, Tamil Nadu <time dateTime="2006">Est. 2006</time></span>
              </div>
            </motion.div>

            <motion.div
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <div className="bento-card-header">
                  <span className="bento-step-pill">02 / EVOLUTION</span>
                  <div className="bento-icon-wrap">
                    <FiCpu size={20} />
                  </div>
                </div>
                <h3 className="bento-title">Gaming to Full-Stack</h3>
                <p className="bento-body">
                  Intense gaming sessions uncovered my fascination for computer graphics and interactive responsiveness. That curiosity evolved into mastering JavaScript engines, full-stack frameworks, and 3D shaders.
                </p>
              </div>
              <div className="bento-footer">
                <FiLayers size={13} color="#0ea5e9" />
                <span>Full-Stack & 3D Interactive Web</span>
              </div>
            </motion.div>

            <motion.div
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <div className="bento-card-header">
                  <span className="bento-step-pill">03 / MISSION</span>
                  <div className="bento-icon-wrap">
                    <FiTarget size={20} />
                  </div>
                </div>
                <h3 className="bento-title">High-Impact Engineering</h3>
                <p className="bento-body">
                  Solving complex architectural challenges by pairing clean, modular backend pipelines with visceral, butter-smooth frontend interfaces that leave a lasting impression.
                </p>
              </div>
              <div className="bento-footer">
                <FaRocket size={13} color="#0ea5e9" />
                <span>Zero-Lag Scalable Solutions</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LOGO LOOP MARQUEE */}
        <section style={{ marginBottom: 'var(--space-section)' }}>
          <div style={{ overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <LogoLoop
              logos={techStack.map((tech) => ({
                node: (
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    color: 'rgba(8, 12, 62, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span>{tech}</span>
                  </div>
                )
              }))}
              speed={55}
              direction="left"
              logoHeight={40}
              gap={50}
              hoverSpeed={15}
            />
          </div>
        </section>

        {/* SKILLS MATRIX */}
        <section style={{ marginBottom: 'var(--space-section)' }}>
          <div className="section-title-wrap">
            <div className="section-label">03 / Technical Matrix</div>
            <h2 className="section-title">Core Competencies</h2>
          </div>

          <div className="skills-matrix-grid">
            {skillDomains.map((domain, idx) => (
              <motion.div
                key={idx}
                className="domain-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="domain-header">
                  {domain.icon}
                  <h3 className="domain-title">{domain.category}</h3>
                </div>
                <div className="chips-wrap">
                  {domain.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-chip-item">
                      <FiCheckCircle size={11} color="#0ea5e9" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ACADEMIC JOURNEY TIMELINE */}
        <section style={{ marginBottom: 'var(--space-section)' }}>
          <div className="section-title-wrap">
            <div className="section-label">04 / Academic Journey</div>
            <h2 className="section-title">Education & Milestones</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line-base" aria-hidden="true" />
            <motion.div className="timeline-line-active" style={{ scaleY }} />

            {timelineData.map((item, idx) => (
              <motion.div
                key={idx}
                className="timeline-item-row"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="timeline-dot-pin" aria-hidden="true" />
                <div className="timeline-content-card">
                  <div className="timeline-top-meta">
                    <span className="timeline-year-text">{item.year}</span>
                    <span className="timeline-status-badge">{item.status}</span>
                  </div>
                  <h3 className="timeline-degree-title">{item.title}</h3>
                  <div className="timeline-institution-text">{item.institution}</div>
                  <p className="timeline-description">{item.detail}</p>
                  <div className="timeline-highlights-row">
                    {item.highlights.map((h, hIdx) => (
                      <span key={hIdx} className="highlight-chip">
                        <FiAward size={11} />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section>
          <div className="bottom-cta-banner">
            <div>
              <h3 className="cta-heading">Want to see these skills in action?</h3>
              <p className="cta-sub">Explore deployed production projects or initiate a project conversation.</p>
            </div>
            <div className="cta-button-group">
              <button
                onClick={() => navigate('/projects')}
                className="cta-btn-primary"
              >
                <span>Explore Works</span>
                <FiArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM STATUS BAR */}
        <div className="bottom-status-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="live-dot" aria-hidden="true" />
            <span style={{ fontWeight: '700' }}>Available for Engineering Roles & Projects</span>
          </div>

          <div className="socials-cluster">
            {socialLinks.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="social-link-node">
                <item.Icon size={14} />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

      </PageTransition>
    </div>
  );
};

export default About;
