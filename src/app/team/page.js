'use client';

import React, { useState } from 'react';
import TeamCard from '@/components/team/TeamCard';

const TeamPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const handleCardHover = (index) => {
    setExpandedCard(index);
  };
  
  const handleMouseLeave = () => {
    setExpandedCard(null);
  };
  
  const teamMembers = [
    {
      name: 'Md. Ruhul Amin Sarkar',
      role: 'Chairman',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Leading Square Computers with strategic vision and innovative technology solutions. With over 15 years of experience in the IT industry, driving digital transformation for businesses.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Shahin Alam',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Overseeing daily operations and spearheading business development initiatives. Expert in project management and client relationship building.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Reswan Islam',
      role: 'Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Managing strategic partnerships and overseeing technical excellence across all projects. Specialized in enterprise solutions and system architecture.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Abdul Halim',
      role: 'Senior Web Designer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Creating cutting-edge web experiences with modern design principles. Expert in responsive design, UX/UI, and front-end technologies.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Hamim Sarkar',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Leading visual design and brand identity projects. Specializing in corporate branding, digital marketing materials, and creative solutions.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 md:py-24 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12 md:mb-16 px-4">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 md:-top-8 -left-8 md:-left-16 w-20 h-20 md:w-32 md:h-32 bg-cyan-400 rounded-xl opacity-10"></div>
          
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-3 md:mb-4">
            Meet
            <span className="block text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Our Team
            </span>
          </h1>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 md:mt-6 rounded-xl"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Hover or tap on a team member to learn more about them and their role at our company.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div 
        className="w-full overflow-x-hidden overflow-y-visible pb-8 -mx-2 px-2"
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex h-[400px] md:h-[500px] w-full justify-center">
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={index}
              member={member}
              isExpanded={expandedCard === index}
              onHover={() => handleCardHover(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Decorative Elements */}
      <div className="relative mt-16">
        <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-cyan-400 rounded-xl opacity-10"></div>
        <div className="absolute bottom-8 right-1/3 w-16 h-16 bg-blue-500 rounded-xl opacity-15"></div>
      </div>
    </div>
  );
};

export default TeamPage;
