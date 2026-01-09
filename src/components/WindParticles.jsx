import React, { useEffect, useRef } from 'react';

const SkyAndBirds = () => {
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
    const birdCount = 12; // Fewer birds make it look more realistic and "elevated"

    class Bird {
      constructor() {
        this.reset();
        // Randomize initial positions so they don't all fly in a line
        this.x = Math.random() * canvas.width;
      }

      reset() {
        this.x = -50; // Start off-screen
        this.y = Math.random() * (canvas.height * 0.7); // Stay in upper sky area
        this.size = Math.random() * 4 + 3; // Small and elegant
        this.speedX = Math.random() * 1.5 + 1; 
        this.speedY = Math.random() * 0.4 - 0.2;
        this.wingSpan = Math.random() * Math.PI; // Random start for wing flap
        this.wingSpeed = Math.random() * 0.1 + 0.05;
        this.opacity = Math.random() * 0.6 + 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wingSpan += this.wingSpeed;

        // Reset when bird flies off right side
        if (this.x > canvas.width + 50) {
          this.reset();
        }
      }

      draw() {
        const flap = Math.sin(this.wingSpan) * this.size;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Elevation effect: Subtle shadow behind the bird
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 4;

        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw simple flapping V-shape bird
        ctx.beginPath();
        // Left wing
        ctx.moveTo(-this.size, flap);
        ctx.quadraticCurveTo(-this.size / 2, 0, 0, 2);
        // Right wing
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
        // SOLID SKY BLUE GRADIENT (Removes the whitish corners)
        background: 'linear-gradient(180deg, #7dd3fc 0%, #38bdf8 100%)'
      }}
    />
  );
};

export default SkyAndBirds;