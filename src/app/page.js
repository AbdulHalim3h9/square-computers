'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero/Hero';
import Services from '@/components/home/Services/Services';
import About from '@/components/home/About/About';
import BlogSection from '@/components/home/BlogSection/BlogSection';
import Locations from '@/components/Locations';
import Brands from '@/components/Brands';
import ScrollAnimation from '@/components/ScrollAnimation';

// Dynamically import OurClients to avoid SSR issues
const OurClients = dynamic(() => import('@/components/OurClients'), { ssr: true });

// Optimized animations with better performance
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.7,
      bounce: 0.2,
      duration: 0.6
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
      delayChildren: 0.05
    }
  }
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative"
      >
        <motion.div variants={fadeInUp}>
          <Hero />
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <ScrollAnimation>
        <section className="bg-white">
          <Services />
        </section>
      </ScrollAnimation>

      {/* About Section */}
      <ScrollAnimation>
        <section className="bg-gray-50">
          <About />
        </section>
      </ScrollAnimation>

      {/* Our Clients */}
      <ScrollAnimation>
        <section className="bg-white">
          <OurClients />
        </section>
      </ScrollAnimation>

      {/* Brands */}
      <ScrollAnimation>
        <section className="bg-gray-50">
          <Brands />
        </section>
      </ScrollAnimation>

      {/* Blog Section */}
      <ScrollAnimation>
        <section className="bg-white">
          <BlogSection />
        </section>
      </ScrollAnimation>

      {/* Locations */}
      <ScrollAnimation>
        <section className="bg-gray-50">
          <Locations />
        </section>
      </ScrollAnimation>
    </>
  );
}