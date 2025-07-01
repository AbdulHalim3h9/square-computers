'use client';

import { useState, useEffect } from 'react';
import { Code, BarChart3, MessageSquare, Printer, Plane, FileText, Globe, Server, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';
import Locations from '@/components/Locations';
import Brands from '@/components/Brands';
import dynamic from 'next/dynamic';

// Dynamically import BlogList to avoid SSR issues with window object
const BlogList = dynamic(() => import('@/components/BlogList'), { ssr: false });
const { getLatestBlogs } = require('@/data/blogs');

// Get latest blogs for the home page
const latestBlogs = getLatestBlogs(3);

const brands = [
  {
    name: 'Zkteco',
    logo: 'https://images.seeklogo.com/logo-png/29/1/zkteco-logo-png_seeklogo-297954.png',
    url: '/brands/zkteco'
  },
  {
    name: 'HIKVISION',
    logo: 'https://brandlogos.net/wp-content/uploads/2022/01/hikvision-brandlogo.net_-512x512.png',
    url: '/brands/hikvision'
  },
  {
    name: 'Ezviz',
    logo: 'https://brandlogos.net/wp-content/uploads/2025/06/ezviz-logo_brandlogos.net_z9wlt-512x131.png',
    url: '/brands/ezviz'
  },
  {
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    url: '/brands/dell'
  },
  {
    name: 'LG',
    logo: 'https://www.lg.com/lg5-common/images/common/header/logo-b2c.jpg',
    url: '/brands/lg'
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png',
    url: '/brands/samsung'
  },
  {
    name: 'HP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png',
    url: '/brands/hp'
  }
];

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'IT Support and Network Solutions',
    title: 'Professional IT Support',
    subtitle: 'Expert networking and IT support services for businesses of all sizes',
    service: 'Networking & IT Support'
  },
  {
    url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Domain and Hosting Services',
    title: 'Domain & Hosting',
    subtitle: 'Reliable domain registration and web hosting solutions',
    service: 'Domain & Hosting Service'
  },
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Web Development Services',
    title: 'Web Development',
    subtitle: 'Custom websites and web applications that drive results',
    service: 'Web Design & Development'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Software and SMS Solutions',
    title: 'Software & SMS',
    subtitle: 'Custom software and bulk SMS solutions for your business',
    service: 'Software & Bulk SMS'
  },
  {
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Social Media Marketing',
    title: 'Social Media',
    subtitle: 'Boost your online presence with our marketing expertise',
    service: 'Social Media Marketing'
  },
  {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Printing and Graphic Design',
    title: 'Printing & Design',
    subtitle: 'Professional printing and graphic design services',
    service: 'Printing & Graphic Design'
  },
  {
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Visa Services',
    title: 'Visa Services',
    subtitle: 'Comprehensive visa application assistance',
    service: 'Visa Service'
  },
  {
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Travel and Ticket Services',
    title: 'Travel & Tickets',
    subtitle: 'Air and bus ticket booking services',
    service: 'Air & Bus Ticket'
  }
];

