'use client';

import Link from 'next/link';
import { Code, MessageSquare, Printer, Plane, FileText, Globe, Server, Shield, Headphones } from 'lucide-react';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Domain & Hosting",
      description: "আপনার অনলাইন উপস্থিতির জন্য নির্ভরযোগ্য domain registration এবং hosting সার্ভিস।",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "Web Development",
      description: "বিজনেস এবং ব্যক্তিগত ব্যবহারের জন্য কাস্টম ওয়েবসাইট ডিজাইন এবং ডেভেলপমেন্ট সার্ভিস।",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: "Software & SMS",
      description: "বিজনেসের জন্য কাস্টম সফটওয়্যার ডেভেলপমেন্ট এবং bulk SMS সলিউশন।",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "Social Media",
      description: "আপনার অনলাইন উপস্থিতি বাড়াতে সোশ্যাল মিডিয়া মার্কেটিং সার্ভিস।",
      gradient: "from-yellow-500 to-amber-400"
    },
    {
      icon: <Printer className="w-10 h-10" />,
      title: "Printing & Design",
      description: "সব ধরনের প্রিন্টিং এবং গ্রাফিক ডিজাইনের প্রফেশনাল সার্ভিস।",
      gradient: "from-red-500 to-pink-400"
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Visa Service",
      description: "ব্যক্তিগত এবং ব্যবসায়িক ভিসা আবেদন প্রক্রিয়াকরণ সার্ভিস।",
      gradient: "from-indigo-500 to-purple-400"
    },
    {
      icon: <Plane className="w-10 h-10" />,
      title: "Travel Tickets",
      description: "বিমান এবং বাসের টিকেট বুকিং সার্ভিস, আপনার ভ্রমণের সব চাহিদা পূরণে।",
      gradient: "from-pink-500 to-rose-400"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Cyber Security",
      description: "আপনার ডিজিটাল সম্পদ সুরক্ষিত রাখতে সাইবার সিকিউরিটি সলিউশন।",
      gradient: "from-violet-500 to-indigo-400"
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "IT Support",
      description: "২৪/৭ প্রযুক্তি সহায়তা এবং পরামর্শ সেবা।",
      gradient: "from-amber-500 to-orange-400"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative elements - Enhanced */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12 -translate-x-24 -translate-y-24"></div>
      <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute bottom-1/3 -left-12 w-72 h-72 bg-cyan-50 rounded-2xl opacity-80 transform rotate-45"></div>
      <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-blue-50 rounded-2xl opacity-80 transform -rotate-6"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-30 -z-10"></div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4 relative">Our Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto relative">
            আমরা সব ধরনের আইটি সেবা প্রদান করি, আপনার ব্যবসাকে ডিজিটাল বিশ্বে এগিয়ে নিয়ে যেতে
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
      
      {/* Bottom decorative elements - Enhanced */}
      <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute -bottom-8 right-1/3 w-48 h-48 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl opacity-80 transform rotate-45"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-slate-100 rounded-2xl opacity-70 transform -rotate-6"></div>
    </section>
  );
};

export default Services;
