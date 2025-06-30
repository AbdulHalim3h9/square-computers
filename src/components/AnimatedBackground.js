'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const stars = [];
  const squares = [];
  const colors = ['rgba(56, 189, 248, 0.4)', 'rgba(34, 211, 238, 0.4)', 'rgba(14, 165, 233, 0.4)'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const createStars = () => {
      const count = 50;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    // Create animated squares
    const createSquares = () => {
      const count = 6; // Increased number of squares
      for (let i = 0; i < count; i++) {
        squares.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 40, // Smaller squares
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.3, // Slower rotation
          xSpeed: (Math.random() - 0.5) * 0.3, // Slower movement
          ySpeed: (Math.random() - 0.5) * 0.3,
          scale: Math.random() * 0.5 + 0.5,
          scaleSpeed: (Math.random() - 0.5) * 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
          cornerRadius: Math.random() * 10 + 5 // Rounded corners
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Update and draw squares
      squares.forEach(square => {
        // Update position and rotation
        square.x += square.xSpeed;
        square.y += square.ySpeed;
        square.rotation += square.rotationSpeed;
        square.scale += square.scaleSpeed;
        
        // Bounce off edges
        if (square.x < -100 || square.x > canvas.width + 100) square.xSpeed *= -1;
        if (square.y < -100 || square.y > canvas.height + 100) square.ySpeed *= -1;
        
        // Reverse scale direction at limits
        if (square.scale < 0.5 || square.scale > 1.5) square.scaleSpeed *= -1;
        
        // Draw square with rounded corners
        ctx.save();
        ctx.translate(square.x, square.y);
        ctx.rotate((square.rotation * Math.PI) / 180);
        ctx.scale(square.scale, square.scale);
        
        const size = square.size;
        const r = square.cornerRadius;
        
        ctx.beginPath();
        ctx.moveTo(-size/2 + r, -size/2);
        ctx.lineTo(size/2 - r, -size/2);
        ctx.quadraticCurveTo(size/2, -size/2, size/2, -size/2 + r);
        ctx.lineTo(size/2, size/2 - r);
        ctx.quadraticCurveTo(size/2, size/2, size/2 - r, size/2);
        ctx.lineTo(-size/2 + r, size/2);
        ctx.quadraticCurveTo(-size/2, size/2, -size/2, size/2 - r);
        ctx.lineTo(-size/2, -size/2 + r);
        ctx.quadraticCurveTo(-size/2, -size/2, -size/2 + r, -size/2);
        ctx.closePath();
        
        ctx.fillStyle = square.color;
        ctx.fill();
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };

    createStars();
    createSquares();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />
    </div>
  );
};

export default AnimatedBackground;
