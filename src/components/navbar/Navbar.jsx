"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Logo from './Logo';
import { menuItems } from './menuItems';
import '../../styles/navbar.css';

// Dynamically import heavy components with no SSR
const SearchBar = dynamic(() => import('./SearchBar'), { ssr: false });
const DesktopMenu = dynamic(() => import('./DesktopMenu'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });

// Throttle function to limit the rate of function execution
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Memoize navbar classes to prevent recalculation on every render
  const navbarClasses = useMemo(
    () => `fixed w-full z-50 bg-white transition-all duration-300 ease-out ${
      scrolled 
        ? 'shadow-md shadow-cyan-100/20' 
        : 'shadow-sm shadow-transparent'
    }`,
    [scrolled]
  );

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleDropdown = useCallback(
    (index, e) => {
      e?.stopPropagation?.();
      e?.preventDefault?.();
      setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
    },
    []
  );

  // Optimized scroll handler with throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
        setExpandedItems({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
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

      <nav ref={navRef} className={navbarClasses}>
        <div className="w-full relative">
          <div className="flex items-center h-16 sm:h-20 px-4 md:px-6 lg:px-8">
            <Logo isSearchExpanded={isSearchExpanded} />
            <div className="flex-1 flex items-center justify-end">
              <SearchBar
                isSearchExpanded={isSearchExpanded}
                setIsSearchExpanded={setIsSearchExpanded}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <div className="md:hidden flex-shrink-0 w-12 h-12 flex items-center justify-center ml-2 z-60">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                    <span
                      className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5 sm:-translate-y-2'
                      }`}
                      style={{ top: '50%', transformOrigin: 'center', marginTop: isOpen ? '0' : '-0.25rem' }}
                    />
                    <span
                      className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ top: '50%', marginTop: '-0.125rem' }}
                    />
                    <span
                      className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1 sm:translate-y-1.5'
                      }`}
                      style={{ top: '50%', transformOrigin: 'center', marginTop: isOpen ? '0' : '0.25rem' }}
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <DesktopMenu
                menuItems={menuItems}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </div>
          </div>
        </div>
        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          menuItems={menuItems}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />
      </nav>
    </>
  );
}