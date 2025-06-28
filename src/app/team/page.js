'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import styles from './team.module.css';

const teamMembers = [
  {
    name: 'Md. Ruhul Amin Sarkar',
    position: 'Chairman',
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
    position: 'Managing Director',
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
    position: 'Director',
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
    position: 'Senior Web Designer',
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
    position: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    description: 'Leading visual design and brand identity projects. Specializing in corporate branding, digital marketing materials, and creative solutions.',
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  }
];

// Disable automatic image optimization for this page
export const dynamic = 'force-static';

export default function TeamPage() {
  useEffect(() => {
    console.log('Team members data:', teamMembers);
    // This helps prevent the preload warning
    const links = document.querySelectorAll('link[rel=preload]');
    links.forEach(link => {
      if (link.as === 'image') {
        link.remove();
      }
    });
  }, []);

  console.log('Rendering team page with', teamMembers.length, 'members');

  return (
    <div className={styles.teamContainer}>
      {/* Team Members */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          {/* Leadership Section */}
          <div className="max-w-7xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Meet Our Expert Team</h2>
              <div className="w-64 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 mx-auto"></div>
            </div>
            
            {/* Chairman - Featured */}
            {teamMembers.filter(m => m.position.toLowerCase().includes('chairman')).map((member, index) => (
              <div key={`chairman-${index}`} className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 relative overflow-hidden">
                    <div className="aspect-[5/3] lg:aspect-auto lg:h-full relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                      {member.position}
                    </div>
                    
                    <h3 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
                      {member.name}
                    </h3>
                    
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      {member.description}
                    </p>
                    
                    <div className="flex gap-4">
                      <a href={member.social.linkedin} className="group bg-slate-100 hover:bg-cyan-500 p-3 rounded-xl transition-all duration-300">
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href={member.social.email} className="group bg-slate-100 hover:bg-cyan-500 p-3 rounded-xl transition-all duration-300">
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* All Team Members */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {teamMembers
                .filter(m => !m.position.toLowerCase().includes('chairman'))
                .map((member, index) => (
                <div key={`member-${index}`} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="flex">
                    <div className="w-32 h-40 relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit">
                        {member.position}
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-cyan-600 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {member.description}
                      </p>
                      <div className="flex gap-2">
                        <a href={member.social.linkedin} className="text-slate-400 hover:text-cyan-500 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a href={member.social.email} className="text-slate-400 hover:text-cyan-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-lg transform rotate-12"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-300 rounded-lg transform -rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-500 rounded-lg transform rotate-45"></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-cyan-400 rounded-lg transform -rotate-45"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Team</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            The talented professionals behind Square Computers, bringing innovation, expertise, and excellence to every technology solution we deliver.
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <span className="text-cyan-400 font-bold">{teamMembers.length}</span>
              </div>
              <span>Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <span className="text-cyan-400 font-bold">15+</span>
              </div>
              <span>Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}