import React, { useEffect, useRef, useCallback } from 'react';

const WindParticles = () => {
  const canvasRef = useRef(null);

  const animateRef = useRef(null);
  const particlesRef = useRef([]);

  const initParticles = useCallback((width, height) => {
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 40 + 20,
      speed: Math.random() * 8 + 4,
      opacity: Math.random() * 0.5 + 0.1,
      verticalDrift: (Math.random() - 0.5) * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let resizeTimeout;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      const time = Date.now() * 0.001;

      particlesRef.current.forEach(p => {
        const waveY = Math.sin(time + p.phase) * 0.8;
        const opacity = p.opacity * (0.7 + Math.sin(time * 0.5 + p.phase) * 0.3);

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y + waveY);
        ctx.stroke();

        p.x += p.speed;
        p.y += p.verticalDrift + waveY * 0.3;

        // Fade out near edges
        if (p.x > canvas.width - 50) {
          p.opacity *= 0.95;
        }

        if (p.x > canvas.width || p.y < -20 || p.y > canvas.height + 20) {
          p.x = -p.length;
          p.y = Math.random() * canvas.height;
          p.opacity = Math.random() * 0.5 + 0.1;
        }
      });

      ctx.globalAlpha = 1;
      animateRef.current = requestAnimationFrame(animate);
    };

    animateRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      if (animateRef.current) cancelAnimationFrame(animateRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default WindParticles;
