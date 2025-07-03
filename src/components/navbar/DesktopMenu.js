'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const DesktopMenu = ({ menuItems }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const closeDropdownTimeout = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleDropdown = (index, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setOpenDropdown(prevIndex => prevIndex === index ? null : index);
  };

  const openDropdownOnHover = (index) => {
    if (window.innerWidth >= 768) {
      setOpenDropdown(index);
    }
  };

  const closeAllDropdowns = () => {
    if (window.innerWidth >= 768) {
      if (closeDropdownTimeout.current) {
        clearTimeout(closeDropdownTimeout.current);
      }
      closeDropdownTimeout.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (closeDropdownTimeout.current) {
        clearTimeout(closeDropdownTimeout.current);
      }
    };
  }, []);

  return (
    <div className="desktop-menu" ref={el => el && (el.style.display = 'flex')}>
      {menuItems.map((item, index) => (
        <div 
          key={item.title} 
          className="menu-item"
          ref={el => dropdownRefs.current[index] = el}
          onMouseEnter={() => {
            if (closeDropdownTimeout.current) {
              clearTimeout(closeDropdownTimeout.current);
            }
            if (item.submenu) {
              openDropdownOnHover(index);
            }
          }}
          onMouseLeave={closeAllDropdowns}
        >
          <div className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="menu-link"
              >
                {item.title}
                {item.submenu && isClient && (
                  <span className="dropdown-arrow">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                )}
              </Link>
            ) : (
              <>
                <button
                  onClick={(e) => toggleDropdown(index, e)}
                  className={`menu-button ${openDropdown === index ? 'text-cyan-600' : ''}`}
                >
                  {item.title}
                </button>
                {item.submenu && isClient && (
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="text-gray-500 hover:text-cyan-600 ml-0 sm:ml-0.5 focus:outline-none"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
          
          {item.submenu && (
            <div 
              className={`dropdown-menu ${openDropdown === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
              onMouseEnter={() => {
                if (closeDropdownTimeout.current) {
                  clearTimeout(closeDropdownTimeout.current);
                }
              }}
              onMouseLeave={closeAllDropdowns}
            >
              <div className="py-1 whitespace-nowrap px-2">
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href || '#'}
                    target={subItem.external ? "_blank" : "_self"}
                    rel={subItem.external ? "noopener noreferrer" : ""}
                    className="dropdown-link"
                    onClick={() => setOpenDropdown(null)}
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
  );
};

export default DesktopMenu;
