'use client';

import React from 'react';

const TeamCard = ({ member, isExpanded, onHover }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl w-full h-full shadow-lg cursor-pointer transition-all duration-500 ease-out"
      style={{
        flex: isExpanded ? '1 0 55%' : '1 0 15%',
        minWidth: isExpanded ? '55%' : '15%',
        maxWidth: isExpanded ? '55%' : '15%',
        height: '400px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: isExpanded ? 10 : 1,
        margin: '0 0.25rem'
      }}
      onMouseEnter={onHover}
      onClick={onHover} // Add click handler for mobile
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
        style={{
          backgroundImage: `url(${member.image})`,
          width: isExpanded ? '50%' : '100%',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundPosition: isExpanded ? 'left center' : 'center center'
        }}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r from-black/80 to-transparent transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
      
      {/* Content */}
      <div 
        className="absolute inset-0 flex items-center transition-all duration-500 ease-out p-4 sm:p-6"
        style={{
          padding: isExpanded ? '2rem' : '1rem',
          justifyContent: isExpanded ? 'flex-start' : 'flex-end',
          flexDirection: 'column',
          alignItems: isExpanded ? 'flex-start' : 'center',
          textAlign: isExpanded ? 'left' : 'center',
        }}
      >
        {/* Text background overlay - only visible when expanded */}
        {isExpanded && (
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/90 to-black/70 rounded-r-2xl"></div>
        )}
        <div 
          className="w-full transition-all duration-500 ease-out"
          style={{
            maxWidth: isExpanded ? '50%' : '100%',
            marginLeft: isExpanded ? '50%' : '0',
            padding: isExpanded ? '0 1rem' : '0'
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-1 text-white relative z-10">
            {member.name}
          </h3>
          <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-cyan-300 mb-4 relative z-10">
            {member.role}
          </p>
          
          {/* Expanded content */}
          <div 
            className="overflow-hidden transition-all duration-500 ease-out"
            style={{
              maxHeight: isExpanded ? '500px' : '0',
              opacity: isExpanded ? 1 : 0,
              transition: isExpanded ? 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out' : 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out'
            }}
          >
            <div className="w-10 h-0.5 bg-cyan-400 mb-3 relative z-10"></div>
            <p className="text-sm text-white mb-4 relative z-10">
              {member.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 relative z-10">
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
    </div>
  );
};

export default TeamCard;
