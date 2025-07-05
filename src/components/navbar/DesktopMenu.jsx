"use client";

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const DesktopMenu = memo(({ menuItems, openDropdown, toggleDropdown, setOpenDropdown }) => {
  const dropdownRefs = useRef({});
  const timeoutRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const clearDropdownTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      clearDropdownTimeout();
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearDropdownTimeout();
      window.removeEventListener('resize', handleResize);
    };
  }, [clearDropdownTimeout]);

  const openDropdownOnHover = useCallback(
    (index) => {
      if (isClient && !isMobile) {
        clearDropdownTimeout();
        setOpenDropdown(index);
        setOpenSubmenu(null);
      }
    },
    [isClient, isMobile, setOpenDropdown, clearDropdownTimeout]
  );

  const closeAllDropdowns = useCallback(() => {
    if (isClient && !isMobile) {
      clearDropdownTimeout();
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
        setHoveredCategory(null);
        setHoveredSubItem(null);
        setOpenSubmenu(null);
      }, 200);
    }
  }, [isClient, isMobile, setOpenDropdown, clearTimeout]);

  const handleSubmenuToggle = useCallback(
    (subIndex) => {
      if (isClient && isMobile) {
        setOpenSubmenu(openSubmenu === subIndex ? null : subIndex);
      }
    },
    [isClient, isMobile, openSubmenu]
  );

  const getMaxWidth = useCallback(
    (items) => {
      if (!isClient || !items || !items.length) return 'auto';
      const maxLength = Math.max(...items.map((item) => (item.name || '').length));
      return `${Math.min(maxLength * 8 + 40, 300)}px`;
    },
    [isClient]
  );

  const handleCategoryHover = useCallback(
    (index) => {
      if (!isMobile) {
        clearDropdownTimeout();
        setHoveredCategory(index);
      }
    },
    [isMobile, clearDropdownTimeout]
  );

  const handleCategoryLeave = useCallback(() => {
    if (!isMobile) {
      clearDropdownTimeout();
      timeoutRef.current = setTimeout(() => setHoveredCategory(null), 100);
    }
  }, [isMobile, clearDropdownTimeout]);

  const handleSubItemHover = useCallback(
    (index) => {
      if (!isMobile) {
        clearDropdownTimeout();
        setHoveredSubItem(index);
      }
    },
    [isMobile, clearDropdownTimeout]
  );

  const handleSubItemLeave = useCallback(() => {
    if (!isMobile) {
      clearDropdownTimeout();
      timeoutRef.current = setTimeout(() => setHoveredSubItem(null), 100);
    }
  }, [isMobile, clearDropdownTimeout]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    clearDropdownTimeout();
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setHoveredCategory(null);
      setHoveredSubItem(null);
      setOpenSubmenu(null);
    }, 100);
  }, [isMobile, clearDropdownTimeout]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    clearDropdownTimeout();
  }, [isMobile, clearDropdownTimeout]);

  const handleLinkClick = useCallback(() => {
    if (isMobile) return;
    clearDropdownTimeout();
    setOpenDropdown(null);
    setHoveredCategory(null);
    setHoveredSubItem(null);
    setOpenSubmenu(null);
  }, [isMobile, clearDropdownTimeout]);

  const handleCategoryMouseEnter = useCallback(
    (category) => {
      if (isMobile) return;
      clearDropdownTimeout();
      setHoveredCategory(category);
      setHoveredSubItem(null);
    },
    [isMobile, clearDropdownTimeout]
  );

  const handleSubItemMouseEnter = useCallback(
    (subItem) => {
      if (isMobile) return;
      clearDropdownTimeout();
      setHoveredSubItem(subItem);
    },
    [isMobile, clearDropdownTimeout]
  );

  const renderRegularDropdown = (item, index) => {
    if (!isClient) return null;

    const submenuWidth = getMaxWidth(item.submenu);
    const isActive = openDropdown === index;

    return (
      <div
        className={clsx(
          'dropdown-menu w-full bg-white shadow-lg rounded-md border border-gray-200 z-50 transition-all duration-200',
          isMobile ? 'relative mt-0' : 'absolute left-0 mt-2',
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        style={isMobile ? {} : { width: submenuWidth }}
        onMouseEnter={clearDropdownTimeout}
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-1 whitespace-nowrap px-2">
          {item.submenu.map((subItem, subIndex) => (
            <div key={subIndex} className="relative group">
              <div className="flex items-center">
                <Link
                  href={subItem.href || '#'}
                  target={subItem.external ? '_blank' : '_self'}
                  rel={subItem.external ? 'noopener noreferrer' : ''}
                  className="dropdown-link block w-full text-sm p-2 hover:bg-gray-100 rounded transition-colors duration-150"
                  onClick={() => {
                    if (!subItem.submenu || isMobile) setOpenDropdown(null);
                    if (isMobile && subItem.submenu) handleSubmenuToggle(subIndex);
                  }}
                  onMouseEnter={() => isActive && !isMobile && handleSubItemHover(subIndex)}
                  onMouseLeave={() => isActive && !isMobile && handleSubItemLeave()}
                >
                  {subItem.name}
                  {subItem.external && (
                    <svg className="w-3 h-3 ml-1 inline-block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                  {subItem.submenu && (
                    <svg className="w-3 h-3 ml-1 inline-block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
                {subItem.submenu && isMobile && (
                  <button
                    onClick={() => handleSubmenuToggle(subIndex)}
                    className="text-gray-500 hover:text-cyan-600 ml-1 focus:outline-none transition-colors duration-200"
                  >
                    <svg
                      className={clsx('w-4 h-4 transition-transform duration-200', openSubmenu === subIndex && 'transform rotate-180')}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {subItem.submenu && (
                <div
                  className={clsx(
                    'bg-white shadow-lg rounded-md border border-gray-200 z-50 transition-all duration-200',
                    isMobile ? 'relative mt-0 ml-4 w-full' : 'absolute left-full top-0 w-48',
                    (isMobile ? openSubmenu === subIndex : hoveredSubItem === subIndex)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-2 pointer-events-none'
                  )}
                  style={!isMobile ? { left: '100%', top: '0', marginLeft: '4px' } : {}}
                  onMouseEnter={() => !isMobile && clearDropdownTimeout()}
                  onMouseLeave={() => !isMobile && handleSubItemLeave()}
                >
                  <div className="py-1 px-2">
                    {subItem.submenu.map((subSubItem, subSubIndex) => (
                      <Link
                        key={subSubIndex}
                        href={subSubItem.href || '#'}
                        target={subSubItem.external ? '_blank' : '_self'}
                        rel={subSubItem.external ? 'noopener noreferrer' : ''}
                        className="block text-sm p-2 hover:bg-gray-100 rounded transition-colors duration-150 whitespace-nowrap"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {subSubItem.name}
                        {subSubItem.external && (
                          <svg className="w-3 h-3 ml-1 inline-block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>
    );
  };

  const renderMegaMenu = (item, index) => {
    if (!isClient) return null;

    const isOpen = openDropdown === index;

    return (
      <div
        className={clsx(
          'mega-menu w-full bg-white shadow-xl rounded-lg border border-gray-200 z-50 transition-all duration-200',
          isMobile ? 'relative mt-0' : 'absolute left-0 top-full mt-2',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        style={isMobile ? {} : { minWidth: '600px', maxWidth: '800px', width: 'max-content' }}
        onMouseEnter={clearDropdownTimeout}
        onMouseLeave={handleMouseLeave}
      >
        <div className={clsx('flex', isMobile && 'flex-col')}>
          <div
            className={clsx(
              'bg-gray-50 rounded-l-lg',
              hoveredCategory !== null && !isMobile ? 'w-96 border-r border-gray-200' : 'w-full rounded-r-lg'
            )}
          >
            <div className="p-4">
              <ul className="space-y-1 max-h-screen overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
                {item.submenu.map((category, catIndex) => (
                  <li key={catIndex}>
                    <button
                      className={clsx(
                        'w-full text-left p-3 rounded-md transition-all duration-200 flex items-center justify-between group',
                        hoveredCategory === catIndex ? 'bg-cyan-100 text-cyan-700 shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      onMouseEnter={() => handleCategoryHover(catIndex)}
                      onMouseLeave={handleCategoryLeave}
                      onClick={() => isMobile && setHoveredCategory(hoveredCategory === catIndex ? null : catIndex)}
                    >
                      <span className="text-sm font-medium">{category.category}</span>
                      <svg
                        className={clsx(
                          'w-4 h-4 transition-transform duration-200',
                          hoveredCategory === catIndex && 'transform translate-x-1'
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {hoveredCategory !== null && item.submenu[hoveredCategory] && (
            <div
              className={clsx('p-6 border-l border-gray-200 max-h-screen overflow-y-auto', isMobile ? 'w-full' : 'flex-1')}
              onMouseEnter={clearDropdownTimeout}
              onMouseLeave={handleCategoryLeave}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 gap-2">
                {item.submenu[hoveredCategory].items.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href || '#'}
                    target={subItem.external ? '_blank' : '_self'}
                    rel={subItem.external ? 'noopener noreferrer' : ''}
                    className={clsx(
                      'block p-3 rounded-md transition-all duration-200 group',
                      subItem.isViewAll ? 'bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                    )}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={clsx(
                          'text-sm font-medium',
                          subItem.isViewAll ? 'text-cyan-700' : 'text-gray-700 group-hover:text-cyan-600'
                        )}
                      >
                        {subItem.name}
                      </span>
                      {subItem.isViewAll && (
                        <svg
                          className="w-4 h-4 text-cyan-600 group-hover:transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      {subItem.external && (
                        <svg className="w-3 h-3 ml-1 inline-block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="desktop-menu relative flex flex-col md:flex-row md:space-x-1 lg:space-x-2">
      {menuItems.map((item, index) => (
        <div
          key={item.title}
          className={clsx('menu-item relative', { 'mega-menu-parent': item.isMegaMenu })}
          ref={(el) => (dropdownRefs.current[index] = el)}
          onMouseEnter={() => item.submenu && openDropdownOnHover(index)}
          onMouseLeave={() => item.submenu && closeAllDropdowns()}
        >
          <div className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className={clsx(
                  'menu-link px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center',
                  openDropdown === index ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
                )}
                onClick={() => !item.submenu && setOpenDropdown(null)}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.title}
                {item.submenu && isClient && (
                  <span className="ml-1">
                    <svg
                      className={clsx(
                        'w-4 h-4 inline-block transition-transform duration-200',
                        openDropdown === index && 'transform rotate-180'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                )}
              </Link>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={(e) => isMobile && toggleDropdown(index, e)}
                  className={clsx(
                    'menu-button px-3 py-2 text-sm font-medium transition-colors duration-200',
                    openDropdown === index ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
                  )}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.title}
                </button>
                {item.submenu && isClient && (
                  <button
                    onClick={(e) => isMobile && toggleDropdown(index, e)}
                    className="text-gray-500 hover:text-cyan-600 ml-1 focus:outline-none transition-colors duration-200"
                  >
                    <svg
                      className={clsx(
                        'w-4 h-4 transition-transform duration-200',
                        openDropdown === index && 'transform rotate-180'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
          {item.submenu && (item.isMegaMenu ? renderMegaMenu(item, index) : renderRegularDropdown(item, index))}
        </div>
      ))}
    </div>
  );
});

export default DesktopMenu;