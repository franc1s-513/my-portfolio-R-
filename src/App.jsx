import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SkyAndBirds from './components/SkyAndBirds'; 
import CustomCursor from './components/CustomCursor';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';

// Helper to reset scroll position on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <ScrollToTop />
      
      {/* Layer 1: Backgrounds */}
      <SkyAndBirds isDark={isDark} />
      
      {/* Layer 2: UI Elements */}
      <CustomCursor /> 
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      {/* Layer 3: Animated Routing Content */}
      <main style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageWrapper>
                <Home isDark={isDark} />
              </PageWrapper>
            } />
            <Route path="/about" element={
              <PageWrapper>
                <About isDark={isDark} />
              </PageWrapper>
            } />
            <Route path="/projects" element={
              <PageWrapper>
                <Projects isDark={isDark} />
              </PageWrapper>
            } />
            <Route path="/certificates" element={
              <PageWrapper>
                <Certificates isDark={isDark} />
              </PageWrapper>
            } />
            <Route path="/contact" element={
              <PageWrapper>
                <Contact isDark={isDark} />
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Global Transition Setting for all pages
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] // Custom Cubic Bezier for "premium" feel
    }}
  >
    {children}
  </motion.div>
);

export default App;