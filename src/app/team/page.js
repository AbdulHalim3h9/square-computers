'use client';

import React from 'react';
import TeamCard from '@/components/team/TeamCard';

const TeamPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-16 w-32 h-32 bg-cyan-400 rounded-xl opacity-10"></div>
          
          <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-4">
            Meet
            <span className="block text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Our Team
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-xl"></div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4">
          {teamMembers.map((member, index) => {
            // Calculate height based on position (tallest in the middle)
            const middleIndex = Math.floor(teamMembers.length / 2);
            const distanceFromMiddle = Math.abs(index - middleIndex);
            // Base height is 420px for middle, reduce by 40px for each step from middle
            const cardHeight = 420 - (distanceFromMiddle * 40);
            
            return (
              <div 
                key={index}
                className={`flex items-end transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  index === middleIndex ? 'sm:row-span-1 h-full' : 'h-auto'
                }`}
                style={{
                  minHeight: index === middleIndex ? '480px' : `${Math.max(320, cardHeight)}px`,
                  height: 'auto',
                  transform: 'scale(1)',
                  zIndex: 1,
                  position: 'relative',
                  width: '100%',
                  maxWidth: '260px',
                  margin: '0 auto',
                  willChange: 'transform, z-index, opacity',
                  transitionProperty: 'transform, z-index, opacity',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDuration: '700ms',
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 768) {
                    const cards = e.currentTarget.parentElement.children;
                    const hoveredIndex = Array.from(cards).indexOf(e.currentTarget);
                    
                    for (let i = 0; i < cards.length; i++) {
                      const card = cards[i];
                      const distance = Math.abs(i - hoveredIndex);
                      
                      if (i === hoveredIndex) {
                        // Hovered card
                        card.style.transform = 'scale(1.2)';
                        card.style.zIndex = '20';
                        card.style.opacity = '1';
                      } else if (distance === 1) {
                        // Adjacent cards
                        card.style.transform = 'scale(0.95)';
                        card.style.opacity = '0.9';
                        card.style.zIndex = '10';
                      } else if (distance === 2) {
                        // Cards two positions away
                        card.style.transform = 'scale(0.9)';
                        card.style.opacity = '0.8';
                        card.style.zIndex = '5';
                      } else {
                        // All other cards
                        card.style.transform = 'scale(0.85)';
                        card.style.opacity = '0.7';
                        card.style.zIndex = '1';
                      }
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth >= 768) {
                    const cards = e.currentTarget.parentElement.children;
                    for (let card of cards) {
                      card.style.transform = 'scale(1)';
                      card.style.opacity = '1';
                      card.style.zIndex = '1';
                    }
                  }
                }}
              >
                <TeamCard 
                  member={member} 
                  height={cardHeight} 
                />
              </div>
            );
          })}
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