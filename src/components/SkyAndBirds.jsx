import React, { useEffect, useRef } from 'react';

const SkyAndBirds = ({ isDark }) => {
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

    class Bird {
      constructor() {
        this.reset();
        // Randomize start position so they don't all appear at once
        this.x = Math.random() * canvas.width;
      }

      reset() {
  this.x = -100;
  this.y = Math.random() * canvas.height;
  this.z = Math.random();
  this.size = 0.4 + this.z * 0.8;
  this.speed = 1.2 + this.z * 1.5;
  this.opacity = 0.2 + this.z * 0.6;
  
  // THE FIX: Velocity-based movement
  this.vx = this.speed; // Velocity X
  this.vy = (Math.random() - 0.5) * 0.5; // Random starting vertical drift
  
  this.angle = Math.random() * Math.PI;
  this.flapSpeed = 0.08 + Math.random() * 0.05;
}

    update() {
  // 1. ADD "RANDOM STEERING"
  // This replaces the "S" path. Every frame, the bird 
  // slightly changes its vertical velocity randomly.
  this.vy += (Math.random() - 0.5) * 0.1; 

  // 2. FRICTION & LIMITS
  // Keeps the bird from flying off the top/bottom too fast
  this.vy *= 0.98; 
  if (this.y < 50) this.vy += 0.2;
  if (this.y > canvas.height - 50) this.vy -= 0.2;

  // 3. APPLY MOVEMENT
  this.x += this.vx;
  this.y += this.vy;

  // 4. FLAP LOGIC
  this.angle += this.flapSpeed;

  if (this.x > canvas.width + 100) this.reset();
}
  draw() {
  ctx.save();
  ctx.translate(this.x, this.y);
  
  // 5. NATURAL TILT
  // The bird tilts based ONLY on its current up/down movement (vy)
  // No fixed path, just pure physics!
  ctx.rotate(this.vy * 0.2); 

  ctx.scale(this.size, this.size);
  
  const color = isDark ? `rgba(125, 211, 252, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity})`;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  ctx.beginPath();
  const wingY = Math.sin(this.angle) * 12;
  ctx.moveTo(-15, wingY);
  ctx.lineTo(0, 0);
  ctx.lineTo(15, wingY);
  ctx.stroke();
  
  ctx.restore();
}
    }

    const birds = Array.from({ length: 12 }, () => new Bird());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      birds.forEach(bird => {
        bird.update();
        bird.draw();
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
      zIndex: -1,
      transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      // We use a Radial Gradient instead of Linear
      background: isDark 
        ? 'radial-gradient(circle at 50% -10%, #1e293b 0%, #020617 100%)' 
        : 'radial-gradient(circle at 50% -10%, #bae6fd 0%, #38bdf8 100%)'
    }}
  />
);
};

export default SkyAndBirds;