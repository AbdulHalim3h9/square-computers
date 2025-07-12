'use client';

import React from 'react';

const TeamCard = ({ member, height }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl w-full h-full shadow-lg"
      style={{
        height: '100%',
        flexShrink: 0,
        minWidth: '150px',
        width: '100%',
        willChange: 'transform, opacity, z-index',
        transform: 'scale(1)',
        transformOrigin: 'center bottom',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransformStyle: 'preserve-3d',
        transformStyle: 'preserve-3d',
        WebkitTransform: 'translate3d(0,0,0)',
        transform: 'translate3d(0,0,0)',
        transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      onTouchStart={(e) => {
        if (window.innerWidth < 768) {
          e.currentTarget.style.transform = 'scale(1.02)';
        }
      }}
      onTouchEnd={(e) => {
        if (window.innerWidth < 768) {
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        style={{
          backgroundImage: `url(${member.image})`,
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      {/* Accent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white overflow-hidden">
        <div className="transform transition-all duration-500 ease-out group-hover:translate-y-0 translate-y-16">
          <h3 className="text-xl md:text-2xl font-bold mb-1 pt-4">
            {member.name}
          </h3>
        <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-cyan-300 transform transition-all duration-500 group-hover:translate-y-0 translate-y-4 group-hover:opacity-100">
          {member.role}
        </p>
        
        {/* Expanded content that appears on hover */}
        <div className="mt-3 opacity-0 transform translate-y-6 transition-width duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transition-opacity duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="w-10 h-0.5 bg-cyan-400 mb-3"></div>
          <p className="text-xs md:text-sm leading-relaxed text-slate-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
            {member.description}
          </p>
          
        </div>
        
        {/* Social Links */}
        <div className="flex space-x-3 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
          {member.social?.linkedin && (
            <a href={member.social.linkedin} className="text-white hover:text-cyan-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {member.social?.twitter && (
            <a href={member.social.twitter} className="text-white hover:text-cyan-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          )}
          {member.social?.email && (
            <a href={`mailto:${member.social.email}`} className="text-white hover:text-cyan-400 transition-colors">
              <span className="sr-only">Email</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default TeamCard;
