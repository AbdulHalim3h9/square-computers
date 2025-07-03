'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import SearchBar from './SearchBar';
import DesktopMenu from './DesktopMenu';
import { menuItems } from './menuItems';
import '../../styles/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const dropdownRefs = useRef({});
  const navRef = useRef(null);
  const searchFormRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const closeDropdownTimeout = useRef(null);

  // Toggle expanded state for mobile submenu items
  const toggleItemExpanded = (index, hasSubmenu) => (e) => {
    e.stopPropagation();
    if (hasSubmenu) {
      setExpandedItems(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };

  // Recursive function to render menu items with nested submenus
  const renderMobileMenuItems = (items, level = 0, parentIndex = '') => {
    return items.map((item, index) => {
      // For mega menu items, we need to handle the items array inside each category
      const isMegaMenuItem = item.items && Array.isArray(item.items);
      const hasSubmenu = (item.submenu && item.submenu.length > 0) || isMegaMenuItem;
      const itemKey = parentIndex ? `${parentIndex}-${index}` : `${index}`;
      const isExpanded = expandedItems[itemKey];
      
      // Determine the items to render in the submenu
      const submenuItems = isMegaMenuItem ? item.items : (item.submenu || []);
      
      return (
        <div key={itemKey} className={`${level > 0 ? 'pl-4' : ''}`}>
          <div className={`border-b border-gray-100/50 last:border-b-0`}>
            {(!hasSubmenu && item.href) ? (
              <Link
                href={item.href}
                className={`block px-4 py-3 text-gray-700 hover:text-cyan-500 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-transparent rounded-xl text-${14 + level} font-medium transition-all duration-300 transform hover:translate-x-2`}
                onClick={() => {
                  setIsOpen(false);
                  setExpandedItems({});
                }}
              >
                {item.name || item.title || item.category}
              </Link>
            ) : (
              <div>
                <button
                  onClick={toggleItemExpanded(itemKey, hasSubmenu)}
                  className={`w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 hover:text-cyan-500 rounded-xl text-${14 + level} font-medium transition-all duration-300 ${
                    isExpanded ? 'text-cyan-500' : ''
                  }`}
                  aria-expanded={isExpanded}
                  aria-controls={`submenu-${itemKey}`}
                >
                  <span>{item.name || item.title || item.category}</span>
                  {hasSubmenu && (
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {hasSubmenu && (
                  <div 
                    id={`submenu-${itemKey}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div 
                      className="pl-2 py-2 space-y-1 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {renderMobileMenuItems(submenuItems, level + 1, itemKey)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
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
  }, [isOpen, isSearchExpanded, searchQuery]);

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

  const toggleDropdown = (index, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setOpenDropdown(prevIndex => prevIndex === index ? null : index);
  };

  // Handle mouse enter for menu items
  const handleMouseEnter = (index, hasSubmenu) => {
    if (hasSubmenu) {
      setOpenDropdown(index);
    }
  };

  // Handle mouse leave for menu items
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
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
  }, [isOpen, isSearchExpanded, searchQuery]);

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
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
          
          .navbar-brand {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          
          .square-text {
            color: #4DD0E1;
            text-shadow: 0 2px 4px rgba(77, 208, 225, 0.1);
          }
          
          .computers-text {
            color: #9E9E9E;
          }
        `}</style>

        <nav 
          ref={navRef}
          className={`fixed w-full z-50 bg-white shadow-lg shadow-cyan-100/20 transition-all duration-300 ease-out ${
            scrolled ? 'shadow-md' : 'shadow-sm'
          }`}
        >
          <div className="w-full relative">
            <div className="flex items-center h-16 sm:h-18 md:h-20 px-4">
              {/* Logo - Always visible */}
              <div className="flex-shrink-0 z-50">
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
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 transform hover:scale-105 transition-transform duration-300">
                      <Image 
                        src="/images/logo.png" 
                        alt="Square Computers Logo" 
                        className="object-contain"
                        fill
                        sizes="(max-width: 768px) 40px, (max-width: 1200px) 56px, 64px"
                        priority
                      />
                    </div>
                  </div>
                  <div className={`navbar-brand transition-all duration-300 ${
                    (isMounted && isSearchExpanded) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                  }`}>
                    <h1 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-semibold leading-tight whitespace-nowrap">
                      <span className="square-text">Square</span>{' '}
                      <span className="computers-text">Computers</span>
                    </h1>
                  </div>
                </div>  
              </div>

              {/* Main content area - contains search and right elements */}
              <div className="flex-1 flex items-center">
                {/* Search Bar - Takes remaining space */}
                <div className="relative flex-1 mx-2 transition-all duration-300">
                  <form 
                    ref={searchFormRef}
                    onSubmit={handleSearch}
                    className="relative w-full"
                    onClick={(e) => {
                      if (window.innerWidth < 768) {
                        e.stopPropagation();
                        if (!isSearchExpanded) {
                          setIsSearchExpanded(true);
                        }
                      }
                    }}
                  >
                    <input
                      type="text"
                      placeholder={isSearchExpanded ? "Search products, services..." : "Search..."}
                      className={`w-full px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all duration-300`}
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
                        isSearchExpanded ? 'block' : 'hidden md:block'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Right side - Contains desktop nav and hamburger button */}
                <div className="flex items-center justify-end flex-shrink-0">
                  {/* Desktop Menu - Hidden on mobile */}
                  <div className="hidden md:block">
                    <DesktopMenu 
                      menuItems={menuItems} 
                      dropdownRefs={dropdownRefs}
                      openDropdown={openDropdown}
                      toggleDropdown={toggleDropdown}
                      setOpenDropdown={setOpenDropdown}
                    />
                  </div>

                  {/* Hamburger Button - Always visible on mobile */}
                  <div className={`md:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center ml-2 z-50 ${
                    isSearchExpanded ? 'relative' : ''
                  }`}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-lg text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                      aria-expanded={isOpen}
                    >
                      <span className="sr-only">Open main menu</span>
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                        <span
                          className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                            isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5 sm:-translate-y-2'
                          }`}
                          style={{
                            top: '50%',
                            transformOrigin: 'center',
                            marginTop: isOpen ? '0' : '-0.25rem'
                          }}
                        ></span>
                        <span
                          className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                          }`}
                          style={{
                            top: '50%',
                            marginTop: '-0.125rem'
                          }}
                        ></span>
                        <span
                          className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                            isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1 sm:translate-y-1.5'
                          }`}
                          style={{
                            top: '50%',
                            transformOrigin: 'center',
                            marginTop: isOpen ? '0' : '0.25rem'
                          }}
                        ></span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-out ${
              isOpen 
                ? 'max-h-[90vh] opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="mobile-menu-gradient border-t border-cyan-100/50 flex-1 overflow-hidden">
              <div 
                className="px-4 py-4 space-y-1 sm:px-6 h-full overflow-y-auto"
                style={{
                  maxHeight: 'calc(90vh - 80px)', // Adjust based on your header height
                  WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
                  scrollbarWidth: 'thin', // For Firefox
                }}
              >
                {renderMobileMenuItems(menuItems)}
              </div>
            </div>
          </div>
        </nav>
      </>
    </>
  );
}
