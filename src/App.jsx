import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkyAndBirds from './components/WindParticles'; // The new component
import CustomCursor from './components/CustomCursor';
import Navbar from './components/navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      {/* 1. The solid sky and flapping birds */}
      <SkyAndBirds /> 
      
      {/* 2. The high-speed cursor */}
      <CustomCursor /> 
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* other routes... */}
      </Routes>
    </Router>
  );
}

export default App;