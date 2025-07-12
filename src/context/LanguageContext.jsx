'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
    // Save preference to localStorage
    localStorage.setItem('language', !isEnglish ? 'en' : 'bn');
  };

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setIsEnglish(savedLanguage === 'en');
    } else {
      // Default to browser language if no preference is set
      const browserLang = navigator.language || navigator.userLanguage;
      setIsEnglish(browserLang.startsWith('en'));
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
