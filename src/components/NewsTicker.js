'use client';

import { useState, useEffect, useRef } from 'react';

export default function NewsTicker() {
  const [isVisible, setIsVisible] = useState(true);
  const [newsItems] = useState([
    '🔥 স্পেশাল অফার: RTX 4070 Ti দিয়ে আপনার ড্রিম পিসি বানান ১৫% ছাড়ে!',
    '🆕 নতুন আসছে: ASUS ROG ও MSI গেমিং ল্যাপটপ স্টক এভেইলেবল!',
    '💼 বাল্ক অর্ডারে বিশেষ ছাড়! ব্যবসায়িক গ্রাহকদের জন্য বিশেষ অফার!',
    '🔌 ল্যাপটপ সার্ভিসিং: ৩০ দিনের ওয়ারেন্টি সহ বিশেষজ্ঞ মেরামত সেবা!',
    '💻 কাস্টম পিসি বিল্ডিং: ৫০,০০০ টাকা থেকে শুরু করে হাই-এন্ড পিসি!',
    '📞 24/7 সাপোর্ট: যেকোনো প্রয়োজনে কল করুন 09678-123456 নম্বরে!'
  ]);

  const tickerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless looping (reduced number of duplicates)
  const tickerItems = [...newsItems, ...newsItems];

  // Handle close button click - only hide for current session
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600/80 to-cyan-500/80 text-white py-1.5 overflow-hidden relative group backdrop-blur-sm">
      <button 
        onClick={handleClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none z-10 p-1"
        aria-label="Close notice"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="container mx-auto">
        <div className="relative w-full overflow-hidden">
          <div 
            className="whitespace-nowrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
              <div 
                ref={tickerRef}
                className={`inline-block whitespace-nowrap ${isPaused ? 'animation-paused' : 'animate-marquee-slow'}`}
              >
                {tickerItems.map((item, index) => (
                  <span key={index} className="mx-8 inline-block text-sm sm:text-base font-medium">
                    {item} •
                  </span>
                ))}
              </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-slow {
          animation: marquee 100s linear infinite;
          display: inline-block;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .animation-paused {
          animation-play-state: paused !important;
        }
        @media (max-width: 640px) {
          @keyframes marquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-60%, 0, 0);
            }
          }
        }
      `}</style>
    </div>
  );
}
