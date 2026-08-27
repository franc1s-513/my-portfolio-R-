import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiMongodb,
  SiGit,
  SiCplusplus,
  SiFramer,
  SiThreedotjs,
  SiFastapi
} from 'react-icons/si';
import { FaJava, FaGithub, FaLinkedin, FaInstagram, FaCode, FaRocket } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import {
  FiCompass,
  FiCpu,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
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
    { name: "React", Icon: SiReact },
    { name: "Three.js", Icon: SiThreedotjs },
    { name: "Node.js", Icon: SiNodedotjs },
    { name: "Python", Icon: SiPython },
    { name: "Framer Motion", Icon: SiFramer },
    { name: "TailwindCSS", Icon: SiTailwindcss },
    { name: "MongoDB", Icon: SiMongodb },
    { name: "FastAPI", Icon: SiFastapi },
    { name: "Git", Icon: SiGit },
    { name: "C++", Icon: SiCplusplus },
    { name: "Java", Icon: FaJava }
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
    { label: "Education", value: "B.E. Computer Science" },
    { label: "Discipline", value: "Full-Stack Engineering" },
    { label: "Focus", value: "Web & 3D Applications" },
    { label: "Location", value: "Tamil Nadu, India" }
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
              I am <b>Francis Fernando</b>, a computer science engineer and full-stack software builder based in Tamil Nadu. I turn complex, real-world workflows into high-performance web applications, interactive 3D experiences, and cleanly-architected digital tools — with a focus on performance, accessibility, and maintainability.
            </p>

            <div className="hero-roles-row">
              {["Full-Stack Developer", "3D Web Engineer", "Systems Thinker"].map((role) => (
                <span key={role} className="hero-role-chip">
                  <FiCheckCircle size={12} color="#0ea5e9" />
                  <span>{role}</span>
                </span>
              ))}
            </div>

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
                  <span>Full-Stack Developer</span>
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
                <h3 className="bento-title">A Foundation in Engineering</h3>
                <p className="bento-body">
                  My path to software began with an early curiosity for electronics and programming. That foundation grew into a structured, problem-solving mindset that I now apply to every system I build.
                </p>
              </div>
              <div className="bento-footer">
                <FiMapPin size={13} color="#0ea5e9" />
                <span>Hosur, Tamil Nadu</span>
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
                <h3 className="bento-title">From Graphics to Full-Stack</h3>
                <p className="bento-body">
                  A deep interest in computer graphics led me to explore JavaScript engines, modern frameworks, and real-time rendering. This evolved into a full-stack practice spanning backend systems and interactive 3D interfaces.
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
                <h3 className="bento-title">High-Impact, Maintainable Systems</h3>
                <p className="bento-body">
                  I build clean, modular backends paired with responsive, high-performance frontends. My goal is software that is reliable, scalable, and a genuine pleasure to use.
                </p>
              </div>
              <div className="bento-footer">
                <FaRocket size={13} color="#0ea5e9" />
                <span>Reliable, Scalable Solutions</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LOGO LOOP MARQUEE */}
        <section style={{ marginBottom: 'var(--space-section)' }}>
          <div style={{ overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <LogoLoop
              logos={techStack.map(({ name, Icon }) => ({
                node: (
                  <div className="logo-loop-item">
                    <Icon size={22} color="#0ea5e9" />
                    <span>{name}</span>
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

        {/* ACADEMIC JOURNEY TIMELINE */}
        <section style={{ marginBottom: 'var(--space-section)' }}>
          <div className="section-title-wrap">
            <div className="section-label">03 / Academic Journey</div>
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
              <div className="section-label" style={{ marginBottom: '8px' }}>04 / Next Step</div>
              <h3 className="cta-heading">Let's build something together.</h3>
              <p className="cta-sub">Explore my production projects, or reach out to start a conversation about your next product.</p>
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
