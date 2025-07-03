'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const clients = [
  {
    id: 1,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    width: 180,
    height: 40
  },
  {
    id: 2,
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg',
    width: 100,
    height: 40
  },
  {
    id: 3,
    name: 'HP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
    width: 80,
    height: 40
  },
  {
    id: 4,
    name: 'Lenovo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Lenovo_logo_2015.svg',
    width: 150,
    height: 40
  },
  {
    id: 5,
    name: 'Asus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
    width: 120,
    height: 40
  },
  {
    id: 6,
    name: 'Acer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Acer_logo_%282022%29.svg',
    width: 100,
    height: 40
  },
  {
    id: 7,
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    width: 150,
    height: 40
  },
  {
    id: 8,
    name: 'Intel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
    width: 100,
    height: 40
  },
  {
    id: 9,
    name: 'AMD',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg',
    width: 120,
    height: 40
  },
  {
    id: 10,
    name: 'NVIDIA',
    logo: 'https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg',
    width: 140,
    height: 40
  }
];

// Duplicate the clients array to create a seamless loop
export default function OurClients() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    // Get container width for responsive adjustments
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  if (!isMounted) return null;

  // Calculate animation duration based on container width (smaller number = faster animation)
  const animationDuration = Math.max(containerWidth * 0.02, 10); // in seconds

  // Split clients into two rows
  const halfLength = Math.ceil(clients.length / 2);
  const topRow = [...clients.slice(0, halfLength)];
  const bottomRow = [...clients.slice(halfLength)];

  // Duplicate items to create seamless loop
  const topRowItems = [...topRow, ...topRow];
  const bottomRowItems = [...bottomRow, ...bottomRow];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Valued <span className="text-cyan-600">Clients</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are proud to partner with industry leaders and innovative businesses
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Top Row - Moving Right */}
          <div 
            className="flex mb-6 overflow-hidden"
            style={{
              '--duration': `${animationDuration}s`,
              '--direction': 'normal'
            }}
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {topRowItems.map((client, index) => (
                <div 
                  key={`top-${client.id}-${index}`}
                  className="inline-flex items-center justify-center px-8 mx-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex-shrink-0"
                  style={{
                    width: `${client.width}px`,
                    height: '100px',
                    minWidth: '100px'
                  }}
                >
                  <div className="relative w-full h-16 flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={client.width}
                      height={client.height}
                      className="object-contain max-h-full max-w-full filter hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Moving Left */}
          <div 
            className="flex overflow-hidden"
            style={{
              '--duration': `${animationDuration}s`,
              '--direction': 'reverse'
            }}
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {bottomRowItems.map((client, index) => (
                <div 
                  key={`bottom-${client.id}-${index}`}
                  className="inline-flex items-center justify-center px-8 mx-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex-shrink-0"
                  style={{
                    width: `${client.width}px`,
                    height: '100px',
                    minWidth: '100px'
                  }}
                >
                  <div className="relative w-full h-16 flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={client.width}
                      height={client.height}
                      className="object-contain max-h-full max-w-full filter hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">And many more trusted partners...</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1rem));
          }
        }
        .animate-marquee {
          animation: marquee var(--duration, 20s) linear infinite;
          animation-direction: var(--direction, normal);
          display: inline-block;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
