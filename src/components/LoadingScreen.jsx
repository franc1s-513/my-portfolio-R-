import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StrokeText from './StrokeText';

const MESSAGE = 'WELCOME TO MY SPACE';
const TYPING_MS = 75;
const TIMER_DURATION_MS = 2800;
const MAX_LOAD_MS = 8000;

const LoadingScreen = ({ onFinish }) => {
  const [typed, setTyped] = useState('');
  const [timerProgress, setTimerProgress] = useState(0);
  const [realProgress, setRealProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (typed.length >= MESSAGE.length) return;
    const t = setTimeout(() => setTyped(MESSAGE.slice(0, typed.length + 1)), TYPING_MS);
    return () => clearTimeout(t);
  }, [typed]);

  useEffect(() => {
    const start = Date.now();
    let raf;
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / TIMER_DURATION_MS) * 100);
      setTimerProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onProgress = (e) => setRealProgress(Math.round(e.detail));
    window.addEventListener('asset-progress', onProgress);
    return () => window.removeEventListener('asset-progress', onProgress);
  }, []);

  const displayed = Math.round(Math.max(timerProgress, realProgress));

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      if (displayed >= 100 && typed.length === MESSAGE.length) {
        setFinished(true);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [finished, displayed, typed.length]);

  useEffect(() => {
    const t = setTimeout(() => setFinished(true), MAX_LOAD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (finished) {
      const t = setTimeout(onFinish, 450);
      return () => clearTimeout(t);
    }
  }, [finished, onFinish]);

  const assetsLoading = realProgress > 0 && realProgress < 100;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        // warm, light background that complements the gold strokeColor (#c8990b)
        background: 'radial-gradient(ellipse at center, #fff9ec 0%, #fff1d6 45%, #fff7e8 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '36px',
        color: '#030339', // use stroke fill color for readable contrast
        fontFamily: "'Outfit', 'Inter', monospace, sans-serif",
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <style>{`@keyframes ld-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }`}</style>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div style={{ width: 'min(90vw, 900px)' }}>
          <StrokeText
            text={"HEY THERE ,GREAT TO PULL YOUR EYE !"}
            strokeColor="#c8990b"
            fillColor="#030339"
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={64}
            fontWeight={800}
            letterSpacing={-2}
          />
        </div>
      </motion.div>

      <div style={{ width: 'min(420px, 82vw)' }}>
        <div
          style={{
            height: '10px',
            borderRadius: '50px',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(14,165,233,0.4)',
            boxShadow: '0 0 24px rgba(14,165,233,0.15)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${displayed}%`,
              background: 'linear-gradient(90deg, #0284c7, #0ea5e9, #38bdf8)',
              boxShadow: '0 0 14px rgba(56,189,248,0.85)',
              borderRadius: '50px',
              transition: 'width 0.15s linear',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            fontSize: '0.7rem',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <span>{assetsLoading ? 'UPLINKING 3D ENVIRONMENT...' : 'INITIALIZING PORTFOLIO...'}</span>
          <span style={{ color: '#38bdf8', fontWeight: 800 }}>{displayed}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
