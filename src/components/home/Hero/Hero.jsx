'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImages from '@/constants/heroImages';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  
  // Check if mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Optimized scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false // Disable layout effect for better performance
  });
  
  // Calculate transforms with optimized values
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"], {
    clamp: false // Allow slight overflow for smoother effect
  });
  
  // Slight parallax for content (moves up slightly on scroll)
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "3%"], {
    clamp: false
  });
  
  // Subtle scale effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.03 : 1.05], {
    clamp: true
  });
  
  // Optimize performance
  const memoizedStyle = useMemo(() => ({
    willChange: 'transform',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    WebkitFontSmoothing: 'antialiased'
  }), []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide((index + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);
  const currentImage = heroImages[currentSlide];

  return (
    <motion.section 
      ref={containerRef}
      id="home" 
      className="relative h-[70vh] sm:h-[75vh] overflow-hidden"
    >
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Background Slides with optimized transforms */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentImage.url})`,
            y: yBg,
            scale: scale,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            ...memoizedStyle
          }}
          aria-label={currentImage.alt}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </motion.div>
      </div>
      
      {/* Content with optimized transforms */}
      <motion.div 
        className="relative z-10 flex items-center h-full"
        style={{
          y: yContent,
          ...memoizedStyle
        }}
      >
        <div className="container mx-auto px-4 text-white">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentImage.title}
          </motion.h1>
          <motion.p 
            lang="bn"
            className="text-xl mb-8 max-w-2xl font-[var(--font-siyam-rupali)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {currentImage.subtitle}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a 
              href="#services" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-medium transition duration-300 text-center"
            >
              Our Services
            </a>
            <a 
              href="#contact" 
              className="bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white px-8 py-3 rounded-full font-medium transition duration-300 text-center"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
