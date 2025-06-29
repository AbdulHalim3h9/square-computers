'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  {
    title: 'About',
    submenu: [
      { name: 'Chairman Speech', href: '/about/chairman-speech' },
      { name: 'MD Speech', href: '/about/md-speech' },
      { name: 'Mission & Vision', href: '/about/mission-vision' },
      { name: 'Why Us', href: '/about/why-us' },
      { name: 'Life at Square Computer\'s', href: '/about/life' }
    ]
  },
  {
    title: 'Our Team',
    href: '/team'
  },
  {
    title: 'Product',
    submenu: [
      { name: 'Computer & Laptop', href: '/products/computers-laptops' },
      { name: 'Computer & IT Accessories', href: '/products/it-accessories' },
      { name: 'Access Control and Time Attendance', href: '/products/access-control' },
      { name: 'Security Surveillance', href: '/products/security-surveillance' },
      { name: 'Networking Components', href: '/products/networking' },
      { name: 'Point Of Sale - POS', href: '/products/pos' },
      { name: 'Display Solutions', href: '/products/display-solutions' },
      { name: 'Gadgets and Accessories', href: '/products/gadgets' },
      { name: 'IPS and Battery', href: '/products/ips-battery' },
      { name: 'Sound System', href: '/products/sound-system' }
    ]
  },
  {
    title: 'Service',
    submenu: [
      { name: 'Networking & IT Support', href: '/services/networking' },
      { name: 'Domain & Hosting Service', href: '/services/hosting' },
      { name: 'Web Design & Development', href: '/services/web-design' },
      { name: 'Software & Bulk SMS', href: '/services/software-sms' },
      { name: 'Social Media Marketing', href: '/services/social-media' },
      { name: 'Printing & Graphic Design', href: '/services/printing' },
      { name: 'Visa Service', href: '/services/visa' },
      { name: 'Air & Bus Ticket', href: '/services/tickets' }
    ]
  },
  {
    title: 'Brands',
    href: '/brands',
    submenu: [
      { name: 'All Brands', href: '/brands' },
      { name: 'Zkteco', href: '/brands/zkteco' },
      { name: 'HIKVISION', href: '/brands/hikvision' },
      { name: 'Ezviz', href: '/brands/ezviz' },
      { name: 'Dell', href: '/brands/dell' },
      { name: 'LG', href: '/brands/lg' },
      { name: 'Samsung', href: '/brands/samsung' },
      { name: 'HP', href: '/brands/hp' }
    ]
  },
  {
    title: 'Our Clients',
    href: '/clients'
  },
  {
    title: 'Support',
    submenu: [
      { name: 'Technical Support', href: '/support/technical' },
      { name: 'ZKTecho Product Verification', href: '/support/zkteco-verification' }
    ]
  },
  {
    title: 'Employee Login',
    submenu: [
      { name: 'Software Download Center', href: '#' },
      { name: 'PR', href: '#' }
    ]
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRefs = useRef({});
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    // Only toggle on mobile or when explicitly closing
    if (window.innerWidth < 768 || openDropdown === index) {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };
  
  const openDropdownOnHover = (index) => {
    if (window.innerWidth >= 768) {
      setOpenDropdown(index);
    }
  };
  
  const closeAllDropdowns = () => {
    if (window.innerWidth >= 768) {
      setOpenDropdown(null);
    }
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Add custom fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        .navbar-brand {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .navbar-links {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        
        .square-text {
          color: #4DD0E1;
          text-shadow: 0 2px 4px rgba(77, 208, 225, 0.1);
        }
        
        .computers-text {
          color: #9E9E9E;
        }
        
        .navbar-gradient {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(77, 208, 225, 0.1);
        }
        
        .mobile-menu-gradient {
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%);
          backdrop-filter: blur(15px);
        }
      `}</style>

      <nav 
        className="fixed w-full z-50 bg-white shadow-lg shadow-cyan-100/20 transition-all duration-300 ease-out"
      >
        <div className="xl:container mx-auto">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div 
                className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 hover:opacity-90 transition-opacity cursor-pointer"
                onClick={() => {
                  if (pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    router.push('/');
                  }
                }}
              >
              <div className="relative flex-shrink-0">
                <img 
                  src="/images/logo.png" 
                  alt="Square Computers Logo" 
                  className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="navbar-brand md:hidden xl:block">
                <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold leading-tight whitespace-nowrap">
                  <span className="square-text">Square</span>{' '}
                  <span className="computers-text">Computers</span>
                </h1>
              </div>
              </div>  
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 font-bold whitespace-nowrap" ref={navRef}>
              {menuItems.map((item, index) => (
                <div 
                  key={item.title} 
                  className="relative group" 
                  ref={el => dropdownRefs.current[index] = el}
                  onMouseEnter={() => item.submenu && openDropdownOnHover(index)}
                  onMouseLeave={closeAllDropdowns}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="px-3 py-2 flex items-center text-gray-700 hover:text-cyan-600 transition-all duration-300 text-sm md:text-base font-medium"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`px-3 py-2 flex items-center text-gray-700 hover:text-cyan-600 transition-all duration-300 text-sm md:text-base font-medium ${
                        openDropdown === index ? 'text-cyan-600' : ''
                      }`}
                    >
                      {item.title}
                      {item.submenu && (
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  )}
                  
                  {item.submenu && (
                    <div 
                      className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 transition-all duration-200 ${
                        openDropdown === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="py-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href || '#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsOpen(false);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative py-3 w-6 h-6">
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-out ${
            isOpen 
              ? 'max-h-screen opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
          }`}
        >
          <div className="mobile-menu-gradient border-t border-cyan-100/50">
            <div className="px-4 py-6 space-y-2 sm:px-6">
              {menuItems.map((item, index) => (
                <div key={item.title} className="border-b border-gray-100/50 last:border-b-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-gray-700 hover:text-cyan-500 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-transparent rounded-xl text-base sm:text-lg font-medium transition-all duration-300 transform hover:translate-x-2`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleDropdown(openDropdown === index ? null : index)}
                        className={`w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 hover:text-cyan-500 rounded-xl text-base sm:text-lg font-medium transition-all duration-300`}
                      >
                        {item.title}
                        {item.submenu && (
                          <svg 
                            className={`w-4 h-4 transition-transform duration-200 ${openDropdown === index ? 'transform rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                      {item.submenu && (
                        <div className={`overflow-hidden transition-all duration-300 ${openDropdown === index ? 'max-h-96' : 'max-h-0'}`}>
                          <div className="pl-6 py-2 space-y-1">
                            {item.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}