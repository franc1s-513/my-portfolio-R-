import React, { useEffect, useRef } from 'react';

const SkyAndBirds = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Normalize mouse position to -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const birds = [];
    const formationCount = 3; 
    const birdsPerFormation = 5;

    class Bird {
      constructor(groupIndex, birdIndex) {
        this.groupIndex = groupIndex;
        this.birdIndex = birdIndex;
        this.reset();
        this.x = Math.random() * canvas.width;
      }

      reset() {
        const verticalOffset = this.birdIndex % 2 === 0 ? this.birdIndex * 15 : -this.birdIndex * 15;
        const horizontalOffset = this.birdIndex * -25;

        this.x = horizontalOffset - 100;
        this.baseY = (canvas.height * 0.2) + (this.groupIndex * 200);
        this.y = this.baseY + verticalOffset;
        
        this.size = 4;
        this.speedX = 1.2 + (this.groupIndex * 0.2); 
        this.wingSpan = this.birdIndex * 0.3; 
        this.wingSpeed = 0.08;
        this.opacity = 0.6;
      }

      update() {
        this.x += this.speedX;
        this.wingSpan += this.wingSpeed;

        if (this.x > canvas.width + 200) {
          this.reset();
        }
      }

      draw() {
        const flap = Math.sin(this.wingSpan) * this.size;
        
        // PARALLAX CALCULATION: Shift position based on mouse
        const parallaxX = mouse.current.x * 20; 
        const parallaxY = mouse.current.y * 20;

        ctx.save();
        // The bird moves with its speed + the parallax shift
        ctx.translate(this.x + parallaxX, this.y + parallaxY);
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 5;

        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
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

    for (let g = 0; g < formationCount; g++) {
      for (let b = 0; b < birdsPerFormation; b++) {
        birds.push(new Bird(g, b));
      }
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
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
        background: 'linear-gradient(180deg, #7dd3fc 0%, #38bdf8 100%)'
      }}
    />
  );
};

export default SkyAndBirds;