'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';

const TeamCard = ({ member, isChairman, isExpanded, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isExpanded || (isHovered && !document.querySelector('.expanded-card'));

  const handleClick = (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    e.stopPropagation();
    onClick(member.name);
  };

  return (
    <motion.div
      className={`group bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col relative overflow-hidden ${
        isChairman ? 'w-full max-w-xs' : 'w-full max-w-[280px] md:max-w-[300px]'
      } mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 min-h-[400px] ${isExpanded ? 'expanded-card scale-105 md:scale-100' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      whileHover={{
        scale: 1.15,
        zIndex: 20,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { type: 'spring', stiffness: 260, damping: 15, mass: 0.5 },
      }}
      viewport={{ once: true, margin: '-50px' }}
      role="figure"
      aria-label={`Profile of ${member.name}, ${member.role}`}
    >
      <Image
        src={member.image}
        alt={`${member.name}'s portrait`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={isChairman}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/90 via-black/60 to-transparent"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05 }}
      >
        <motion.div
          className="mt-auto"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: isActive ? 0 : 15, opacity: isActive ? 1 : 0 }}
          transition={{ delay: isActive ? 0.15 : 0, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-lg sm:text-xl font-bold whitespace-normal break-words">{member.name}</h3>
          <p className="text-cyan-300 font-semibold text-sm sm:text-base mb-3 whitespace-normal break-words">
            {member.role}
          </p>
          <div className="space-y-2 mt-2 w-full">
            <div className="flex items-start">
              <svg
                className="w-4 h-4 mr-2 text-cyan-300 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href={`tel:${member.phone.replace(/\s+/g, '')}`}
                className="text-xs sm:text-sm text-white hover:text-cyan-300 transition-colors break-all"
              >
                {member.phone}
              </a>
            </div>
            <div className="flex items-start">
              <svg
                className="w-4 h-4 mr-2 text-cyan-300 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs text-white/90 break-words">{member.address}</span>
            </div>
            <div className="flex space-x-4 pt-3 mt-3 border-t border-gray-700">
              <a
                href={`https://wa.me/${member.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.498 14.382v-.002c-.31-.138-1.843-.867-2.13-.967-.286-.100-.494-.15-.702.15-.208.3-.799 1.01-.98 1.22-.18.207-.37.23-.687.08-.316-.15-1.336-.513-2.545-1.638-.94-.86-1.576-1.92-1.76-2.245-.184-.323-.02-.5.14-.66.144-.148.32-.386.48-.593.16-.208.214-.353.32-.594.106-.24.053-.45-.027-.63-.08-.18-.702-1.72-.963-2.35-.24-.59-.494-.51-.701-.52-.18-.01-.384-.012-.56-.012-.18 0-.472.03-.72.15-.246.12-.43.39-.43.39s-1.27 2.19-1.45 2.56c-.18.37-.38 1.05.01 2.04.25.63 1.12 2.18 2.48 3.54 1.77 1.77 3.23 2.37 3.6 2.62.37.25.83.35 1.27.26.44-.09 1.35-.57 1.54-1.11.19-.54.19-1 .13-1.1-.06-.11-.23-.18-.49-.3z"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.8.483 3.49 1.327 4.95L2 22l5.05-1.327A9.966 9.966 0 0012 22z"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Message on WhatsApp
                </span>
              </a>
              <a
                href={member.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                aria-label="Messenger"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"
                  />
                </svg>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Message on Messenger
                </span>
              </a>
              <a
                href={`mailto:${member.email}`}
                className="group relative p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Email"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Send Email
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isActive ? 0 : 1, y: isActive ? -10 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="text-white font-bold text-base">{member.name}</h3>
        <p className="text-cyan-300 text-sm font-medium">{member.role}</p>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500"
        initial={{ scaleX: 0, height: 2 }}
        animate={{ scaleX: isActive ? 1 : 0, height: isActive ? 4 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, mass: 0.5 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

TeamCard.displayName = 'TeamCard';

export default TeamCard;