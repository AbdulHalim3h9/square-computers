'use client';

import { useState, useEffect, useRef } from 'react';
import heroImages from '@/constants/heroImages';

const Hero = () => {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
      
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(lastScrollY.current);
          ticking.current = false;
        });
        ticking.current = true;
      }
      
      // Hide/show navbar on scroll
      if (window.scrollY > 100 && window.scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effect
  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
    transition: 'transform 0.1s ease-out'
  };

  const contentStyle = {
    transform: `translate3d(0, ${-scrollY * 0.2}px, 0)`,
    transition: 'transform 0.1s ease-out'
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide((index + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const currentImage = heroImages[currentSlide];

  return (
    <section 
      ref={heroRef}
      id="home" 
      className={`relative h-[90vh] sm:h-[80vh] overflow-hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
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

      {/* Background Slides */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: 1 }}>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentImage.url})`,
            transform: isMobile ? 'scale(1.05)' : 'scale(1.1)',
            ...parallaxStyle
          }}
          aria-label={currentImage.alt}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full" style={isMobile ? {} : contentStyle}>
        <div className="container mx-auto px-4 text-white">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn"
          >
            {currentImage.title}
          </h1>
          <p 
            lang="bn"
            className="text-xl mb-8 max-w-2xl font-[var(--font-siyam-rupali)]"
          >
            {currentImage.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className={`absolute bottom-8 left-0 right-0 transition-opacity duration-300 ${
        scrollY > 100 ? 'opacity-0' : 'opacity-100'
      }`}>
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
    </section>
  );
};

export default Hero;
