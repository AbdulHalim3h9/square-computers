'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState, memo } from 'react';
import Image from 'next/image';

// Team member data
const teamMembers = [
  {
    name: 'Md. Ruhul Amin Sarkar',
    role: 'Chairman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    phone: '+880 1711-234567',
    address: '123 Tech Street, Dhaka 1207',
    whatsapp: '+8801711234567',
    messenger: 'https://m.me/ruhulamin.sarkar',
    email: 'ruhul.amin@squarecomputers.com',
  },
  {
    name: 'Md. Shahin Alam',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    phone: '+880 1712-345678',
    address: '123 Tech Street, Dhaka 1207',
    whatsapp: '+8801712345678',
    messenger: 'https://m.me/shahin.alam',
    email: 'shahin.alam@squarecomputers.com',
  },
  {
    name: 'Md. Reswan Islam',
    role: 'Director',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    phone: '+880 1713-456789',
    address: '123 Tech Street, Dhaka 1207',
    whatsapp: '+8801713456789',
    messenger: 'https://m.me/reswan.islam',
    email: 'reswan.islam@squarecomputers.com',
  },
  {
    name: 'Abdul Halim Khan',
    role: 'Web Designer',
    image: '/images/AbdulHalim.jpg',
    phone: '+880 1762-990866',
    address: 'Badda, Dhaka 1212',
    whatsapp: '+8801762990866',
    messenger: 'https://m.me/abdulhalim.khan',
    email: 'abdul.halim@squarecomputers.com',
  },
  {
    name: 'Md. Hamim Sarkar',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    phone: '+880 1715-678901',
    address: '123 Tech Street, Dhaka 1207',
    whatsapp: '+8801715678901',
    messenger: 'https://m.me/hamim.sarkar',
    email: 'hamim.sarkar@squarecomputers.com',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Reusable Team Member Card Component
const TeamMemberCard = memo(({ member, isChairman }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`group bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col aspect-[3/4] relative overflow-hidden ${
      isChairman ? 'w-full max-w-xs' : 'w-full max-w-[240px] md:max-w-[280px]'
    } mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500 z-10`}
      variants={itemVariants}
      whileInView="show"
      whileHover={{ 
        scale: 1.15,
        zIndex: 20,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { 
          type: "spring",
          stiffness: 260,
          damping: 15,
          mass: 0.5
        }
      }}
      whileTap={{ 
        scale: 1.1,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      viewport={{ once: true, margin: "-50px" }}
      role="figure"
      aria-label={`Profile of ${member.name}, ${member.role}`}
    >
    <Image
      src={member.image}
      alt={`${member.name}'s portrait`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      priority={isChairman} // Load chairman's image with higher priority
    />
    {/* Gradient Overlay */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isHovered ? 1 : 0,
        scale: isHovered ? 1.1 : 1
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }}
    />
    {/* Content Overlay */}
    <motion.div 
      className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isHovered ? 1 : 0,
        y: isHovered ? 0 : 30,
        scale: isHovered ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05
      }}
    >
      <motion.div 
        className="mt-auto"
        initial={{ y: 15, opacity: 0 }}
        animate={{ 
          y: isHovered ? 0 : 15,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ 
          delay: isHovered ? 0.15 : 0,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-cyan-300 font-semibold text-base mb-3">{member.role}</p>
        <div className="space-y-2 mt-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="text-sm hover:text-cyan-300 transition-colors">
              {member.phone}
            </a>
          </div>
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs text-gray-300">{member.address}</span>
          </div>
          <div className="flex space-x-4 pt-3 mt-3 border-t border-gray-700">
            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${member.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative p-2 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.498 14.382v-.002c-.31-.138-1.843-.867-2.13-.967-.286-.1-.494-.15-.702.15-.208.3-.799 1.01-.98 1.22-.18.207-.37.23-.687.08-.316-.15-1.336-.513-2.545-1.638-.94-.86-1.576-1.92-1.76-2.245-.184-.323-.02-.5.14-.66.144-.148.32-.386.48-.593.16-.208.214-.353.32-.594.106-.24.053-.45-.027-.63-.08-.18-.702-1.72-.963-2.35-.24-.59-.494-.51-.701-.52-.18-.01-.384-.012-.56-.012-.18 0-.472.03-.72.15-.246.12-.43.39-.43.39s-1.27 2.19-1.45 2.56c-.18.37-.38 1.05.01 2.04.25.63 1.12 2.18 2.48 3.54 1.77 1.77 3.23 2.37 3.6 2.62.37.25.83.35 1.27.26.44-.09 1.35-.57 1.54-1.11.19-.54.19-1 .13-1.1-.06-.11-.23-.18-.49-.3z" />
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.8.483 3.49 1.327 4.95L2 22l5.05-1.327A9.966 9.966 0 0012 22z" fillRule="evenodd" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">Message on WhatsApp</span>
            </a>

            {/* Messenger */}
            <a 
              href={member.messenger} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
              aria-label="Messenger"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">Message on Messenger</span>
            </a>

            {/* Email */}
            <a 
              href={`mailto:${member.email}`} 
              className="group relative p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Email"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">Send Email</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
    {/* Name and role that hides on hover/focus */}
    <motion.div 
      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: isHovered ? 0 : 1,
        y: isHovered ? -10 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <h3 className="text-white font-bold text-base">{member.name}</h3>
      <p className="text-cyan-300 text-sm font-medium">{member.role}</p>
    </motion.div>
    
    {/* Bottom border animation */}
    <motion.div 
      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500"
      initial={{ scaleX: 0, height: 2 }}
      animate={{ 
        scaleX: isHovered ? 1 : 0,
        height: isHovered ? 4 : 2
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.5
      }}
      style={{ originX: 0 }}
    />
    </motion.div>
  );
});

const TeamPage = () => {
  // Separate chairman and other team members
  const chairman = teamMembers[0];
  const otherMembers = teamMembers.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 py-16 relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-cyan-50/70 to-slate-50/70">
        {/* Top left square */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl opacity-40 -translate-x-40 -translate-y-40 transform rotate-12"></div>
        
        {/* Top right circle */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200 to-blue-300 rounded-full opacity-40 translate-x-64 -translate-y-64"></div>
        
        {/* Bottom left circle */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-30 -translate-x-64 translate-y-64"></div>
        
        {/* Center right square */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-2xl opacity-40 translate-x-40 -translate-y-1/2 transform -rotate-12"></div>
        
        {/* Bottom right triangle */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 opacity-40 transform rotate-45 translate-y-1/2 translate-x-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        {/* Header and Chairman Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            className="lg:w-1/2 w-full px-4 sm:px-6 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration:0.6 }}
          >
            <div className="absolute -top-8 -left-4 w-64 h-64 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-30 -z-10 blur-xl"></div>
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Team</span>
            </motion.h1>
            <motion.div 
              className="w-32 h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p 
              className="text-xl text-slate-700 leading-relaxed max-w-2xl font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Committed to excellence and innovation in every project. Our dedicated team brings together diverse expertise to deliver outstanding results.
            </motion.p>
          </motion.div>
          {/* Chairman Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <TeamMemberCard member={chairman} isChairman={true} />
          </div>
        </div>

        {/* Team Members Section */}
        <motion.section
          className="mb-16"
          viewport={{ once: true }}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          <div className="relative inline-block mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 relative z-10 px-6 py-2">
              <span className="relative">
                Our Leadership Team
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-cyan-200/50 -z-10 rounded-full"></span>
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {otherMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} isChairman={false} />
            ))}
          </div>
        </motion.section>


      </div>
    </div>
  );
};

export default TeamPage;