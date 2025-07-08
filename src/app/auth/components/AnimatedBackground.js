'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const animationState = useRef({
    stars: [],
    squares: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = animationState.current;

    // Colors for the squares
    const colors = [
      'rgba(34, 211, 238, 0.15)', // cyan-400 with opacity
      'rgba(103, 232, 249, 0.15)', // cyan-300 with opacity
      'rgba(165, 243, 252, 0.15)', // cyan-200 with opacity
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2; // For better quality on retina displays
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const createStars = () => {
      state.stars = [];
      const count = 50;
      for (let i = 0; i < count; i++) {
        state.stars.push({
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
      state.squares = [];
      const count = 4; // Fewer squares but larger
      for (let i = 0; i < count; i++) {
        state.squares.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 100 + 100, // Larger squares
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5, // More rotation
          xSpeed: (Math.random() - 0.5) * 0.5, // More movement
          ySpeed: (Math.random() - 0.5) * 0.5,
          scale: Math.random() * 0.5 + 0.75, // Start larger
          scaleSpeed: (Math.random() - 0.5) * 0.02, // Faster scaling
          color: colors[Math.floor(Math.random() * colors.length)],
          cornerRadius: 10 // Consistent rounded corners
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      state.stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Update and draw squares
      state.squares.forEach(square => {
        // Update position
        square.x += square.xSpeed;
        square.y += square.ySpeed;
        
        // Bounce off edges with more space
        if (square.x < -square.size/2 || square.x > canvas.width + square.size/2) square.xSpeed *= -1;
        if (square.y < -square.size/2 || square.y > canvas.height + square.size/2) square.ySpeed *= -1;
        
        // Update rotation
        square.rotation += square.rotationSpeed;
        
        // Update scale with smooth pulsing
        square.scale += square.scaleSpeed;
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
      
      animationRef.current = requestAnimationFrame(animate);
    };

    createStars();
    createSquares();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // No dependencies needed now

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
