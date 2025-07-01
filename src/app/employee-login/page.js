'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Head from 'next/head';

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

export default function EmployeeLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        router.push('/');
      }
    };

    if (showPopup) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, router]);
  
  // Check if mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, show success on any non-empty email
      if (email && password) {
        alert('Login successful! Redirecting to dashboard...');
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Logo component with enhanced glow effect
  const Logo = ({ className = '' }) => (
    <div className={`${className} relative w-[150px] h-auto sm:w-[200px] md:w-[250px] lg:w-[280px] font-light`}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-cyan-300/5" 
           style={{
             animation: 'pulseSize 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
             filter: 'blur(20px)',
             opacity: 0.5,
             transform: 'scale(10.1)',
             width: '300%',
             height: '300%',
             left: '-30%',
             top: '-90%'
           }}>
      </div>
      
      {/* Secondary glow for more depth */}
      <div className="absolute inset-0 rounded-full bg-lime-500/5" 
           style={{
             animation: 'pulseSize 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
             filter: 'blur(150px)',
             opacity: 0.2,
             transform: 'scale(8.2)',
             width: '200%',
             height: '200%',
             top: '-30%',
             left: '-30%'
           }}>
      </div>
      
      {/* Logo */}
      <div className="relative z-10 transition-all duration-300 hover:scale-105">
        <Image
          src="/images/logo.svg"
          alt="Square Computers Logo"
          width={220}
          height={55}
          className="w-full h-auto object-contain"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.9))',
            transition: 'filter 0.3s ease-in-out',
            animation: 'pulseShadow 3s ease-in-out infinite'
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(34, 211, 238, 1))'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.9))'}
          priority
        />
      </div>
      
      <style jsx>{`
        @keyframes pulseSize {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.9;
          }
        }
        @keyframes pulseShadow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.9));
          }
          50% { 
            filter: drop-shadow(0 0 40px rgba(34, 211, 238, 1));
          }
        }
      `}</style>
    </div>
  );

  // Shared form component for both mobile and desktop layouts
  const LoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
          <p>{error}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-light text-gray-700"
          >
            Password
          </label>
          <button
            type="button"
            className="text-sm font-medium text-cyan-600 hover:text-cyan-500 transition duration-200"
          >
            Forgot?
          </button>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-base font-light text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );

  // Mobile popup content
  const MobilePopup = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md" ref={popupRef}>
        {/* Close Button */}
        <button
          onClick={() => router.push('/')}
          className="absolute right-4 top-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-8 relative overflow-hidden h-64">
          <AnimatedBackground />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <Logo />
            </div>
            <div className="mt-2">
              <h1 className="text-xl font-semibold tracking-wide">
                <span className="text-cyan-300">Square</span>{' '}
                <span className="text-white">Computers</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>
          <LoginForm />
          <div className="mt-6 text-center text-sm">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-cyan-600 hover:text-cyan-800 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Return the appropriate popup based on screen size
  if (isMobile) {
    return <MobilePopup />;
  }

  // Desktop layout - popup with blurred background
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl" ref={popupRef}>
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={() => router.push('/')}
            className="absolute right-4 top-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Side - Branding with Logo */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col justify-center items-center text-center px-8 w-full">
              <div className="mb-6">
                <Logo />
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-light text-gray-300">
                  Welcome to <span className="text-cyan-300 font-semibold">Square Computers</span>
                </h1>
              </div>
              <div className="absolute bottom-8 left-0 right-0">
                <div className="text-xs text-gray-400 text-center">
                  &copy; 2025 Square Computers
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your credentials to access your account
              </p>
              <LoginForm />
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Don't have an account?
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-cyan-600 bg-white hover:bg-gray-50"
                    onClick={() => router.push('/contact')}
                  >
                    Contact Administrator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}