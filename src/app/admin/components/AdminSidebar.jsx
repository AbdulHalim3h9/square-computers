'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { FiChevronDown, FiChevronRight, FiGrid, FiUsers, FiShoppingBag, FiFileText, FiMapPin, FiMail, FiPhone, FiMessageSquare, FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiUser, FiAward, FiTruck, FiPackage, FiDollarSign, FiCreditCard, FiSettings } from 'react-icons/fi';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <FiGrid className="w-5 h-5" />,
    href: '/admin/dashboard',
  },
  {
    title: 'Content Management',
    icon: <FiFileText className="w-5 h-5" />,
    children: [
      { title: 'Services', href: '/admin/services' },
      { title: 'About Us', href: '/admin/about' },
      { title: 'Blogs', href: '/admin/blogs' },
      { title: 'Team', href: '/admin/team' },
      { title: "Chairman's Speech", href: '/admin/chairman-speech' },
      { title: 'MDS Speech', href: '/admin/mds-speech' },
    ],
  },
  {
    title: 'Clients & Partners',
    icon: <FiUsers className="w-5 h-5" />,
    children: [
      { title: 'Clients', href: '/admin/clients' },
      { title: 'Partners', href: '/admin/partners' },
      { title: 'Brands', href: '/admin/brands' },
    ],
  },
  {
    title: 'Contact Information',
    icon: <FiMail className="w-5 h-5" />,
    children: [
      { title: 'Locations', href: '/admin/locations' },
      { title: 'Email', href: '/admin/contact/email' },
      { title: 'Phone/WhatsApp', href: '/admin/contact/phone' },
      { title: 'Facebook Messenger', href: '/admin/contact/facebook' },
      { title: 'Social Links', href: '/admin/social-links' },
    ],
  },
  {
    title: 'Products',
    icon: <FiPackage className="w-5 h-5" />,
    href: '/admin/products',
  },
  {
    title: 'Customers',
    icon: <FiUser className="w-5 h-5" />,
    href: '/admin/customers',
  },
  {
    title: 'Orders & Payments',
    icon: <FiDollarSign className="w-5 h-5" />,
    children: [
      { title: 'Orders', href: '/admin/orders' },
      { title: 'Payments', href: '/admin/payments' },
      { title: 'Invoices', href: '/admin/invoices' },
    ],
  },
  {
    title: 'Settings',
    icon: <FiSettings className="w-5 h-5" />,
    href: '/admin/settings',
  },
];

export default function AdminSidebar({ onClose }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarExpandedItems');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('sidebarExpandedItems', JSON.stringify(expandedItems));
  }, [expandedItems]);

  const toggleItem = useCallback((title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  const isActive = (href) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleKeyDown = (e, title) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(title);
    }
  };

  const renderMenuItem = (item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.title];
    const active = isActive(item.href);

    return (
      <div key={index} className="mb-1">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleItem(item.title)}
              onKeyDown={(e) => handleKeyDown(e, item.title)}
              aria-expanded={isExpanded}
              aria-controls={`submenu-${index}`}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                active
                  ? 'bg-cyan-50 text-cyan-600 border-l-4 border-cyan-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-600'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </div>
              {isExpanded ? (
                <FiChevronDown className="w-4 h-4 transition-transform duration-200" />
              ) : (
                <FiChevronRight className="w-4 h-4 transition-transform duration-200" />
              )}
            </button>
            <div
              id={`submenu-${index}`}
              className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
                isExpanded ? 'max-h-96' : 'max-h-0'
              }`}
            >
              {item.children.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  href={child.href}
                  onClick={onClose}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                    isActive(child.href)
                      ? 'bg-cyan-50 text-cyan-600 font-medium border-l-2 border-cyan-500 -ml-1 pl-3'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-cyan-600'
                  }`}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <Link
            href={item.href || '#'}
            onClick={onClose}
            aria-disabled={!item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
              active
                ? 'bg-cyan-50 text-cyan-600 border-l-4 border-cyan-500'
                : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-600'
            } ${!item.href ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-white border-r border-gray-100 w-64 flex-shrink-0 overflow-y-auto">
      <div className="h-16 flex items-center px-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="p-4 space-y-2 overflow-y-auto" role="navigation" aria-label="Admin Sidebar">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </nav>
    </div>
  );
}