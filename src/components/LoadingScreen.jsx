import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StrokeText from './StrokeText';

const MESSAGE = 'WELCOME TO MY SPACE';
const TYPING_MS = 75;
const TIMER_DURATION_MS = 6000;
const MAX_LOAD_MS = 12000;

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
        background: 'radial-gradient(ellipse at center, #fffbf2 0%, #fff4df 45%, #fff8eb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        color: '#030339',
        fontFamily: "var(--font-display)",
        padding: '24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Radial Golden Aura */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'clamp(320px, 65vw, 760px)',
          height: 'clamp(320px, 65vw, 760px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 153, 11, 0.14) 0%, rgba(200, 153, 11, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main Animated Headline & Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '6px',
        }}
      >
        {/* Subtle Luxury Pre-title Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'rgba(200, 153, 11, 0.08)',
            border: '1px solid rgba(200, 153, 11, 0.28)',
            boxShadow: '0 2px 14px rgba(200, 153, 11, 0.08)',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#c8990b',
              boxShadow: '0 0 10px #c8990b',
              display: 'inline-block'
            }}
          />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#8a6500',
              fontFamily: "var(--font-mono, monospace)"
            }}
          >
            FRANCIS FERNANDO • PORTFOLIO
          </span>
        </motion.div>

        {/* Line 1: HEY THERE, (Tall & Prominent) */}
        <div style={{ width: 'min(92vw, 580px)' }}>
          <StrokeText
            text={"HEY THERE,"}
            strokeColor="#c8990b"
            fillColor="#030339"
            strokeWidth={1.8}
            drawDuration={1.3}
            fillDelay={0.15}
            stagger={0.045}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={96}
            fontWeight={800}
            letterSpacing={-1.5}
          />
        </div>

        {/* Line 2: GREAT TO PULL YOUR EYE ! (Wide, Clear & Bold) */}
        <div style={{ width: 'min(95vw, 1020px)' }}>
          <StrokeText
            text={"GREAT TO PULL YOUR EYE !"}
            strokeColor="#c8990b"
            fillColor="#030339"
            strokeWidth={1.6}
            drawDuration={1.6}
            fillDelay={0.25}
            stagger={0.035}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={82}
            fontWeight={800}
            letterSpacing={-1.5}
          />
        </div>
      </motion.div>

      {/* Progress Section */}
      <div style={{ width: 'min(440px, 84vw)', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            height: '8px',
            borderRadius: '50px',
            overflow: 'hidden',
            background: 'rgba(200, 153, 11, 0.12)',
            border: '1px solid rgba(200, 153, 11, 0.35)',
            boxShadow: '0 0 24px rgba(200, 153, 11, 0.12)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${displayed}%`,
              background: 'linear-gradient(90deg, #b48310, #d4af37, #fef08a)',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.75)',
              borderRadius: '50px',
              transition: 'width 0.15s linear',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            fontSize: '0.72rem',
            letterSpacing: '2.5px',
            color: '#030339',
            fontFamily: "var(--font-mono, monospace)",
            fontWeight: 600,
            opacity: 0.75,
          }}
        >
          <span>{assetsLoading ? 'UPLINKING 3D ENVIRONMENT...' : 'INITIALIZING PORTFOLIO...'}</span>
          <span style={{ color: '#8a6500', fontWeight: 800, opacity: 1, letterSpacing: '1px' }}>{displayed}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
