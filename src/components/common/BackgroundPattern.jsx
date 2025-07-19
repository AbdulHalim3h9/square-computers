'use client';
import React from 'react';

const BackgroundPattern = ({ circularPosition = 'top' }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Decorative elements - Enhanced */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12 -translate-x-24 -translate-y-24"></div>
      <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute bottom-1/3 -left-12 w-72 h-72 bg-cyan-50 rounded-2xl opacity-80 transform rotate-45"></div>
      <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-blue-50 rounded-2xl opacity-80 transform -rotate-6"></div>
      
      {/* Bottom decorative elements - Enhanced */}
      <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute -bottom-8 right-1/3 w-48 h-48 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl opacity-80 transform rotate-45"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-slate-100 rounded-2xl opacity-70 transform -rotate-6"></div>
      
      {/* Circular background pattern */}
      <div className={`absolute ${circularPosition === 'top' ? '-top-8' : 'top-1/2'} left-1/2 transform -translate-x-1/2 w-48 h-48 bg-cyan-100 rounded-full opacity-20`}></div>
    </div>
  );
};

export default BackgroundPattern;
