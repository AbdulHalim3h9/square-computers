'use client';

import { useRef, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useMenuContext } from './MenuContext';

const DesktopMenu = memo(({ menuItems }) => {
  const { openDropdown, setOpenDropdown, activeCategory, setActiveCategory } = useMenuContext();
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenDropdown]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setActiveCategory(0);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setOpenDropdown, setActiveCategory]);

  const clearMenuTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (index) => {
      clearMenuTimeout();
      setOpenDropdown(index);
      setActiveCategory(0);
    },
    [clearMenuTimeout, setOpenDropdown, setActiveCategory]
  );

  const handleMouseLeave = useCallback(() => {
    clearMenuTimeout();
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  }, [clearMenuTimeout, setOpenDropdown]);

  const handleToggleClick = useCallback(
    (index, e) => {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === index ? null : index));
      setActiveCategory(0);
    },
    [setOpenDropdown, setActiveCategory]
  );

  const handleLinkClick = useCallback(
    (index, hasSubmenu) => (e) => {
      if (hasSubmenu) {
        e.preventDefault();
        setOpenDropdown((prev) => (prev === index ? null : index));
        setActiveCategory(0);
      }
    },
    [setOpenDropdown, setActiveCategory]
  );

  const getMaxWidth = (items) => {
    if (!items?.length) return 'auto';
    const maxLength = Math.max(...items.map((item) => (item.name || '').length));
    return `${Math.min(maxLength * 8 + 40, 300)}px`;
  };

  const renderRegularDropdown = (item, index) => {
    if (!item.submenu?.length) return null;
    const isOpen = openDropdown === index;

    return (
      <div
        className={clsx(
          'absolute left-0 mt-6 bg-white rounded-md shadow-lg z-50 transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        style={{ width: getMaxWidth(item.submenu) }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        role="menu"
        aria-labelledby={`menu-button-${index}`}
      >
        <div className="py-1">
          {item.submenu.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              href={subItem.href || '#'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => setOpenDropdown(null)}
              role="menuitem"
            >
              {subItem.name || 'Unnamed Item'}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderMegaMenu = (item, index) => {
    if (!item.submenu?.length) return null;
    const isOpen = openDropdown === index;

    return (
      <div
        className={clsx(
          'absolute left-0 mt-6 bg-white rounded-md shadow-lg z-50 p-4 transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        style={{ minWidth: '600px', maxWidth: '800px' }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        role="menu"
        aria-labelledby={`menu-button-${index}`}
      >
        <div className="flex">
          <div className="w-48 flex-shrink-0 border-r border-gray-200 pr-4">
            {item.submenu.map((category, catIndex) => (
              <button
                key={catIndex}
                onClick={() => setActiveCategory(catIndex)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(catIndex);
                  }
                }}
                className={clsx(
                  'w-full text-left px-4 py-2 text-sm rounded-md mb-1 focus:outline-none',
                  activeCategory === catIndex
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
                )}
                role="menuitem"
                tabIndex={0}
              >
                {category.category || 'Unnamed Category'}
              </button>
            ))}
          </div>
          <div className="flex-1 pl-4">
            <div className="grid grid-cols-2 gap-4">
              {item.submenu[activeCategory]?.items?.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href || '#'}
                  className="block p-3 rounded-md hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600 focus:bg-gray-50 focus:text-blue-600 focus:outline-none"
                  onClick={() => setOpenDropdown(null)}
                  role="menuitem"
                >
                  {subItem.name || 'Unnamed Item'}
                </Link>
              )) || <div className="p-3 text-sm text-gray-500">No items available</div>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!menuItems?.length) return null;

  return (
    <div className="hidden md:flex items-center space-x-1" ref={menuRef} role="navigation">
      {menuItems.map((item, index) => {
        const isAdminPanel = item.title === 'Admin Panel';
        return (
          <div key={index} className="relative h-full flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className={clsx(
                  'px-4 py-4 text-sm font-medium rounded-md focus:outline-none whitespace-nowrap',
                  isAdminPanel
                    ? item.specialClass || 'bg-blue-600 text-white hover:bg-blue-700'
                    : openDropdown === index
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100',
                  'flex items-center space-x-1',
                  isAdminPanel && 'px-4 py-2.5 font-semibold shadow-md hover:shadow-lg'
                )}
                onClick={handleLinkClick(index, !!item.submenu)}
                onKeyDown={(e) => {
                  if (item.submenu?.length && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setOpenDropdown(openDropdown === index ? null : index);
                  }
                }}
                id={`menu-button-${index}`}
                aria-haspopup={!!item.submenu?.length}
                aria-expanded={openDropdown === index}
                aria-controls={item.submenu?.length ? `menu-${index}` : undefined}
                role="button"
              >
                {isAdminPanel && item.icon && (
                  <span className="mr-1">
                    {item.icon}
                  </span>
                )}
                {item.title || 'Unnamed Menu'}
                {item.submenu?.length && (
                  <svg
                    className={clsx(
                      'w-4 h-4 ml-1 inline-block transition-transform duration-300',
                      openDropdown === index && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            ) : (
              <button
                className={clsx(
                  'px-4 py-4 text-sm font-medium rounded-md focus:outline-none whitespace-nowrap',
                  isAdminPanel
                    ? item.specialClass || 'bg-blue-600 text-white hover:bg-blue-700'
                    : openDropdown === index
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100',
                  'flex items-center space-x-1',
                  isAdminPanel && 'px-4 py-2.5 font-semibold shadow-md hover:shadow-lg'
                )}
                onClick={(e) => item.submenu?.length && handleToggleClick(index, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.submenu?.length && setOpenDropdown(openDropdown === index ? null : index);
                  }
                }}
                onMouseEnter={() => item.submenu?.length && handleMouseEnter(index)}
                onMouseLeave={() => item.submenu?.length && handleMouseLeave()}
                id={`menu-button-${index}`}
                aria-haspopup={!!item.submenu?.length}
                aria-expanded={openDropdown === index}
                aria-controls={item.submenu?.length ? `menu-${index}` : undefined}
              >
                {isAdminPanel && item.icon && (
                  <span className="mr-1">
                    {item.icon}
                  </span>
                )}
                {item.title || 'Unnamed Menu'}
                {item.submenu?.length && (
                  <svg
                    className={clsx(
                      'w-4 h-4 ml-1 inline-block transition-transform duration-300',
                      openDropdown === index && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            )}
            {item.submenu?.length && (
              <div id={`menu-${index}`} role="menu">
                {item.isMegaMenu ? renderMegaMenu(item, index) : renderRegularDropdown(item, index)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default DesktopMenu;