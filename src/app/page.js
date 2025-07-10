'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero/Hero';
import Services from '@/components/home/Services/Services';
import About from '@/components/home/About/About';
import BlogSection from '@/components/home/BlogSection/BlogSection';
import Locations from '@/components/Locations';
import Brands from '@/components/Brands';

// Dynamically import OurClients to avoid SSR issues
const OurClients = dynamic(() => import('@/components/OurClients'), { ssr: true });

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <OurClients />
      <Brands />
      <BlogSection />
      <Locations />
    </main>
  );
}