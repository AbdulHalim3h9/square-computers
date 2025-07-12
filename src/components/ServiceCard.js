'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
  <motion.div 
    className="group relative overflow-hidden bg-white rounded-xl p-3 sm:p-4 md:p-6 h-full flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: isVisible ? 1 : 0, 
      y: isVisible ? 0 : 20,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }}
    whileHover={{ 
      y: -8,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }}
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
  >
    <motion.div 
      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 flex items-center justify-center bg-gradient-to-r ${gradient} text-white relative overflow-hidden`}
      animate={{
        scale: isHovered ? 1.15 : 1,
        rotate: isHovered ? 5 : 0,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 10,
        scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        rotate: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }}
      whileHover={{
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* Animated background shine effect */}
      <motion.div 
        className="absolute inset-0 bg-white opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          x: isHovered ? '100%' : '-100%',
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.1
        }}
      />
      
      {/* Icon with bounce and rotation */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          rotate: isHovered ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
          rotate: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        {React.cloneElement(icon, { 
          className: 'w-6 h-6 sm:w-7 sm:h-7',
        })}
      </motion.div>
    </motion.div>
    
    <motion.h3 
      className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3"
      animate={{
        y: isHovered ? -2 : 0,
        color: isHovered ? '#1e40af' : '#1f2937'
      }}
      transition={{ duration: 0.3 }}
    >
      {title}
    </motion.h3>
    
    <motion.p 
      className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 mt-auto"
      animate={{
        opacity: isHovered ? 1 : 0.9,
        y: isHovered ? 0 : 5
      }}
      transition={{ duration: 0.3 }}
    >
      {description}
    </motion.p>
    
    {/* Animated background highlight */}
    <motion.div 
      className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${gradient.split(' ')[1].replace('to-', '')}10 100%)`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
)};

export default ServiceCard;
