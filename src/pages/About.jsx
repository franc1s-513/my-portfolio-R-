import React from 'react';
import { motion } from 'framer-motion';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import { GitHubCalendar } from 'react-github-calendar';
import profilePhoto from '../assets/photos/portF.jpeg';
import ProfessionalBackground from '../components/ProfessionalBackground';
import IgnitionButton from '../components/IgnitionButton';
import './About.css';

// -----------------------------------------------------
// 1. HERO: EDITORIAL (PHOTO STAMP)
// -----------------------------------------------------
const EditorialHero = ({ onNavigate }) => {
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
          <p className="editorial-bio">
            Architected and shipped a full-stack AI platform used by over 10,000 students in Tamil Nadu. I focus on building robust, performant systems from database to deployment.
          </p>
          
          <div className="editorial-stack-chips">
            <span className="stack-chip">React</span>
            <span className="stack-chip">Node.js</span>
            <span className="stack-chip">Python</span>
            <span className="stack-chip">FastAPI</span>
            <span className="stack-chip">Machine Learning</span>
          </div>
        </motion.div>

        <motion.div 
          className="editorial-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <IgnitionButton 
            color="gold"
            onClick={() => onNavigate && onNavigate('projects')}
            className="primary-cta-btn"
          >
            View Projects <FiArrowRight />
          </IgnitionButton>

          <div className="editorial-socials-minimal">
            <a href="https://github.com/franc1s-513" target="_blank" rel="noreferrer"><FaGithub size={18}/> GitHub</a>
            <a href="https://linkedin.com/in/francis-fernando-v-bb81a432a" target="_blank" rel="noreferrer"><FaLinkedin size={18}/> LinkedIn</a>
          </div>
        </motion.div>
      </div>

      <div className="editorial-right">
        <motion.div 
          className="photo-stamp"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={profilePhoto} alt="Francis Fernando" />
          <div className="photo-caption">Tamil Nadu</div>
        </motion.div>
      </div>

    </section>
  );
};



// -----------------------------------------------------
// 2. MAGAZINE TIMELINE
// -----------------------------------------------------
const MagazineTimeline = ({ timelineData }) => {
  return (
    <section className="magazine-timeline-section">
      <div className="magazine-section-header">
        <h2 className="magazine-section-title">Academic Journey</h2>
      </div>

      <div className="magazine-timeline-list">
        {/* The solid vertical axis line */}
        <div className="magazine-axis-line"></div>
        
        {timelineData.map((item, idx) => {
          const baseYear = item.year.split("—")[0].trim();
          const yearTop = baseYear.substring(0, 2);
          const yearBottom = baseYear.substring(2, 4);

          return (
            <motion.div 
              key={idx} 
              className="magazine-timeline-row"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
            >
              <div className="magazine-timeline-year-stack">
                <span className="year-top">{yearTop}</span>
                <span className="year-bottom">{yearBottom}</span>
              </div>
              
              <div className="magazine-timeline-content">
                <div className="magazine-timeline-marker">
                  <div className="marker-dot">+</div>
                  <span className="magazine-timeline-status">{item.status}</span>
                  <div className="marker-line"></div>
                </div>
                
                <h3 className="magazine-timeline-title">{item.title}</h3>
                <div className="magazine-timeline-inst">{item.institution}</div>
                <p className="magazine-timeline-desc">{item.detail}</p>
                
                <div className="magazine-timeline-tags">
                  {item.highlights.map((h, hIdx) => (
                    <span key={hIdx}>{h}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="github-calendar-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="github-calendar-title">Open Source Contributions</h3>
        <div className="github-calendar-container">
          <GitHubCalendar 
            username="franc1s-513" 
            colorScheme="light"
            blockSize={14}
            blockMargin={5}
            fontSize={14}
          />
        </div>
      </motion.div>
    </section>
  );
};

// -----------------------------------------------------
// 3. EDITORIAL CONNECT
// -----------------------------------------------------
const EditorialConnect = ({ navLinks, onNavigate }) => {
  return (
    <section className="editorial-connect-section">
      <div className="editorial-connect-container">
        <div className="editorial-connect-header">
          <h2 className="editorial-huge-text">Much More.</h2>
          <p className="editorial-connect-desc">
            Explore featured engineering projects, my journey through tech, and how to get in touch.
          </p>
        </div>

        <div className="editorial-connect-links">
          {navLinks.map((item, idx) => (
            <button 
              key={idx} 
              type="button"
              onClick={() => onNavigate && onNavigate(item.target)}
              className="editorial-connect-link-item"
            >
              <span className="connect-link-label">{item.label}</span>
              <FiArrowRight className="connect-link-arrow" />
            </button>
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
const About = ({ onNavigate }) => {


  const timelineData = [
    {
      year: "2022",
      status: "COMPLETED",
      title: "Secondary School (10th)",
      institution: "St. Joseph's Academy",
      detail: "Completed 10th standard in 2022. Graduated with excellence, sparking a passion for logic, analytical problem solving, and computational engineering.",
      highlights: ["Math Honors", "Analytical Foundations", "Logic"]
    },
    {
      year: "2024",
      status: "COMPLETED",
      title: "Higher Secondary (12th)",
      institution: "Asian Christian Academy",
      detail: "Completed 12th standard in 2024. Focused on Mathematics & Computer Science. Built foundational projects in software architecture and algorithms.",
      highlights: ["CS Major", "Algorithmic Logic", "Web Basics"]
    },
    {
      year: "2024 – 2028",
      status: "CURRENT",
      title: "B.E. Computer Science",
      institution: "KSR College of Engineering",
      detail: "Joined college in 2024. Currently an undergraduate specializing in scalable web systems, AI development, and cloud architecture.",
      highlights: ["Core CS", "Full-Stack Dev", "Machine Learning"]
    }
  ];

  const navLinks = [
    { target: "projects", label: "THE PROJECT" },
    { target: "tech-journey", label: "THE JOURNEY" },
    { target: "contact", label: "CONTACT" }
  ];

  return (
    <div className="about-page-wrapper">
      <ProfessionalBackground />
      <PageTransition direction="up">
        
        <EditorialHero onNavigate={onNavigate} />

        <MagazineTimeline timelineData={timelineData} />
        <EditorialConnect navLinks={navLinks} onNavigate={onNavigate} />

      </PageTransition>
    </div>
  );
};

export default About;
