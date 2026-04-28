import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- COMPONENTS ---
import SkyAndBirds from './components/SkyAndBirds';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/navbar';
import WindParticles from './components/WindParticles';
import FloatingAI from './components/FloatingAI'; // The AI we built to connect to Render

// --- PAGES ---
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';

function App() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // --- RENDER BACKEND WAKE-UP ---
  useEffect(() => {
    // This pings your Render URL immediately when the site loads.
    // It prevents the 30-second delay when the user first tries to chat.
    const wakeServer = async () => {
      try {
        await fetch("https://my-ai-backend-vdxv.onrender.com/");
        console.log("Uplink Established: Render Backend is Awake.");
      } catch (error) {
        console.warn("Backend is still spinning up...");
      }
    };
    
    wakeServer();
  }, []);

  return (
   <div style={{ 
  position: 'relative', 
  minHeight: '100vh', 
  width: '100%', 
  overflowX: 'hidden',
  // CHANGE THIS LINE:
  background: 'transparent', 
  transition: 'background-color 0.5s ease'
}}>
      {/* LAYER 1: BACKGROUND (Environmental elements) */}
      <SkyAndBirds isDark={isDark} />
      <WindParticles isDark={isDark} />
      
      {/* LAYER 2: INTERACTIVE OVERLAYS (Cursor & AI toggle) */}
      <CustomCursor /> 
      <FloatingAI /> 
      
      {/* LAYER 3: NAVIGATION */}
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      {/* LAYER 4: MAIN CONTENT (Page Transitions) */}
      <main style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        <AnimatePresence mode="wait">
          {/* 'location' and 'key' are vital. 
            They tell Framer Motion exactly when a page changes 
            so it can trigger the exit and enter animations. 
          */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/projects" element={<Projects isDark={isDark} />} />
            <Route path="/certificates" element={<Certificates isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* OPTIONAL: GLOBAL FOOTER OR SECURITY BADGE */}
      <footer style={footerStyle}>
        <span style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '2px' }}>
          SYSTEM_STATUS: {isDark ? 'NIGHT_MODE_ACTIVE' : 'DAY_LIGHT_ACTIVE'}
        </span>
      </footer>

    </div>
  );
}

// --- MINIMAL GLOBAL STYLES ---
const footerStyle = {
  position: 'fixed',
  bottom: '10px',
  left: '20px',
  zIndex: 5,
  color: 'white',
  fontFamily: 'monospace',
  pointerEvents: 'none'
};

export default App;