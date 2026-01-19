import React, { useEffect, useRef } from 'react';

const WindParticles = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Create particles that look like wind or sparks
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 40 + 20,
      speed: Math.random() * 8 + 4,
      opacity: Math.random() * 0.5 + 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- THE MAGIC MODE LOGIC ---
      if (isDark) {
        // Glowing Sparks Mode
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.6)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#0ea5e9';
      } else {
        // Soft Wind Mode
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 0; // No glow in daylight
      }

      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      particles.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();

        // Move horizontally
        p.x += p.speed;

        // Reset if it leaves the screen
        if (p.x > canvas.width) {
          p.x = -p.length;
          p.y = Math.random() * canvas.height;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Sits above the sky but below the content
        pointerEvents: 'none', // Allows clicks to pass through to buttons
      }}
    />
  );
};

export default WindParticles;