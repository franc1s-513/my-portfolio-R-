import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkyAndBirds from './components/WindParticles'; 
import CustomCursor from './components/CustomCursor';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About'; // 1. IMPORT YOUR ABOUT PAGE

function App() {
  return (
    <Router>
      {/* Background and UI layers */}
      <SkyAndBirds /> 
      <CustomCursor /> 
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* 2. ADD THIS ROUTE FOR THE ABOUT PAGE */}
        <Route path="/about" element={<About />} />
        
        {/* You can add more routes here as you build them */}
      </Routes>
    </Router>
  );
}

export default App;