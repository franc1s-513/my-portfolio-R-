import React, { useEffect, useRef } from 'react';

const SkyAndBirds = ({ isDark }) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Bird {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
      }

  reset() {
  this.x = -150;
  this.y = Math.random() * canvas.height;
  this.z = Math.random(); 

  // THE SWEET SPOT: 
  // Base size 0.6 (visible) + max 0.6 extra (not huge)
  this.size = 0.6 + this.z * 0.6; 

  this.speed = 1.3 + this.z * 1.5;
  this.opacity = 0.4 + this.z * 0.4; // A bit more solid so they look sharp
  
  this.vx = this.speed; 
  this.vy = (Math.random() - 0.5) * 0.3; 
  this.angle = Math.random() * Math.PI;
  this.flapSpeed = 0.06 + Math.random() * 0.04;
}
      update() {
        // 1. GENTLE MOUSE AVOIDANCE
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          this.vy += dy > 0 ? -0.05 : 0.05;
          this.vx -= 0.02; // Slow down slightly as they "detect" you
        }

        this.vy += (Math.random() - 0.5) * 0.1; 
        this.vy *= 0.99;
        this.vx = this.vx * 0.99 + this.speed * 0.01;

        if (this.y < 50) this.vy += 0.1;
        if (this.y > canvas.height - 50) this.vy -= 0.1;

        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.flapSpeed;

        if (this.x > canvas.width + 150) this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.vy * 0.2); 
        ctx.scale(this.size, this.size);
        const color = isDark ? `rgba(125, 211, 252, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5 + (this.z * 2); // Closer birds get thicker lines
        ctx.lineCap = 'round';
        ctx.beginPath();
        const wingY = Math.sin(this.angle) * 10;
        ctx.moveTo(-12, wingY);
        ctx.lineTo(0, 0);
        ctx.lineTo(12, wingY);
        ctx.stroke();
        ctx.restore();
      }
    }

    const birds = Array.from({ length: 18 }, () => new Bird());

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      birds.forEach(b => {
        const dx = b.x - mouse.current.x;
        const dy = b.y - mouse.current.y;
        if (Math.sqrt(dx*dx + dy*dy) < 400) {
          b.vy -= 4; // Sudden lift!
          b.vx += 3;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      birds.forEach(bird => { bird.update(); bird.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
      {/* BACKGROUND GRADIENT */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transition: 'background 1.5s ease',
        background: isDark 
          ? 'radial-gradient(circle at 50% -20%, #1e293b 0%, #0f172a 40%, #020617 100%)' 
          : 'radial-gradient(circle at 50% -20%, #e0f2fe 0%, #7dd3fc 30%, #38bdf8 100%)'
      }} />

      {/* OPTIONAL: MIST LAYER */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isDark ? 0.1 : 0.3,
        background: 'url("https://www.transparenttextures.com/patterns/foggy-birds.png")', // Sublte cloud texture
        pointerEvents: 'none'
      }} />

      <canvas ref={canvasRef} style={{ position: 'relative', width: '100%', height: '100%' }} />
    </div>
  );
};

export default SkyAndBirds;