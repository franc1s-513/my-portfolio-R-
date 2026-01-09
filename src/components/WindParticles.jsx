import React, { useEffect, useRef } from 'react';

const WindParticles = ({ isDark }) => { // 1. Accept the isDark prop
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const particles = [];
    const particleCount = 150;

    class Particle {
      constructor() {
        this.reset();
        // Scatter initially so they don't all start at once
        this.x = Math.random() * canvas.width;
      }

      reset() {
        this.x = -20;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 0.8 + 0.2; 
        this.speedX = Math.random() * 2 + 1.5; 
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.wobble = Math.random() * 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += Math.sin(this.x * this.wobble) * 0.8;

        if (this.x > canvas.width) {
          this.reset();
        }
      }

      draw() {
        // 2. Change particle color based on theme
        // In dark mode, they look like glowing sparks; in light mode, soft wind streaks
        const color = isDark 
          ? `rgba(125, 211, 252, ${this.opacity + 0.2})` 
          : `rgba(255, 255, 255, ${this.opacity})`;
          
        ctx.fillStyle = color;
        
        // Add glow in dark mode
        if (isDark) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#7dd3fc';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        // Elongated wind streaks
        ctx.ellipse(this.x, this.y, this.size * 4, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]); // 3. Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        // 4. Dynamic Background Transition
        background: isDark 
          ? 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' // Midnight Blue
          : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #f0f9ff 100%)', // Airy Sky
        transition: 'background 1.2s ease-in-out'
      }}
    />
  );
};

export default WindParticles;