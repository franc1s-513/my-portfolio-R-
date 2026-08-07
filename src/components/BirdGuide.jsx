import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiMinimize2, 
  FiRefreshCw, 
  FiChevronUp, 
  FiChevronDown, 
  FiChevronLeft, 
  FiChevronRight, 
  FiNavigation,
  FiCompass,
  FiZoomIn,
  FiZoomOut
} from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { Model as PhoenixBird } from './Phoenix';

// SEQUENTIAL STORYTELLING TOUR
const tourGuideData = {
  '/': [
    {
      text: "Hey there! Come fly with me across Francis's portfolio! 🦅 Use ARROWS, A (Front), S (Back), or D-PAD!",
      btnText: "LET'S DIVE! 🚀",
      targetSelector: null,
      action: () => {
        const el = document.querySelector('#featured-proj-0');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        else window.scrollTo({ top: 1050, behavior: 'smooth' });
      }
    },
    {
      text: "We dived to Featured Project 1! Read description below 👇",
      btnText: "NEXT PROJECT",
      targetSelector: "#featured-proj-0",
      action: () => {
        const el = document.querySelector('#featured-proj-1');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    {
      text: "Circling Featured Project 2! Check out its tech stack 🚀",
      btnText: "NEXT PROJECT",
      targetSelector: "#featured-proj-1",
      action: () => {
        const el = document.querySelector('#featured-proj-2');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    {
      text: "Circling Featured Project 3! Full-stack craftsmanship ✨",
      btnText: "EXPLORE ALL REPOS",
      targetSelector: "#featured-proj-2",
      action: (navigate) => navigate('/projects')
    }
  ],
  '/about': [
    {
      text: "Click VIEW_PROJECTS on College card 🚀",
      btnText: "PROJECTS",
      targetSelector: "#about-projects-btn",
      action: (navigate) => navigate('/projects')
    },
    {
      text: "Explore Origin & Mission boxes 👆",
      btnText: "TOP",
      targetSelector: null,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  ],
  '/projects': [
    {
      text: "Dived to Project 1! Read description & links 👇",
      btnText: "NEXT PROJECT",
      targetSelector: "#project-card-0",
      action: () => {
        const el = document.querySelector('#project-card-1');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    {
      text: "Circling Project 2! Test LIVE_DEMO web app 🌐",
      btnText: "NEXT PROJECT",
      targetSelector: "#project-card-1",
      action: () => {
        const el = document.querySelector('#project-card-2');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    {
      text: "Circling Project 3! Explore all repositories ✨",
      btnText: "AWARDS",
      targetSelector: "#project-card-2",
      action: (navigate) => navigate('/certificates')
    }
  ],
  '/certificates': [
    {
      text: "Browse verified honors & technical credentials 👇",
      btnText: "SCROLL",
      targetSelector: null,
      action: () => window.scrollTo({ top: 500, behavior: 'smooth' })
    },
    {
      text: "Let's initiate a connection! 📫",
      btnText: "CONTACT",
      targetSelector: null,
      action: (navigate) => navigate('/contact')
    }
  ],
  '/contact': [
    {
      text: "Fill form & click TRANSMIT ✨",
      btnText: "TRANSMIT",
      targetSelector: "#contact-submit-btn",
      action: () => {
        const el = document.querySelector('#contact-submit-btn');
        if (el) el.focus();
      }
    },
    {
      text: "Flight complete! Return Home? 🏠",
      btnText: "HOME",
      targetSelector: null,
      action: (navigate) => navigate('/')
    }
  ]
};

const BirdGuide = ({ isDark }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDiving, setIsDiving] = useState(false);

  // AUTO-HIDING "TALKING BIRD" SPEECH BUBBLE STATE
  const [showBubble, setShowBubble] = useState(true);
  const bubbleTimerRef = useRef(null);

  // Target coordinates state for Auto-Tour mode
  const [targetCoords, setTargetCoords] = useState({
    x: window.innerWidth - 110,
    y: window.innerHeight - 85,
    width: 0,
    height: 0,
    isTargeted: false
  });

  const scrollTimeoutRef = useRef(null);
  const currentTips = tourGuideData[location.pathname] || tourGuideData['/'];
  const currentTip = currentTips[tipIndex] || currentTips[0];

  const isHeroTour = location.pathname === '/' && tipIndex === 0 && !currentTip.targetSelector;

  const triggerBubbleTalk = () => {
    setShowBubble(true);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 6000);
  };

  useEffect(() => {
    setTipIndex(0);
    triggerBubbleTalk();
  }, [location.pathname]);

  // Target tracking for Auto-Tour
  useEffect(() => {
    const calculatePosition = () => {
      if (isDiving) return;

      if (currentTip && currentTip.targetSelector && !isMinimized) {
        const el = document.querySelector(currentTip.targetSelector);
        if (el) {
          const rect = el.getBoundingClientRect();
          setTargetCoords({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
            isTargeted: true
          });
          return;
        }
      }
      setTargetCoords({
        x: window.innerWidth - 110,
        y: window.innerHeight - 85,
        width: 0,
        height: 0,
        isTargeted: false
      });
    };

    const timer = setTimeout(() => {
      calculatePosition();
      if (currentTip && currentTip.targetSelector && !isMinimized && !isDiving) {
        const el = document.querySelector(currentTip.targetSelector);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 450);

    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(calculatePosition, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [currentTip, location.pathname, tipIndex, isMinimized, isDiving]);

  // --- CONTINUOUS FLIGHT & ZOOM CONTROL ENGINE ---
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualCoords, setManualCoords] = useState({
    x: window.innerWidth * 0.75,
    y: window.innerHeight * 0.65
  });

  // ZOOM CONTROL STATE (0.5x Zoomed Out Wide ↔ 2.5x Zoomed In Epic Close Up)
  const [zoomLevel, setZoomLevel] = useState(1.0);

  // Real-time Flight Heading Orientation
  const [flightHeading, setFlightHeading] = useState({
    isUp: false,
    isDown: false,
    isLeft: false,
    isRight: false,
    isFront: false,
    isBack: false
  });

  const [featherTrail, setFeatherTrail] = useState([]);

  // Active Key Press Tracker
  // Explicit User Spec: 'a' = Front, 's' = Backward, 'ArrowUp'/ 'w' = Up to Sky, 'ArrowDown' = Down to River
  const keysPressed = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false
  });

  // D-Pad On-Screen State
  const dPadPressed = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
    front: false,
    back: false
  });

  const animationRef = useRef(null);

  // Handle Wheel Event for Smooth Zoom In / Zoom Out
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.altKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setZoomLevel((prev) => Math.min(2.5, prev + 0.1));
        } else {
          setZoomLevel((prev) => Math.max(0.5, prev - 0.1));
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D', '+', '-'];

      if (key === '+' || key === '=') {
        setZoomLevel((prev) => Math.min(2.5, prev + 0.15));
      } else if (key === '-' || key === '_') {
        setZoomLevel((prev) => Math.max(0.5, prev - 0.15));
      } else if (validKeys.includes(key)) {
        if (!document.pointerLockElement) {
          setIsManualMode(true);
          setShowBubble(false);
          keysPressed.current[key] = true;
          keysPressed.current[key.toLowerCase()] = true;
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key;
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];

      if (validKeys.includes(key)) {
        keysPressed.current[key] = false;
        keysPressed.current[key.toLowerCase()] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('keyup', handleKeyUp, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Frame Loop for Smooth 4-Way Vector Movement & Zoom Mechanics
  useEffect(() => {
    const updateManualPosition = () => {
      // User mapping: 'Up Arrow' or 'w' = UP, 'Down Arrow' = DOWN, 'a' = FRONT (Forward), 's' = BACK (Backward)
      const up = keysPressed.current.ArrowUp || keysPressed.current.w || dPadPressed.current.up;
      const down = keysPressed.current.ArrowDown || dPadPressed.current.down;
      const left = keysPressed.current.ArrowLeft || dPadPressed.current.left;
      const right = keysPressed.current.ArrowRight || keysPressed.current.d || dPadPressed.current.right;
      const front = keysPressed.current.a || dPadPressed.current.front;
      const back = keysPressed.current.s || dPadPressed.current.back;

      const isMoving = up || down || left || right || front || back;

      if (isMoving && !isManualMode) {
        setIsManualMode(true);
        setShowBubble(false);
      }

      setFlightHeading({
        isUp: up,
        isDown: down,
        isLeft: left,
        isRight: right,
        isFront: front,
        isBack: back
      });

      if (front) {
        setZoomLevel((prev) => Math.min(2.5, prev + 0.015));
      } else if (back) {
        setZoomLevel((prev) => Math.max(0.5, prev - 0.015));
      }

      if (isManualMode) {
        setManualCoords((prev) => {
          const speed = 13;
          let newX = prev.x;
          let newY = prev.y;

          if (up) newY -= speed;
          if (down) newY += speed;
          if (left) newX -= speed;
          if (right) newX += speed;

          const minX = 50;
          const maxX = window.innerWidth - 50;
          const minY = 50;
          const maxY = window.innerHeight - 55;

          newX = Math.max(minX, Math.min(maxX, newX));
          newY = Math.max(minY, Math.min(maxY, newY));

          if (up && newY <= 90) {
            window.scrollBy({ top: -14, behavior: 'smooth' });
          } else if (down && newY >= window.innerHeight - 90) {
            window.scrollBy({ top: 14, behavior: 'smooth' });
          }

          if (isMoving) {
            setFeatherTrail((trail) => [
              ...trail.slice(-10),
              {
                id: Date.now() + Math.random(),
                x: newX + (Math.random() * 12 - 6),
                y: newY + (Math.random() * 12 - 6),
                size: Math.random() * 6 + 4
              }
            ]);
          }

          return { x: newX, y: newY };
        });
      }

      animationRef.current = requestAnimationFrame(updateManualPosition);
    };

    animationRef.current = requestAnimationFrame(updateManualPosition);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isManualMode]);

  const handleAction = () => {
    if (isDiving) return;
    setIsDiving(true);
    setShowBubble(false);

    setTimeout(() => {
      if (currentTip.action) {
        currentTip.action(navigate);
      }
      if (tipIndex < currentTips.length - 1) {
        setTipIndex(tipIndex + 1);
      }
    }, 1500);

    setTimeout(() => {
      setIsDiving(false);
      triggerBubbleTalk();
    }, 3800);
  };

  const handleBirdClick = () => {
    if (isDiving) return;
    if (isMinimized) {
      setIsMinimized(false);
      triggerBubbleTalk();
    } else if (!showBubble) {
      triggerBubbleTalk();
    } else {
      setTipIndex((prev) => (prev + 1) % currentTips.length);
      triggerBubbleTalk();
    }
  };

  const birdBaseX = isManualMode ? manualCoords.x : targetCoords.x;
  const birdBaseY = isManualMode ? manualCoords.y : targetCoords.y;

  const bubbleX = isHeroTour && !isManualMode
    ? Math.max(20, Math.min(window.innerWidth - 220, window.innerWidth * 0.45))
    : Math.max(15, Math.min(window.innerWidth - 210, birdBaseX - 100));
  const bubbleY = isHeroTour && !isManualMode
    ? Math.max(60, window.innerHeight * 0.2)
    : Math.max(60, birdBaseY - 110);

  const altitudePct = Math.round(((window.innerHeight - birdBaseY) / window.innerHeight) * 100);
  const altitudeStatus = altitudePct >= 70 
    ? { title: 'SKY ZENITH ☁️', desc: 'UPWARD TO THE SKY', color: '#38bdf8' }
    : altitudePct <= 30 
    ? { title: 'RIVER & HILLS 🌊', desc: 'DIVING TO WATERFRONT', color: '#10b981' }
    : { title: 'MID-AIR CRUISE 🦅', desc: 'SOARING BALANCED', color: '#0ea5e9' };

  const setDPadState = (dir, active) => {
    dPadPressed.current[dir] = active;
    if (active) {
      setIsManualMode(true);
      setShowBubble(false);
    }
  };

  // NATURAL 3D TURNING PHYSICS (NO WORLD FLIPPING / NO SCREEN INVERSION!)
  // Computes realistic eagle banking leaning without world flipping
  const getBird3DRotation = () => {
    if (!isManualMode) {
      return [0.3, Math.PI / 1.8, 0.1];
    }

    let pitch = 0.3; // Default level flight pitch
    let yaw = Math.PI; // Forward facing
    let bank = 0;   // Level roll bank

    // Up / Down pitch
    if (flightHeading.isUp) pitch = -0.42; // Nose pitch up to sky
    else if (flightHeading.isDown) pitch = 0.58; // Nose pitch down to river

    // Left / Right bank leaning (Natural eagle turn without world flipping)
    if (flightHeading.isLeft) {
      yaw = Math.PI - 0.35;
      bank = -0.38;
    } else if (flightHeading.isRight) {
      yaw = Math.PI + 0.35;
      bank = 0.38;
    }

    // Front / Back pitch dynamics
    if (flightHeading.isFront) {
      pitch -= 0.15;
    } else if (flightHeading.isBack) {
      pitch += 0.15;
    }

    return [pitch, yaw, bank];
  };

  return (
    <>
      {/* SPARKLING FEATHER ENERGY PARTICLES TRAIL */}
      {isManualMode && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10004 }}>
          {featherTrail.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{ opacity: 0, scale: 0.2, y: p.y + 15 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #38bdf8 0%, #0ea5e9 60%, transparent 100%)',
                boxShadow: '0 0 10px #38bdf8, 0 0 16px #0ea5e9',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      )}

      {/* AUTO-HIDING "TALKING BIRD" COMIC DIALOGUE BUBBLE */}
      <AnimatePresence mode="wait">
        {!isMinimized && !isDiving && showBubble && !isManualMode && (
          <motion.div
            key={`${location.pathname}-${tipIndex}`}
            initial={{ opacity: 0, scale: 0.8, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            style={{
              position: 'fixed',
              top: `${bubbleY}px`,
              left: `${bubbleX}px`,
              zIndex: 10001,
              background: isDark ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 165, 233, 0.5)',
              borderRadius: '14px',
              padding: '10px 14px',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.38)',
              width: isHeroTour ? '220px' : '190px',
              maxWidth: '85vw'
            }}
          >
            {/* Header bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9', display: 'inline-block', boxShadow: '0 0 6px #0ea5e9' }} />
                <span style={{ fontSize: '0.62rem', fontWeight: '900', color: '#0ea5e9', letterSpacing: '1px', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
                  {targetCoords.isTargeted ? 'CYBER_EAGLE // 🎯' : isHeroTour ? 'CYBER_EAGLE // WELCOME 🦅' : `CYBER_EAGLE // ${(tipIndex + 1)}/${currentTips.length}`}
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                title="Minimize Guide"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                  cursor: 'pointer',
                  padding: '1px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FiMinimize2 size={13} />
              </button>
            </div>

            {/* Short Dialogue Text */}
            <p style={{
              margin: '0 0 10px 0',
              fontSize: '0.78rem',
              lineHeight: '1.40',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontWeight: '700',
              fontFamily: "'Outfit', 'Inter', sans-serif"
            }}>
              {currentTip.text}
            </p>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#0284c7' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAction}
                style={{
                  background: '#0ea5e9',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '6px 12px',
                  fontSize: '0.70rem',
                  fontWeight: '800',
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 3px 12px rgba(14, 165, 233, 0.45)',
                  flex: 1,
                  justifyContent: 'center'
                }}
              >
                {currentTip.btnText} <FiArrowRight size={12} />
              </motion.button>

              {currentTips.length > 1 && (
                <button
                  onClick={() => {
                    setTipIndex((prev) => (prev + 1) % currentTips.length);
                    triggerBubbleTalk();
                  }}
                  title="Cycle Next Tip"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '50%',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0ea5e9',
                    cursor: 'pointer'
                  }}
                >
                  <FiRefreshCw size={11} />
                </button>
              )}
            </div>

            {/* Dialogue tail */}
            <div
              style={{
                position: 'absolute',
                bottom: '-7px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: `7px solid ${isDark ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.98)'}`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FUTURISTIC ON-SCREEN D-PAD CONTROLLER, ZOOM IN/OUT ACCESS & ALTITUDE HUD */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 10006,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
          pointerEvents: 'auto'
        }}
      >
        {/* ALTITUDE & HEADING HUD BADGE WITH ZOOM STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${altitudeStatus.color}66`,
            borderRadius: '16px',
            padding: '8px 14px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <FiCompass size={18} color={altitudeStatus.color} />
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: '900', color: altitudeStatus.color, letterSpacing: '1px' }}>
              {altitudeStatus.title} ({altitudePct}%) // ZOOM: {zoomLevel.toFixed(1)}x
            </div>
            <div style={{ fontSize: '0.60rem', fontWeight: '700', color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>
              {isManualMode 
                ? (flightHeading.isUp ? '▲ ASCENDING SKYWARD' : flightHeading.isDown ? '▼ DIVING TO RIVER' : flightHeading.isLeft ? '◀ BANKING WEST' : flightHeading.isRight ? '▶ BANKING EAST' : flightHeading.isFront ? '⚡ MOVING FRONT (A)' : flightHeading.isBack ? '🔙 MOVING BACK (S)' : 'FLIGHT READY // ARROWS + A/S')
                : 'AUTO TOUR MODE'}
            </div>
          </div>

          {/* Mode Toggle Button */}
          <button
            onClick={() => {
              if (isManualMode) {
                setIsManualMode(false);
                triggerBubbleTalk();
              } else {
                setIsManualMode(true);
                setShowBubble(false);
              }
            }}
            title={isManualMode ? "Switch to Auto Guided Tour" : "Switch to Free Flying Mode"}
            style={{
              background: isManualMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              border: `1px solid ${isManualMode ? '#0ea5e9' : '#10b981'}`,
              borderRadius: '20px',
              padding: '4px 10px',
              color: isManualMode ? '#0ea5e9' : '#10b981',
              fontSize: '0.62rem',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginLeft: '4px'
            }}
          >
            <FiNavigation size={11} />
            {isManualMode ? 'AUTO TOUR' : 'FREE FLY'}
          </button>
        </motion.div>

        {/* 4-WAY GLASS D-PAD CONTROLLER + ZOOM IN/OUT TOOLBAR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.90)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 165, 233, 0.4)',
              borderRadius: '24px',
              padding: '8px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 38px)',
              gridTemplateRows: 'repeat(3, 38px)',
              gap: '4px',
              alignItems: 'center',
              justifyItems: 'center'
            }}
          >
            {/* TOP / UP TO SKY BUTTON (Up Arrow / W) */}
            <button
              onMouseDown={() => setDPadState('up', true)}
              onMouseUp={() => setDPadState('up', false)}
              onMouseLeave={() => setDPadState('up', false)}
              onTouchStart={(e) => { e.preventDefault(); setDPadState('up', true); }}
              onTouchEnd={() => setDPadState('up', false)}
              title="Fly Up to Sky (Up Arrow / W)"
              style={{
                gridColumn: '2',
                gridRow: '1',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: (flightHeading.isUp || dPadPressed.current.up) ? '#0ea5e9' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: (flightHeading.isUp || dPadPressed.current.up) ? '#fff' : '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: (flightHeading.isUp || dPadPressed.current.up) ? '0 0 14px #0ea5e9' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FiChevronUp size={22} />
            </button>

            {/* LEFT BUTTON */}
            <button
              onMouseDown={() => setDPadState('left', true)}
              onMouseUp={() => setDPadState('left', false)}
              onMouseLeave={() => setDPadState('left', false)}
              onTouchStart={(e) => { e.preventDefault(); setDPadState('left', true); }}
              onTouchEnd={() => setDPadState('left', false)}
              title="Fly Left (Left Arrow)"
              style={{
                gridColumn: '1',
                gridRow: '2',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: (flightHeading.isLeft || dPadPressed.current.left) ? '#0ea5e9' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: (flightHeading.isLeft || dPadPressed.current.left) ? '#fff' : '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: (flightHeading.isLeft || dPadPressed.current.left) ? '0 0 14px #0ea5e9' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FiChevronLeft size={22} />
            </button>

            {/* CENTER EMBLEM */}
            <div
              style={{
                gridColumn: '2',
                gridRow: '2',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #0ea5e9 0%, transparent 80%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: '900'
              }}
            >
              🦅
            </div>

            {/* RIGHT BUTTON */}
            <button
              onMouseDown={() => setDPadState('right', true)}
              onMouseUp={() => setDPadState('right', false)}
              onMouseLeave={() => setDPadState('right', false)}
              onTouchStart={(e) => { e.preventDefault(); setDPadState('right', true); }}
              onTouchEnd={() => setDPadState('right', false)}
              title="Fly Right (Right Arrow / D)"
              style={{
                gridColumn: '3',
                gridRow: '2',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: (flightHeading.isRight || dPadPressed.current.right) ? '#0ea5e9' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: (flightHeading.isRight || dPadPressed.current.right) ? '#fff' : '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: (flightHeading.isRight || dPadPressed.current.right) ? '0 0 14px #0ea5e9' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FiChevronRight size={22} />
            </button>

            {/* BOTTOM / DOWN TO RIVER BUTTON (Down Arrow) */}
            <button
              onMouseDown={() => setDPadState('down', true)}
              onMouseUp={() => setDPadState('down', false)}
              onMouseLeave={() => setDPadState('down', false)}
              onTouchStart={(e) => { e.preventDefault(); setDPadState('down', true); }}
              onTouchEnd={() => setDPadState('down', false)}
              title="Fly Down to River & Hills (Down Arrow)"
              style={{
                gridColumn: '2',
                gridRow: '3',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: (flightHeading.isDown || dPadPressed.current.down) ? '#0ea5e9' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: (flightHeading.isDown || dPadPressed.current.down) ? '#fff' : '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: (flightHeading.isDown || dPadPressed.current.down) ? '0 0 14px #0ea5e9' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FiChevronDown size={22} />
            </button>
          </div>

          {/* DEDICATED ZOOM IN / ZOOM OUT & FRONT / BACK CONTROLLER BUTTONS */}
          <div
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.90)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(14, 165, 233, 0.4)',
              borderRadius: '20px',
              padding: '8px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {/* ZOOM IN (+) BUTTON */}
            <button
              onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
              title="Zoom In Bird (+ Key / Scroll)"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <FiZoomIn size={18} />
            </button>

            {/* MOVE FRONT (A Key) BUTTON */}
            <button
              onMouseDown={() => setDPadState('front', true)}
              onMouseUp={() => setDPadState('front', false)}
              onMouseLeave={() => setDPadState('front', false)}
              onTouchStart={(e) => { e.preventDefault(); setDPadState('front', true); }}
              onTouchEnd={() => setDPadState('front', false)}
              title="Move Front / Advance (A Key)"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: (flightHeading.isFront || dPadPressed.current.front) ? '#0ea5e9' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: (flightHeading.isFront || dPadPressed.current.front) ? '#fff' : '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.62rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              A
            </button>

            {/* MOVE BACK (S Key) BUTTON */}
            <button
              onMouseDown={() => setDPadState('back', true)}
              onMouseUp={() => setDPadState('back', false)}
              onMouseLeave={() => setDPadState('back', false)}
              onTouchStart={(e) => { e.preventDefault(); setDPadState('back', true); }}
              onTouchEnd={() => setDPadState('back', false)}
              title="Move Backward (S Key)"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: (flightHeading.isBack || dPadPressed.current.back) ? '#0ea5e9' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: (flightHeading.isBack || dPadPressed.current.back) ? '#fff' : '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.62rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              S
            </button>

            {/* ZOOM OUT (-) BUTTON */}
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.2))}
              title="Zoom Out Bird (- Key / Scroll)"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: '#0ea5e9',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <FiZoomOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 3D CYBER-EAGLE MODEL WITH FLIGHT VECTOR POSITION, ZOOM SCALE & NATURAL TURNING PHYSICS (WORLD UNFLIPPED) */}
      <motion.div
        animate={
          isDiving
            ? {
                left: [birdBaseX, window.innerWidth * 0.5, birdBaseX - 35, birdBaseX],
                top: [birdBaseY, 30, birdBaseY - 60, birdBaseY],
                rotateZ: [0, -30, 62, 0],
                scaleX: 1, // World never flips horizontally
                scale: [zoomLevel, zoomLevel * 1.35, zoomLevel * 1.15, zoomLevel]
              }
            : isManualMode
            ? {
                left: manualCoords.x,
                top: manualCoords.y,
                rotateZ: flightHeading.isLeft ? -15 : flightHeading.isRight ? 15 : 0,
                scaleX: 1, // Always stay upright, world never flips
                scale: flightHeading.isUp 
                  ? zoomLevel * 0.9 
                  : flightHeading.isDown 
                  ? zoomLevel * 1.12 
                  : flightHeading.isFront 
                  ? zoomLevel * 1.25 
                  : flightHeading.isBack 
                  ? zoomLevel * 0.8 
                  : zoomLevel
              }
            : isHeroTour
            ? {
                left: [
                  window.innerWidth * 0.18,
                  window.innerWidth * 0.82,
                  window.innerWidth * 0.82,
                  window.innerWidth * 0.18,
                  window.innerWidth * 0.18
                ],
                top: [
                  window.innerHeight * 0.22,
                  window.innerHeight * 0.28,
                  window.innerHeight * 0.78,
                  window.innerHeight * 0.72,
                  window.innerHeight * 0.22
                ],
                rotateZ: [0, 8, 0, -8, 0],
                scaleX: 1, // Keep upright
                scale: [zoomLevel, zoomLevel * 1.08, zoomLevel * 1.04, zoomLevel * 1.08, zoomLevel]
              }
            : targetCoords.isTargeted
            ? {
                left: [
                  birdBaseX - (targetCoords.width / 2 + 50),
                  birdBaseX + (targetCoords.width / 2 + 50),
                  birdBaseX + (targetCoords.width / 2 + 50),
                  birdBaseX - (targetCoords.width / 2 + 50),
                  birdBaseX - (targetCoords.width / 2 + 50)
                ],
                top: [
                  birdBaseY - 45,
                  birdBaseY - 20,
                  birdBaseY + 45,
                  birdBaseY + 20,
                  birdBaseY - 45
                ],
                rotateZ: [0, 12, 0, -12, 0],
                scaleX: 1, // Keep upright
                scale: [zoomLevel, zoomLevel * 1.05, zoomLevel * 0.98, zoomLevel * 1.05, zoomLevel]
              }
            : {
                left: [birdBaseX, birdBaseX - 35, birdBaseX + 25, birdBaseX],
                top: [birdBaseY, birdBaseY - 28, birdBaseY + 18, birdBaseY],
                rotateZ: [0, -6, 5, 0],
                scaleX: 1,
                scale: zoomLevel
              }
        }
        transition={
          isDiving
            ? {
                duration: 3.8,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.28, 0.82, 1]
              }
            : isManualMode
            ? {
                type: 'tween',
                ease: 'linear',
                duration: 0.05
              }
            : isHeroTour
            ? {
                repeat: Infinity,
                duration: 18,
                ease: 'easeInOut',
                times: [0, 0.45, 0.50, 0.95, 1]
              }
            : targetCoords.isTargeted
            ? {
                repeat: Infinity,
                duration: 16,
                ease: 'easeInOut',
                times: [0, 0.45, 0.50, 0.95, 1]
              }
            : {
                repeat: Infinity,
                duration: 14,
                ease: 'easeInOut'
              }
        }
        style={{
          position: 'fixed',
          zIndex: 10005,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
          cursor: 'pointer'
        }}
      >
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            handleBirdClick();
          }}
          title="Click Cyber-Eagle to hear dialogue!"
          whileHover={{ scale: 1.15, rotateZ: -8, y: -6 }}
          animate={{
            y: isDiving ? [0, -4, 4, 0] : [0, -8, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: isDiving ? 0.25 : 2.8, ease: 'easeInOut' }
          }}
          style={{
            width: '110px',
            height: '90px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 14px 28px rgba(14, 165, 233, 0.65))'
          }}
        >
          {/* Talk Prompt Badge */}
          {!showBubble && !isDiving && !isManualMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                background: '#0ea5e9',
                color: '#fff',
                borderRadius: '50px',
                padding: '2px 7px',
                fontSize: '0.60rem',
                fontWeight: '900',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              💬 TALK
            </motion.div>
          )}

          <div style={{ width: '400px', height: '400px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
            <Canvas 
              dpr={[1, 1.5]} 
              camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 1000 }} 
              gl={{ powerPreference: "high-performance", antialias: false, stencil: false }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.8} />
              <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#0ea5e9" />
              <React.Suspense fallback={null}>
                <Center>
                  <PhoenixBird 
                    scale={0.003} 
                    rotation={getBird3DRotation()} 
                  />
                </Center>
                <Environment preset="city" />
              </React.Suspense>
            </Canvas>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BirdGuide;
