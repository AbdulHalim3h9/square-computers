'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search as SearchIcon, X } from 'lucide-react';

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
    href: '/services',
    submenu: [
      { name: 'All Services', href: '/services' },
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
      { name: 'Technical Support', href: '/support/technical-support' },
      { name: 'ZKTeco Product Verification', href: 'https://www.zkteco.com/en/anti_counterfeiting_enquiry', external: true },
      { name: 'Software Download Center', href: '#' },
      { name: 'PR', href: '#' }
    ]
  },
  {
    title: 'Employee Login',
    href: '/employee-login'
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRefs = useRef({});
  const navRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchFormRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (isSearchExpanded && searchFormRef.current && !searchFormRef.current.contains(event.target)) {
        if (searchQuery.trim() === '') {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded, searchQuery, searchFormRef, navRef]);

  const toggleDropdown = (index, e) => {
    console.log(e);
    if (e) {
      e.stopPropagation();
      // Only prevent default on mobile to allow proper touch handling
      if (window.innerWidth < 768) {
        e.preventDefault();
      }
    }
    
    // Toggle the dropdown
    console.log(openDropdown);
    setOpenDropdown(openDropdown === index ? null : index);
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
        <div className="xl:container mx-auto px-4">
          <div className="flex items-center h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
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
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 transform hover:scale-105 transition-transform duration-300">
                    <Image 
                      src="/images/logo.png" 
                      alt="Square Computers Logo" 
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className={`navbar-brand md:hidden xl:block transition-all duration-300 ${
                  (isMounted && isSearchExpanded) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                }`}>
                  <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold leading-tight whitespace-nowrap">
                    <span className="square-text">Square</span>{' '}
                    <span className="computers-text">Computers</span>
                  </h1>
                </div>
              </div>  
            </div>

            {/* Search Bar */}
            <div className={`flex-1 px-2 sm:px-4 transition-all duration-300 ${
              isMounted && isSearchExpanded ? 'absolute left-16 right-16 z-50' : 'relative mr-2'
            }`}>
              <form 
                ref={searchFormRef}
                onSubmit={handleSearch} 
                className={`relative w-full transition-all duration-300 ${
                  isMounted && isSearchExpanded ? 'w-full' : 'md:w-full'
                }`}
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    e.stopPropagation();
                    if (!isSearchExpanded) {
                      setIsSearchExpanded(true);
                      setTimeout(() => {
                        searchInputRef.current?.focus();
                      }, 0);
                    }
                  }
                }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={isMounted && isSearchExpanded ? "Search products, services..." : "Search..."}
                  className={`px-4 py-2  rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all duration-300 ${
                    isMounted && isSearchExpanded ? 'w-full' : 'w-24 md:w-full'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        if (searchQuery.trim() === '') {
                          setIsSearchExpanded(false);
                        }
                      }, 200);
                    }
                  }}
                />
                <button 
                  type="submit"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-600 transition-colors ${
                    (isMounted && isSearchExpanded) ? 'block' : 'hidden md:block'
                  }`}
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Desktop Navigation and Hamburger Button */}
            <div className="flex items-center justify-end flex-1">
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-1 font-bold whitespace-nowrap" ref={navRef}>
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
                        onClick={(e) => toggleDropdown(index, e)}
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
                              target={subItem.external ? "_blank" : "_self"}
                              rel={subItem.external ? "noopener noreferrer" : ""}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsOpen(false);
                              }}
                            >
                              {subItem.name}
                              {subItem.external && (
                                <svg className="w-3 h-3 ml-1 inline-block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Hamburger Button - Always visible on mobile */}
              <div className="md:hidden flex-shrink-0 ml-1">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="relative w-6 h-6">
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
                        onClick={(e) => toggleDropdown(index, e)}
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
              {/* Mobile Employee Login Link */}
              <div className="px-4 py-3 border-t border-gray-100/50">
                <Link
                  href="/employee-login"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Employee Login
                </Link>
              </div>
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