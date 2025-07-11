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
    <section id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            আমরা সব ধরনের আইটি সেবা প্রদান করি, আপনার ব্যবসাকে ডিজিটাল বিশ্বে এগিয়ে নিয়ে যেতে
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              gradient={service.gradient}
            />
          ))}
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
  );
};

export default Services;
