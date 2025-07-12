'use client';

import React from 'react';

// Function to split text into segments of the same script
const splitByScript = (text) => {
  if (!text) return [];
  
  const banglaRange = /[\u0980-\u09FF]/;
  const segments = [];
  let currentSegment = '';
  let currentIsBangla = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charIsBangla = banglaRange.test(char);
    
    if (i === 0) {
      currentIsBangla = charIsBangla;
    }
    
    if (charIsBangla === currentIsBangla) {
      currentSegment += char;
    } else {
      segments.push({
        text: currentSegment,
        isBangla: currentIsBangla
      });
      currentSegment = char;
      currentIsBangla = charIsBangla;
    }
  }
  
  if (currentSegment) {
    segments.push({
      text: currentSegment,
      isBangla: currentIsBangla
    });
  }
  
  return segments;
};

/**
 * LocalizedText - A component that renders text with appropriate font based on language
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The text content to render
 * @param {boolean} [props.isTitle=false] - Whether the text is a title (applies different styling)
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {Object} [props.style] - Additional inline styles to apply
 * @returns {JSX.Element} The rendered component
 */
const LocalizedText = ({ 
  children, 
  isTitle = false, 
  className = '',
  style = {}
}) => {
  if (!children) return null;
  
  const text = String(children);
  const segments = splitByScript(text);
  
  const baseClasses = isTitle 
    ? 'text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3'
    : 'text-gray-600 text-xs sm:text-sm leading-relaxed mb-4';
  
  if (segments.length === 0) {
    return <span className={`${baseClasses} ${className}`} style={style}>{text}</span>;
  }
  
  return (
    <span className={`${baseClasses} leading-relaxed ${className}`} style={style}>
      {segments.map((segment, index) => (
        <span 
          key={index}
          className={segment.isBangla ? 'font-bengali font-medium' : ''}
          style={segment.isBangla ? { 
            fontFamily: 'Siyam Rupali, var(--font-bengali)',
            fontWeight: 500,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          } : {}}
        >
          {segment.text}
        </span>
      ))}
    </span>
  );
};

export default LocalizedText;
