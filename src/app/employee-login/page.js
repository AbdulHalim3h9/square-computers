'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Logo component using Next.js Image component
  const Logo = ({ className = '' }) => (
    <div className={`${className} w-[120px] h-auto md:w-[180px] lg:w-[220px] font-light`}>
      <Image
        src="/images/logo.svg"
        alt="Square Computers Logo"
        width={220}
        height={55}
        className="w-full h-auto object-contain"
        priority
      />
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

  if (isMobile) {
    // Mobile layout - matches desktop styling
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding with Logo */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-8 relative overflow-hidden h-72">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <div className="mb-4 sm:mb-6">
                <Logo />
              </div>
              <div className="mt-2">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide whitespace-nowrap">
                  <span className="text-cyan-300">Square</span>{' '}
                  <span className="text-white">Computers</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Mobile Form Section */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Sign In
            </h2>
            <LoginForm />
            <div className="mt-6 text-center text-sm text-gray-600">
              <button
                type="button"
                className="font-medium text-cyan-600 hover:text-cyan-500"
              >
                ← Return to main site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout - split screen design in card
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex min-h-[600px]">
          {/* Left Side - Branding with Logo */}
          <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 lg:px-16 w-full">
              <div className="mb-8 transition-transform duration-300 hover:scale-105">
                <Logo />
              </div>
              <div className="my-8">
                <h1 className="text-4xl lg:text-5xl font-semibold tracking-wide whitespace-nowrap">
                  <span className="text-cyan-300">Square</span>{' '}
                  <span className="text-white">Computers</span>
                </h1>
              </div>
              <div className="absolute bottom-8 left-0 right-0">
                <div className="text-xs text-gray-300 text-center">
                  &copy; 2025 <span className="text-cyan-400 font-medium whitespace-nowrap">Square Computers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to access your account
                </p>
              </div>
              <LoginForm />
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-8 text-center text-sm text-gray-600">
                <p>
                  Not an employee?{' '}
                  <button
                    type="button"
                    className="font-medium text-cyan-600 hover:text-cyan-500 transition duration-200"
                  >
                    Return to main site
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}