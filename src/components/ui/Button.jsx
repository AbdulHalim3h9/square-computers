'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  className = '',
  href,
  as: Component = href ? Link : 'button',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white hover:from-cyan-700 hover:to-cyan-900 focus:ring-cyan-500',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 focus:ring-white',
    outline: 'bg-transparent text-gray-800 border-2 border-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300',
  };

  return (
    <Component
      ref={ref}
      className={clsx(baseClasses, variants[variant], className)}
      href={href}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
