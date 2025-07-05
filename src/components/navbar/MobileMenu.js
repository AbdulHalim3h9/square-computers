import { useCallback } from 'react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, setIsOpen, menuItems, expandedItems, setExpandedItems }) {
  const toggleItemExpanded = useCallback(
    (index, hasSubmenu) => (e) => {
      e.stopPropagation();
      if (hasSubmenu) {
        setExpandedItems((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      }
    },
    [setExpandedItems]
  );

  const renderMobileMenuItems = useCallback(
    (items, level = 0, parentIndex = '') => {
      return items.map((item, index) => {
        const isMegaMenuItem = item.items && Array.isArray(item.items);
        const hasSubmenu = (item.submenu && item.submenu.length > 0) || isMegaMenuItem;
        const itemKey = parentIndex ? `${parentIndex}-${index}` : `${index}`;
        const isExpanded = expandedItems[itemKey];
        const submenuItems = isMegaMenuItem ? item.items : (item.submenu || []);

        return (
          <div key={itemKey} className={`${level > 0 ? 'pl-4' : ''}`}>
            <div className="border-b border-gray-100/50 last:border-b-0">
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
    },
    [expandedItems, toggleItemExpanded, setIsOpen, setExpandedItems]
  );

  return (
    <div
      className={`md:hidden transition-all duration-300 ease-out ${
        isOpen ? 'max-h-[90vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
      }`}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="mobile-menu-gradient border-t border-cyan-100/50 flex-1 overflow-hidden">
        <div
          className="px-4 py-4 space-y-1 sm:px-6 h-full overflow-y-auto"
          style={{ maxHeight: 'calc(90vh - 80px)', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
        >
          {renderMobileMenuItems(menuItems)}
        </div>
      </div>
    </div>
  );
}