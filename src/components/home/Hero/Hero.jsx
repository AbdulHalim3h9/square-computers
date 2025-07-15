'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import heroImages from '@/constants/heroImages';
import Image from 'next/image';
import Button from '@/components/ui/Button';

// Preload images
const preloadImages = (urls) => {
  if (typeof window !== 'undefined') {
    return urls.map((src) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.loading = 'eager';
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to avoid blocking
      });
    });
  }
  return [];
};

const Placeholder = () => (
  <div className="absolute inset-0 bg-black animate-pulse" />
);

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageQuality, setImageQuality] = useState(75);
  const [direction, setDirection] = useState(1);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const containerRef = useRef(null);

  // Detect network speed for dynamic image quality
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.connection) {
      const { effectiveType } = navigator.connection;
      setImageQuality(effectiveType === '4g' ? 80 : effectiveType === '3g' ? 60 : 50);
    }
  }, []);

  // Preload all images
  useEffect(() => {
    const imagePromises = preloadImages(heroImages.map(img => img.url));
    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
      setAllImagesLoaded(true);
    });
  }, []);

  // Debounced mobile check
  useEffect(() => {
    let timeout;
    const checkIfMobile = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(timeout);
    };
  }, []);

  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // Enhanced parallax transforms
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.1 : 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  // Optimized styles
  const memoizedStyle = useMemo(() => ({
    willChange: 'transform, opacity',
    transformStyle: 'preserve-3d'
  }), []);

  // Auto slide
  useEffect(() => {
    if (isLoading || !allImagesLoaded) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isLoading, allImagesLoaded]);

  const goToSlide = (index) => {
    if (!allImagesLoaded) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide((index + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);
  const currentImage = heroImages[currentSlide];

  // Animation variants for sliding
  const slideVariants = {
    initial: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    animate: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    })
  };

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Suspense fallback={<Placeholder />}>
      <motion.section 
        ref={containerRef}
        id="home" 
        className="relative h-[70vh] sm:h-[75vh] overflow-hidden bg-black" // Added bg-black here
        style={memoizedStyle}
      >
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          aria-label="Previous slide"
          disabled={!allImagesLoaded}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          aria-label="Next slide"
          disabled={!allImagesLoaded}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Background Slides */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black" /> {/* Solid black background */}
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div 
              key={currentSlide}
              className="absolute inset-0"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
              <motion.div 
                style={{
                  ...memoizedStyle,
                  y: yImage,
                  scale: scale.get(),
                  opacity: opacity
                }}
                className="h-full w-full"
              >
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 100vw"
                  quality={80}
                  priority={currentSlide === 0}
                  loading="eager"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 flex items-center h-full"
          style={{ y: yContent }}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4 text-white">
            <div className="inline-block">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-wide mb-3"
                variants={contentVariants}
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
              >
                {currentImage.title}
              </motion.h1>
              <motion.p 
                lang="bn"
                className="text-lg mb-6 max-w-xl font-[var(--font-siyam-rupali)]"
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                variants={contentVariants}
              >
                {currentImage.subtitle}
              </motion.p>
              <motion.div 
                className="w-full sm:w-auto text-left"
                variants={contentVariants}
              >
                <motion.a 
                  href="#contact" 
                  className="group relative overflow-hidden inline-flex items-center px-6 py-3 text-sm font-bold rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                  whileHover={{ 
                    scale: 1.05,
                    x: 4,
                    transition: { 
                      type: 'spring',
                      stiffness: 400,
                      damping: 15
                    } 
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 15px rgba(6, 182, 212, 0.3)',
                      '0 0 25px rgba(6, 182, 212, 0.6)',
                      '0 0 15px rgba(6, 182, 212, 0.3)'
                    ],
                    transition: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut'
                    }
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                    initial={{ x: '-100%' }}
                    whileHover={{ 
                      x: '100%',
                      transition: { duration: 0.6 }
                    }}
                  />
                  <span className="relative flex items-center font-[var(--font-siyam-rupali)]">
                    এখনি যোগাযোগ করুন
                    <motion.svg 
                      className="mr-1 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{
                        x: [0, 3, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut'
                        }
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={!allImagesLoaded}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default Hero;