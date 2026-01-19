import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WindParticles from './components/WindParticles'; 
import SkyAndBirds from './components/SkyAndBirds'; // Ensure the name matches your file
import CustomCursor from './components/CustomCursor';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
        
        {/* Layer 1: Backgrounds (Fixed and behind everything) */}
        
        <SkyAndBirds isDark={isDark} />
        
        {/* Layer 2: UI (Fixed on top) */}
        <CustomCursor /> 
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        
        {/* Layer 3: Routing Content (Relative and above backgrounds) */}
       {/* Layer 3: Routing Content */}
        <main style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
            <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            {/* Add placeholders for missing routes to avoid blank screens */}
            <Route path="/projects" element={<Projects isDark={isDark} />} />
            <Route path="/certificates" element={<Certificates isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;