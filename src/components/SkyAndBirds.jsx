import React, { useEffect, useRef } from 'react';

const SkyAndBirds = ({ isDark }) => { // 1. Added isDark prop
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

    const birds = [];
    const birdCount = 12;

    class Bird {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
      }

      reset() {
        this.x = -50;
        this.y = Math.random() * (canvas.height * 0.7);
        this.size = Math.random() * 4 + 3;
        this.speedX = Math.random() * 1.5 + 1; 
        this.speedY = Math.random() * 0.4 - 0.2;
        this.wingSpan = Math.random() * Math.PI;
        this.wingSpeed = Math.random() * 0.1 + 0.05;
        this.opacity = Math.random() * 0.6 + 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wingSpan += this.wingSpeed;

        if (this.x > canvas.width + 50) {
          this.reset();
        }
      }

      draw() {
        const flap = Math.sin(this.wingSpan) * this.size;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // 2. Dynamic Shadow: Subtle dark in day, glowing blue at night
        ctx.shadowColor = isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = isDark ? 8 : 4;

        // 3. Bird Color: Pure white in day, bright sky-blue glow at night
        ctx.strokeStyle = isDark 
          ? `rgba(125, 211, 252, ${this.opacity})` 
          : `rgba(255, 255, 255, ${this.opacity})`;
          
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(-this.size, flap);
        ctx.quadraticCurveTo(-this.size / 2, 0, 0, 2);
        ctx.quadraticCurveTo(this.size / 2, 0, this.size, flap);
        ctx.stroke();

        ctx.restore();
      }
    }

    for (let i = 0; i < birdCount; i++) {
      birds.push(new Bird());
    }

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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]); // 4. Added isDark to dependency array

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
        // 5. SUNSET TRANSITION: Fades from Sky Blue to Midnight Blue
        background: isDark 
          ? 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' 
          : 'linear-gradient(180deg, #7dd3fc 0%, #38bdf8 100%)',
        transition: 'background 1.5s ease-in-out' // Makes the change feel natural
      }}
    />
  );
};

export default SkyAndBirds;