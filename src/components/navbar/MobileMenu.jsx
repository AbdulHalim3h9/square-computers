'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useMenuContext } from './MenuContext';

export default function MobileMenu({ isOpen, setIsOpen, menuItems }) {
  const { expandedItems, setExpandedItems, closeAllMenus } = useMenuContext();

  const toggleItemExpanded = useCallback(
    (itemKey) => {
      setExpandedItems((prev) => ({
        ...prev,
        [itemKey]: !prev[itemKey],
      }));
    },
    [setExpandedItems]
  );

  const renderMobileMenuItems = useCallback(
    (items, level = 0, parentIndex = '') => {
      if (!items?.length) return null;

      return items.map((item, index) => {
        const isMegaMenuItem = item.items && Array.isArray(item.items);
        const hasSubmenu = (item.submenu?.length > 0) || isMegaMenuItem;
        const itemKey = parentIndex ? `${parentIndex}-${index}` : `${index}`;
        const isExpanded = expandedItems[itemKey];
        const submenuItems = isMegaMenuItem ? item.items : item.submenu || [];

        return (
          <div key={itemKey} className={clsx(level > 0 && 'pl-4')}>
            <div className="border-b border-gray-100/50 last:border-b-0">
              {(!hasSubmenu && item.href) ? (
                <Link
                  href={item.href}
                  className={clsx(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:translate-x-2',
                    item.title === 'Admin Panel'
                      ? item.specialClass || 'bg-blue-600 text-white hover:from-blue-700 hover:to-blue-900'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent'
                  )}
                  onClick={closeAllMenus}
                >
                  {item.title === 'Admin Panel' && item.icon && (
                    <span className="inline-block mr-2">
                      {item.icon}
                    </span>
                  )}
                  {item.name || item.title || item.category || 'Unnamed Item'}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => hasSubmenu && toggleItemExpanded(itemKey)}
                    className={clsx(
                      'w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 hover:text-blue-600 rounded-xl text-sm font-medium transition-all duration-300',
                      isExpanded && 'text-blue-600'
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`submenu-${itemKey}`}
                  >
                    <span>{item.name || item.title || item.category || 'Unnamed Item'}</span>
                    {hasSubmenu && (
                      <svg
                        className={clsx(
                          'w-4 h-4 transition-transform duration-300',
                          isExpanded && 'rotate-180'
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  {hasSubmenu && (
                    <div
                      id={`submenu-${itemKey}`}
                      className={clsx(
                        'overflow-hidden transition-all duration-300',
                        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="pl-2 py-2 space-y-1">
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
    },
    [expandedItems, toggleItemExpanded, closeAllMenus]
  );

  if (!menuItems?.length) return null;

  return (
    <div
      className={clsx(
        'md:hidden fixed inset-x-0 top-16 sm:top-20 bg-white shadow-lg z-40 transition-all duration-300 ease-in-out',
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      )}
      style={{ maxHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="border-t border-gray-100">
        <div
          className="px-4 py-2 space-y-1 sm:px-6 overflow-y-auto"
          style={{ 
            maxHeight: 'calc(100vh - 5rem)',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none',
            scrollbarColor: 'transparent transparent'
          }}
        >
          {renderMobileMenuItems(menuItems)}
        </div>
      </div>
    </div>
  );
}