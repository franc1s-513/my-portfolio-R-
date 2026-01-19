import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import SkyAndBirds from './components/SkyAndBirds';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/navbar';
import PageTransition from './components/PageTransition'; // Imported new component

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';

function App() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* Layer 1: Backgrounds */}
      <SkyAndBirds isDark={isDark} />
      
      {/* Layer 2: UI Elements */}
      <CustomCursor /> 
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      {/* Layer 3: Routing Content */}
      <main style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/projects" element={<Projects isDark={isDark} />} />
            <Route path="/certificates" element={<Certificates isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;