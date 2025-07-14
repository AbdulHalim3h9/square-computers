'use client';

import { useState } from 'react';

export default function AnimatedCard({ children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-500 ease-in-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        {children}
      </div>
      {/* Animated background overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 transition-all duration-500 ${
          isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
        }`}
      />
      
      <style jsx global>{`
        @keyframes expand {
          0% {
            transform: scaleY(1);
            opacity: 0.8;
          }
          100% {
            transform: scaleY(1.15);
            opacity: 1;
          }
        }
        
        @keyframes contract {
          0% {
            transform: scaleY(1.15);
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 0.8;
          }
        }
        
        .animate-expand {
          animation: expand 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        
        .animate-contract {
          animation: contract 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
      `}</style>
    </div>
  );
}
