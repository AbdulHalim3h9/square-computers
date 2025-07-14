'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LocalizedText from '../../common/LocalizedText';



const ServiceCard = ({ icon, title, description, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div 
      className="group relative overflow-hidden bg-white rounded-xl p-3 sm:p-4 md:p-6 h-full flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.25), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      }}
    >
      {/* Animated icon container */}
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
      >
        {/* Shine effect */}
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
        
        {/* Icon with bounce */}
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
      
      {/* Title with color change */}
      <motion.h3
        animate={{
          y: isHovered ? -2 : 0,
          color: isHovered ? '#1e40af' : '#1f2937'
        }}
        transition={{ duration: 0.3 }}
      >
        <LocalizedText isTitle className="text-center">{title}</LocalizedText>
      </motion.h3>
      
      {/* Description with fade and slide */}
      <motion.p 
        animate={{
          opacity: isHovered ? 1 : 0.9,
          y: isHovered ? 0 : 5
        }}
        transition={{ duration: 0.3 }}
      >
        <LocalizedText className="text-center">{description}</LocalizedText>
      </motion.p>
      
      {/* Subtle bottom border on hover */}
      <motion.div 
        className="w-1/3 h-0.5 bg-cyan-400 mt-auto"
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '33%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
      
      {/* Background highlight */}
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
  );
};

export default ServiceCard;
