'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

// Import critical components directly
import Hero from '@/components/home/Hero/Hero';

// Lazy load non-critical components
const Services = dynamic(() => import('@/components/home/Services/Services'), {
  loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse" />
});

const About = dynamic(() => import('@/components/home/About/About'), {
  loading: () => <div className="min-h-[500px] bg-gray-100 animate-pulse" />
});

const BlogSection = dynamic(() => import('@/components/home/BlogSection/BlogSection'), {
  loading: () => <div className="min-h-[800px] bg-white animate-pulse" />
});

const Locations = dynamic(() => import('@/components/Locations'), {
  loading: () => <div className="min-h-[500px] bg-gray-50 animate-pulse" />
});

const Brands = dynamic(() => import('@/components/Brands'), {
  loading: () => <div className="min-h-[300px] bg-white animate-pulse" />
});

const OurClients = dynamic(() => import('@/components/OurClients'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />
});

const ScrollAnimation = dynamic(() => import('@/components/ScrollAnimation'), {
  ssr: false
});

// Optimized animations with better performance
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.5,
      bounce: 0.1,
      duration: 0.5
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.05,
      staggerDirection: 1
    }
  }
};

// Preload function for non-critical resources
const usePreloadResources = () => {
  useEffect(() => {
    // Preload above-the-fold images
    const preloadImages = [
      // Add critical image paths here if needed
    ];

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Mark when component is mounted (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  usePreloadResources();

  // Only render animations on client-side to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-screen bg-gray-50 animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <AnimatePresence mode="wait">
        {/* Hero Section - Critical: Load immediately */}
        <motion.section
          key="hero"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative"
        >
          <motion.div variants={fadeInUp}>
            <Hero />
          </motion.div>
        </motion.section>

        {/* Services Section - Deferred: Load after hero */}
        <ScrollAnimation key="services">
          <section className="bg-white" style={{ viewTransitionName: 'services' }}>
            <Suspense fallback={<div className="min-h-[600px] bg-gray-50" />}>
              <Services />
            </Suspense>
          </section>
        </ScrollAnimation>

        {/* About Section */}
        <ScrollAnimation key="about">
          <section className="bg-gray-50">
            <Suspense fallback={<div className="min-h-[500px] bg-gray-100" />}>
              <About />
            </Suspense>
          </section>
        </ScrollAnimation>

        {/* Our Clients */}
        <ScrollAnimation key="clients">
          <section className="bg-white">
            <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
              <OurClients />
            </Suspense>
          </section>
        </ScrollAnimation>

        {/* Brands */}
        <ScrollAnimation key="brands">
          <section className="bg-gray-50">
            <Suspense fallback={<div className="min-h-[300px] bg-white" />}>
              <Brands />
            </Suspense>
          </section>
        </ScrollAnimation>

        {/* Blog Section */}
        <ScrollAnimation key="blog">
          <section className="bg-white">
            <Suspense fallback={<div className="min-h-[800px] bg-gray-50" />}>
              <BlogSection />
            </Suspense>
          </section>
        </ScrollAnimation>

        {/* Locations */}
        <ScrollAnimation key="locations">
          <section className="bg-gray-50">
            <Suspense fallback={<div className="min-h-[500px] bg-white" />}>
              <Locations />
            </Suspense>
          </section>
        </ScrollAnimation>
      </AnimatePresence>
    </>
  );
}