const ServiceCard = ({ icon, title, description, gradient }) => (
  <div className="group relative overflow-hidden bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col items-center text-center">
    <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${gradient} text-white`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
    <div className="mt-3">
      <span className="text-xs font-medium text-cyan-600 group-hover:text-cyan-700 transition-colors inline-flex items-center">
        বিস্তারিত জানুন
        <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </div>
);

export default function Home() {
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
    <main>
      <section id="home" className="relative h-[80vh] overflow-hidden">
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
              transform: 'scale(1.05)'
            }}
            aria-label={currentImage.alt}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">{currentImage.title}</h1>
            <p className="text-xl mb-8 max-w-2xl">{currentImage.subtitle}</p>
            <div className="flex space-x-4">
              <a 
                href="#services" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-medium transition duration-300"
              >
                Our Services
              </a>
              <a 
                href="#contact" 
                className="bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white px-8 py-3 rounded-full font-medium transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

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
      </section>

      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              আমরা সব ধরনের আইটি সেবা প্রদান করি, আপনার ব্যবসাকে ডিজিটাল বিশ্বে এগিয়ে নিয়ে যেতে
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {/* First Row */}
            <ServiceCard 
              icon={<Globe className="w-10 h-10" />}
              title="Domain & Hosting"
              description="আপনার অনলাইন উপস্থিতির জন্য নির্ভরযোগ্য domain registration এবং hosting সার্ভিস।"
              gradient="from-blue-500 to-cyan-400"
            />
            
            <ServiceCard 
              icon={<Code className="w-10 h-10" />}
              title="Web Development"
              description="বিজনেস এবং ব্যক্তিগত ব্যবহারের জন্য কাস্টম ওয়েবসাইট ডিজাইন এবং ডেভেলপমেন্ট সার্ভিস।"
              gradient="from-purple-500 to-pink-500"
            />
            
            <ServiceCard 
              icon={<Server className="w-10 h-10" />}
              title="Software & SMS"
              description="বিজনেসের জন্য কাস্টম সফটওয়্যার ডেভেলপমেন্ট এবং bulk SMS সলিউশন।"
              gradient="from-green-500 to-emerald-400"
            />
            
            <ServiceCard 
              icon={<MessageSquare className="w-10 h-10" />}
              title="Social Media"
              description="আপনার অনলাইন উপস্থিতি বাড়াতে সোশ্যাল মিডিয়া মার্কেটিং সার্ভিস।"
              gradient="from-yellow-500 to-amber-400"
            />
            
            <ServiceCard 
              icon={<Printer className="w-10 h-10" />}
              title="Printing & Design"
              description="সব ধরনের প্রিন্টিং এবং গ্রাফিক ডিজাইনের প্রফেশনাল সার্ভিস।"
              gradient="from-red-500 to-pink-400"
            />
            
            {/* Second Row */}
            <ServiceCard 
              icon={<FileText className="w-10 h-10" />}
              title="Visa Service"
              description="ব্যক্তিগত এবং ব্যবসায়িক ভিসা আবেদন প্রক্রিয়াকরণ সার্ভিস।"
              gradient="from-indigo-500 to-purple-400"
            />
            
            <ServiceCard 
              icon={<Plane className="w-10 h-10" />}
              title="Travel Tickets"
              description="বিমান এবং বাসের টিকেট বুকিং সার্ভিস, আপনার ভ্রমণের সব চাহিদা পূরণে।"
              gradient="from-pink-500 to-rose-400"
            />
            
            <ServiceCard 
              icon={<Shield className="w-10 h-10" />}
              title="Cyber Security"
              description="আপনার ডিজিটাল সম্পদ সুরক্ষিত রাখতে সাইবার সিকিউরিটি সলিউশন।"
              gradient="from-violet-500 to-indigo-400"
            />
            
            <ServiceCard 
              icon={<Headphones className="w-10 h-10" />}
              title="IT Support"
              description="২৪/৭ প্রযুক্তি সহায়তা এবং পরামর্শ সেবা।"
              gradient="from-amber-500 to-orange-400"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300"
            >
              সব সেবা দেখুন
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">
            স্কয়ার কম্পিউটার্স টেকনোলজি সলিউশনে একটি বিশ্বস্ত নাম। বছরের পর বছর ধরে আমরা নির্ভরযোগ্য কম্পিউটার সেল, এক্সপার্ট রিপেয়ার সার্ভিস এবং কাস্টমাইজড IT সমাধান দিয়ে আসছি। আমরা ব্যক্তিগত এবং ব্যবসায়িক সব ধরনের চাহিদা পূরণে সচেষ্ট।
          </p>
        </div>
      </section>

      <Brands />

      {/* Latest Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest From Our Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest technology trends, tips, and company news
            </p>
          </div>
          <BlogList blogs={latestBlogs} />
        </div>
      </section>

      <Locations />
    </main>
  );
}