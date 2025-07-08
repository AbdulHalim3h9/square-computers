'use client';

import { useEffect, useState } from 'react';

export default function Ribbon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = typeof window !== 'undefined' ? 
      localStorage.getItem('isAuthenticated') : false;
    const user = typeof window !== 'undefined' ? 
      JSON.parse(localStorage.getItem('user') || '{}') : {};
      
    console.log('Ribbon auth check:', { isAuthenticated, user });
    
    // Show ribbon if either authenticated or has admin role
    const shouldShow = !!isAuthenticated || !!user?.isAdmin;
    setIsVisible(shouldShow);
    
    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const updatedAuth = localStorage.getItem('isAuthenticated');
      const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const shouldUpdateShow = !!updatedAuth || !!updatedUser?.isAdmin;
      console.log('Storage changed - Ribbon visibility:', shouldUpdateShow);
      setIsVisible(shouldUpdateShow);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!isVisible) {
    console.log('Ribbon not rendered - not visible');
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-pink-500 bg-size-200 z-50"
      style={{
        backgroundSize: '200% 100%',
        animation: 'gradient 5s ease infinite',
      }}
    >
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
