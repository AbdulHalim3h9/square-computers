'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * @typedef {Object} SubMenuItem
 * @property {string} name
 * @property {string} [href]
 * @property {boolean} [external]
 * @property {SubMenuItem[]} [submenu]
 * @property {boolean} [isViewAll]
 */

/**
 * @typedef {Object} MegaMenuCategory
 * @property {string} category
 * @property {SubMenuItem[]} items
 */

/**
 * @typedef {Object} MenuItem
 * @property {string} title
 * @property {string} [href]
 * @property {(SubMenuItem[] | MegaMenuCategory[])} [submenu]
 * @property {boolean} [isMegaMenu]
 */

/**
 * DesktopMenu component
 * @param {Object} props
 * @param {MenuItem[]} props.menuItems
 * @param {number | null} props.openDropdown
 * @param {(index: number, event: React.MouseEvent) => void} props.toggleDropdown
 * @param {(index: number | null) => void} props.setOpenDropdown
 */
const DesktopMenu = memo(({ menuItems, openDropdown, toggleDropdown, setOpenDropdown }) => {
  const dropdownRefs = useRef({});
  const timeoutRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null); // Track second-level submenu on mobile

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const debounce = useCallback((fn, delay) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fn, delay);
  }, []);

  const openDropdownOnHover = useCallback((index) => {
    if (isClient && !isMobile) {
      setOpenDropdown(index);
      setOpenSubmenu(null); // Reset second-level submenu on desktop hover
    }
  }, [isClient, isMobile, setOpenDropdown]);

  const closeAllDropdowns = useCallback(() => {
    if (isClient && !isMobile) {
      debounce(() => {
        setOpenDropdown(null);
        setHoveredCategory(null);
        setOpenSubmenu(null);
      }, 300);
    }
  }, [isClient, isMobile, setOpenDropdown]);

  const handleSubmenuToggle = useCallback((subIndex) => {
    if (isClient && isMobile) {
      setOpenSubmenu(openSubmenu === subIndex ? null : subIndex);
    }
  }, [isClient, isMobile, openSubmenu]);
  
  const getMaxWidth = useCallback((items) => {
    if (!isClient || !items || !items.length) return 'auto';
    const maxLength = Math.max(...items.map(item => (item.name || '').length));
    return `${Math.min(maxLength * 8 + 40, 300)}px`;
  }, [isClient]);

  const handleCategoryHover = useCallback((index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredCategory(index);
  }, []);

  const handleCategoryLeave = useCallback(() => {
    debounce(() => setHoveredCategory(null), 150);
  }, []);

  const renderRegularDropdown = (item, index) => {
    if (!isClient) return null;
    
    const submenuWidth = getMaxWidth(item.submenu);
    const isActive = openDropdown === index;

    return (
      <div
        key={index}
        className={clsx(
          'dropdown-menu w-full bg-white shadow-lg rounded-md border border-gray-200 z-50 transition-all duration-200',
          isMobile ? 'relative mt-0' : 'absolute left-0 mt-2',
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        style={isMobile ? {} : { width: submenuWidth }}
        onMouseEnter={() => !isMobile && clearTimeout(timeoutRef.current)}
        onMouseLeave={() => !isMobile && closeAllDropdowns()}
      >
        <div className="py-1 whitespace-nowrap px-2">
          {item.submenu.map((subItem, subIndex) => (
            <div key={subIndex} className="relative">
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
                  onMouseEnter={() => isActive && !isMobile && setHoveredSubItem(subIndex)}
                  onMouseLeave={() => isActive && !isMobile && setHoveredSubItem(null)}
                >
                  {subItem.name}
                  {subItem.external && (
                    <svg className="w-3 h-3 ml-1 inline-block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </Link>
                {subItem.submenu && isMobile && (
                  <button
                    onClick={() => handleSubmenuToggle(subIndex)}
                    className="text-gray-500 hover:text-cyan-600 ml-1 focus:outline-none transition-colors duration-200"
                  >
                    <svg
                      className={clsx(
                        'w-4 h-4 transition-transform duration-200',
                        openSubmenu === subIndex && 'transform rotate-180'
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
              {subItem.submenu && (isMobile ? openSubmenu === subIndex : hoveredSubItem === subIndex) && (
                <div
                  className={clsx(
                    'bg-white shadow-lg rounded-md border border-gray-200 z-50',
                    isMobile ? 'relative mt-0 ml-4 w-full' : 'absolute left-full top-0 mt-[-8px] w-48'
                  )}
                  onMouseEnter={() => !isMobile && setHoveredSubItem(subIndex)}
                  onMouseLeave={() => !isMobile && setHoveredSubItem(null)}
                >
                  <div className="py-1 px-2">
                    {subItem.submenu.map((subSubItem, subSubIndex) => (
                      <Link
                        key={subSubIndex}
                        href={subSubItem.href || '#'}
                        className="block text-sm p-2 hover:bg-gray-100 rounded transition-colors duration-150"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {subSubItem.name}
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
        onMouseEnter={() => !isMobile && clearTimeout(timeoutRef.current)}
        onMouseLeave={() => !isMobile && (handleCategoryLeave(), closeAllDropdowns())}
      >
        <div className={clsx('flex', isMobile && 'flex-col')}>
          <div className={clsx(
            'bg-gray-50 rounded-l-lg',
            hoveredCategory !== null && !isMobile ? 'w-96 border-r border-gray-200' : 'w-full rounded-r-lg'
          )}>
            <div className="p-4">
              <ul
                className="space-y-1 max-h-screen"
                onWheel={(e) => {
                  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                  if ((e.deltaY < 0 && scrollTop === 0) || (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)) {
                    e.preventDefault();
                  }
                }}
              >
                {item.submenu.map((category, catIndex) => (
                  <li key={catIndex}>
                    <button
                      className={clsx(
                        'w-full text-left p-3 rounded-md transition-all duration-200 flex items-center justify-between group',
                        hoveredCategory === catIndex ? 'bg-cyan-100 text-cyan-700 shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      onMouseEnter={() => !isMobile && handleCategoryHover(catIndex)}
                      onMouseLeave={() => !isMobile && handleCategoryLeave()}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryHover(catIndex);
                      }}
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
              className={clsx(
                'p-6 border-l border-gray-200 max-h-screen overflow-y-auto',
                isMobile ? 'w-full' : 'flex-1'
              )}
              onMouseEnter={() => !isMobile && clearTimeout(timeoutRef.current)}
              onMouseLeave={() => !isMobile && handleCategoryLeave()}
              onWheel={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                if ((e.deltaY < 0 && scrollTop === 0) || (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)) {
                  e.preventDefault();
                }
              }}
            >
              <div className="grid grid-cols-1 gap-2">
                {item.submenu[hoveredCategory].items.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href || '#'}
                    className={clsx(
                      'block p-3 rounded-md transition-all duration-200 group',
                      subItem.isViewAll ? 'bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                    )}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div className="flex items-center justify-between">
                      <span className={clsx(
                        'text-sm font-medium',
                        subItem.isViewAll ? 'text-cyan-700' : 'text-gray-700 group-hover:text-cyan-600'
                      )}>
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
    <div className="desktop-menu relative flex flex-col md:flex-row">
      {menuItems.map((item, index) => (
        <div
          key={item.title}
          className={clsx('menu-item relative', { 'mega-menu-parent': item.isMegaMenu })}
          ref={el => (dropdownRefs.current[index] = el)}
          onMouseEnter={() => {
            clearTimeout(timeoutRef.current);
            if (item.submenu) openDropdownOnHover(index);
          }}
          onMouseLeave={() => !item.isMegaMenu && closeAllDropdowns()}
        >
          <div className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className={clsx(
                  'menu-link px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center',
                  openDropdown === index ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
                )}
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
                  onClick={(e) => toggleDropdown(index, e)}
                  className={clsx(
                    'menu-button px-3 py-2 text-sm font-medium transition-colors duration-200',
                    openDropdown === index ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
                  )}
                >
                  {item.title}
                </button>
                {item.submenu && isClient && (
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
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