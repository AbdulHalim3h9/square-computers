'use client';

import { useState, useEffect } from 'react';

export default function FloatingHelp() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check if device supports touch
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const toggleMenu = (e) => {
    if (isTouchDevice) {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(prev => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && isExpanded) {
      setIsExpanded(false);
    }
  };

  const items = [
    {
      id: 'call',
      label: 'Call Now',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+8801234567890',
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      shadowColor: 'shadow-blue-200'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: (
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z"/>
        </svg>
      ),
      href: 'https://wa.me/8801234567890?text=Hello%2C%20I%20need%20help%20with%20your%20services',
      bgColor: 'bg-green-500 hover:bg-green-600',
      shadowColor: 'shadow-green-200',
      isExternal: true
    },
    {
      id: 'messenger',
      label: 'Messenger',
      icon: (
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.13 3.26L19.75 8.1l-6.559 6.863z"/>
        </svg>
      ),
      href: 'https://m.me/yourpage',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      shadowColor: 'shadow-blue-200',
      isExternal: true
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div 
        className="flex flex-col items-end space-y-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Contact options */}
        {isExpanded && (
          <div className="flex flex-col items-end space-y-4 animate-in slide-in-from-bottom-5 duration-300">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="relative group transform transition-all duration-300 hover:scale-105"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transitionDelay: `${index * 30}ms`
                }}
              >
                <a
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className={`
                    ${item.bgColor} ${item.shadowColor}
                    w-14 h-14 rounded-full shadow-lg
                    flex items-center justify-center
                    transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:-translate-y-1
                    focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-offset-2
                    animate-in zoom-in-50
                    relative overflow-hidden group/icon
                    before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100
                    before:transition-opacity before:duration-300
                  `}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
                
                {/* Label tooltip */}
                <div className={`
                  absolute right-full mr-4 top-1/2 transform -translate-y-1/2
                  bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap
                  transition-all duration-300 ease-out pointer-events-none
                  shadow-lg
                  ${hoveredItem === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                  group-hover:opacity-100 group-hover:translate-x-0
                `}>
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 
                  border-4 border-transparent border-l-gray-900 transition-transform duration-300
                  group-hover:translate-x-0.5"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Main help button */}
        <div className="relative group flex items-center">
          {/* Help text */}
          <div className={`
            mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap
            transition-all duration-300 ease-out
            shadow-lg
            ${isExpanded ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'}
          `}>
            <span>Need Help?</span>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 
              border-4 border-transparent border-l-gray-900"></div>
          </div>
          
          <button
            onClick={toggleMenu}
            className={`
              w-14 h-14 rounded-full shadow-2xl
              flex items-center justify-center
              transition-all duration-300 transform
              focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2
              relative overflow-hidden
              before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100
              before:transition-opacity before:duration-300
              ${isExpanded 
                ? 'bg-red-500 hover:bg-red-600 rotate-45 hover:scale-110 hover:shadow-3xl' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110 hover:shadow-3xl animate-bounce hover:animate-none'
              }`}
            aria-label={isExpanded ? "Close help menu" : "Open help menu"}
          >
            {isExpanded ? (
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>
          
          {/* Notification dot */}
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping">
              <div className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}