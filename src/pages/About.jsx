import React, { useRef } from 'react';
import { 
  motion, 
  useScroll,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion';

import { FaJava, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { FiArrowRight, FiMapPin, FiCode, FiCpu } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import profilePhoto from '../assets/photos/profile.jpg';
import './About.css';

// -----------------------------------------------------
// 1. HERO: EDITORIAL (PHOTO STAMP)
// -----------------------------------------------------
const EditorialHero = () => {
  return (
    <section className="editorial-hero-section">
      
      <div className="editorial-left">
        <motion.h1 
          className="editorial-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="title-first">Francis</span>
          <span className="title-last">Fernando</span>
        </motion.h1>
        
        <motion.div 
          className="editorial-bio-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="editorial-greeting">Hello, I'm Francis.</p>
          <p className="editorial-bio">
            I'm a Full-Stack Engineer and AI Developer based in Tamil Nadu, India.
            <br/><br/>
            I architect intelligent web systems and scalable backends. Focused on robust engineering, clean code, and pushing the boundaries of AI integration in modern applications.
          </p>
          
          <div className="editorial-clients">
            Focus areas include: React, Node.js, Python, FastAPI, and Machine Learning algorithms.
          </div>
        </motion.div>

        <motion.div 
          className="editorial-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="https://github.com/franc1s-513" target="_blank" rel="noreferrer">Github</a>
          <a href="https://linkedin.com/in/francis-fernando-v-bb81a432a" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://instagram.com/franc1s._txt" target="_blank" rel="noreferrer">Instagram</a>
        </motion.div>
      </div>

      <div className="editorial-right">
        <motion.div 
          className="photo-stamp"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={profilePhoto} alt="Francis Fernando" />
        </motion.div>
      </div>

    </section>
  );
};



// -----------------------------------------------------
// 2. EDITORIAL TIMELINE
// -----------------------------------------------------
const EditorialTimeline = ({ timelineData }) => {
  return (
    <section className="editorial-timeline-section">
      <div className="editorial-section-header">
        <h2 className="editorial-section-title">Academic Journey</h2>
      </div>

      <div className="editorial-timeline-list">
        {timelineData.map((item, idx) => (
          <motion.div 
            key={idx} 
            className="editorial-timeline-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="editorial-timeline-year">
              {item.year.split("—")[0].trim()}
            </div>
            
            <div className="editorial-timeline-content">
              <div className="editorial-timeline-header">
                <h3 className="editorial-timeline-title">{item.title}</h3>
                <span className="editorial-timeline-status">{item.status}</span>
              </div>
              <div className="editorial-timeline-inst">{item.institution}</div>
              <p className="editorial-timeline-desc">{item.detail}</p>
              
              <div className="editorial-timeline-tags">
                {item.highlights.map((h, hIdx) => (
                  <span key={hIdx}>{h}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// -----------------------------------------------------
// 3. EDITORIAL CONNECT
// -----------------------------------------------------
const EditorialConnect = ({ socialLinks }) => {
  return (
    <section className="editorial-connect-section">
      <div className="editorial-connect-container">
        <div className="editorial-connect-header">
          <h2 className="editorial-huge-text">Let's Talk.</h2>
          <p className="editorial-connect-desc">
            Open for software engineering roles, product design collaborations, and AI partnership opportunities.
          </p>
        </div>

        <div className="editorial-connect-links">
          {socialLinks.map((item, idx) => (
            <a 
              key={idx} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="editorial-connect-link-item"
            >
              <span className="connect-link-label">{item.label}</span>
              <FiArrowRight className="connect-link-arrow" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="editorial-footer-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="pulse-dot" style={{ position: 'relative' }} />
          <span style={{ fontWeight: '700' }}>Available for Engineering Roles</span>
        </div>
        <div className="copyright-text">
          © 2026 Francis Fernando. All rights reserved.
        </div>
      </div>
    </section>
  );
};


// -----------------------------------------------------
// MAIN ABOUT PAGE COMPONENT
// -----------------------------------------------------
const About = () => {


  const timelineData = [
    {
      year: "2024 — 2028",
      status: "CURRENT",
      title: "B.E. Computer Science",
      institution: "KSR College of Engineering",
      detail: "II-Year undergraduate specializing in scalable web systems, AI development, and cloud architecture.",
      highlights: ["Core CS", "Full-Stack Dev", "Machine Learning"]
    },
    {
      year: "2022 — 2024",
      status: "COMPLETED",
      title: "Higher Secondary (HSC)",
      institution: "Asian Christian Academy",
      detail: "Focused on Mathematics & Computer Science. Built foundational projects in software architecture and algorithms.",
      highlights: ["CS Major", "Algorithmic Logic", "Web Basics"]
    },
    {
      year: "2022",
      status: "COMPLETED",
      title: "Secondary School (SSLC)",
      institution: "St. Joseph's Academy",
      detail: "Graduated with excellence, sparking a passion for logic, analytical problem solving, and computational engineering.",
      highlights: ["Math Honors", "Analytical Foundations", "Logic"]
    }
  ];

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/franc1s-513", label: "GITHUB" },
    { Icon: FaLinkedin, url: "https://linkedin.com/in/francis-fernando-v-bb81a432a", label: "LINKEDIN" },
    { Icon: FaInstagram, url: "https://instagram.com/franc1s._txt", label: "INSTAGRAM" },
    { Icon: IoMail, url: "mailto:francisfernandov07@gmail.com", label: "EMAIL" }
  ];

  return (
    <div className="about-page-wrapper">
      <PageTransition direction="up">
        
        <EditorialHero />

        <EditorialTimeline timelineData={timelineData} />
        <EditorialConnect socialLinks={socialLinks} />

      </PageTransition>
    </div>
  );
};

export default About;
