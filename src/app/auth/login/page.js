'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Import form components directly
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

// Logo component with enhanced glow effect
function Logo({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className={`${className} relative w-[100px] h-auto xs:w-[130px] sm:w-[180px] md:w-[220px] lg:w-[250px] font-light`}>
      <div 
        className="absolute inset-0 rounded-full bg-cyan-300/5"
        style={{
          animation: 'pulseSize 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          filter: 'blur(20px)',
          opacity: 0.5,
          transform: 'scale(10.1)',
          width: '300%',
          height: '300%',
          left: '-30%',
          top: '-90%'
        }}
      />
    </div>
  );
}

// WelcomeHeader component
function WelcomeHeader({ isMobile = false }) {
  return (
    <div className={`${isMobile ? 'p-6' : 'p-12'} bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex flex-col justify-center`}>
      <div className="mb-6">
        <Logo />
      </div>
      <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
      <p className="text-cyan-100">
        Sign in to access your account and continue your journey with us.
      </p>
    </div>
  );
}

// Client component that handles the login form
function LoginFormWrapper() {
  // Check if we're in the browser environment
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  const router = useRouter();
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const popupRef = useRef(null);

  // Check if mobile on mount and set up resize listener
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Update URL when form type changes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (formType === 'login') {
        url.searchParams.delete('form');
      } else {
        url.searchParams.set('form', formType);
      }
      window.history.replaceState({}, '', url);
    }
  }, [formType]);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Check if this is a demo login
      if (email === 'demo@example.com' && password === 'demo123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('demoUser', 'true');
        router.push('/admin/dashboard');
        return;
      }
      
      // Regular login logic
      console.log('Login with:', { email, password });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual API call
      console.log('Register with:', { email, password, username });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      setSuccess('Registration successful! You can now sign in.');
      setFormType('login');
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual API call
      console.log('Forgot password for:', { email });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful password reset request
      setSuccess('Password reset link sent to your email.');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle demo login
  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate demo login
      console.log('Logging in with demo account');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set demo user data in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('demoUser', 'true');
      
      // Redirect to admin panel
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Failed to log in with demo account. Please try again.');
      setLoading(false);
    }
  };

  // Switch between login and register forms
  const handleSwitchToLogin = () => {
    setFormType('login');
    setError('');
    setSuccess('');
  };

  const handleSwitchToRegister = () => {
    setFormType('register');
    setError('');
    setSuccess('');
  };

  const handleForgotPasswordClick = () => {
    setFormType('forgot-password');
    setError('');
    setSuccess('');
  };

  // Logo component with enhanced glow effect
  const Logo = ({ className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div className={`${className} relative w-[100px] h-auto xs:w-[130px] sm:w-[180px] md:w-[220px] lg:w-[250px] font-light`}>
        <div 
          className="absolute inset-0 rounded-full bg-cyan-300/5"
          style={{
            animation: 'pulseSize 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            filter: 'blur(20px)',
            opacity: 0.5,
            transform: 'scale(10.1)',
            width: '300%',
            height: '300%',
            left: '-30%',
            top: '-90%'
          }}
        />
        
        <div className="relative z-10 transition-all duration-300 hover:scale-105">
          <div className="relative w-full h-auto" style={{ aspectRatio: '1/1' }}>
            <Image
              src="/images/logo.svg"
              alt="Square Computers Logo"
              fill
              className="object-contain"
              style={{
                filter: isHovered 
                  ? 'drop-shadow(0 0 30px rgba(34, 211, 238, 1))' 
                  : 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.9))',
                transition: 'filter 0.3s ease-in-out',
                animation: 'pulseShadow 3s ease-in-out infinite'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              priority
            />
          </div>
        </div>
      </div>
    );
  };

  // Reusable WelcomeHeader component
  const WelcomeHeader = ({ isMobile = false }) => {
    return (
      <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4 relative overflow-hidden ${isMobile ? 'h-48' : 'md:p-12 flex-1'}`}>
        <AnimatedBackground />
        <div className={`relative z-10 flex flex-col justify-center items-center text-center w-full ${isMobile ? 'h-full' : 'h-full'}`}>
          <div className={`${isMobile ? 'scale-90 -mt-2 mb-0' : 'mb-8'}`}>
            <Logo />
          </div>
          <div className={`${isMobile ? 'text-center' : 'flex-grow flex flex-col justify-center items-center'}`}>
            <div className="text-center">
              <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-light`}>
                <span className="text-white italic">Welcome</span>
                {' '}
                <span className={`font-light text-gray-300 ${isMobile ? 'text-lg' : 'text-2xl'}`}>to</span>
              </h1>
              <h2 className={`${isMobile ? 'text-xl mt-1' : 'text-4xl font-bold mt-2'}`}>
                <span className="text-cyan-300">Square</span>
                {' '}
                <span className="text-white">Computers</span>
              </h2>
            </div>
          </div>
          <div className={`${isMobile ? 'absolute bottom-4' : 'mt-auto w-full'}`}>
            <div className="text-xs text-gray-400 text-center py-4">
              &copy; {new Date().getFullYear()} Square Computers
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile popup content
  const MobilePopup = () => {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex flex-col z-[9999]">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-black/20 backdrop-blur-sm relative">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 text-gray-300 hover:text-white"
              aria-label="Go back"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <button
              onClick={() => router.push('/')}
              className="absolute right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-white ml-2">
              {formType === 'login' && 'Sign In'}
              {formType === 'register' && 'Create Account'}
              {formType === 'forgot-password' && 'Reset Password'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}

            {success ? (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-white">{success}</h3>
                <p className="mt-2 text-sm text-gray-300">
                  {formType === 'register' 
                    ? 'Your account has been created. You can now sign in.' 
                    : 'Please check your email for password reset instructions.'}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={() => {
                      setSuccess('');
                      if (formType === 'register' || formType === 'forgot-password') {
                        setFormType('login');
                      }
                    }}
                  >
                    {formType === 'register' ? 'Go to Sign In' : 'Back to Sign In'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {formType === 'login' && (
                  <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    onSubmit={handleLogin}
                    onDemoLogin={handleDemoLogin}
                  />
                )}

                {formType === 'register' && (
                  <RegisterForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    username={username}
                    setUsername={setUsername}
                    loading={loading}
                    onSubmit={handleRegister}
                  />
                )}

                {formType === 'forgot-password' && (
                  <ForgotPasswordForm
                    email={email}
                    setEmail={setEmail}
                    loading={loading}
                    onSubmit={handleForgotPassword}
                  />
                )}

                <div className="mt-6 text-center text-sm text-gray-300">
                  {formType === 'login' && (
                    <>
                      <button
                        type="button"
                        className="font-medium text-cyan-400 hover:text-cyan-300"
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot your password?
                      </button>
                      <p className="mt-2">
                        Don&apos;t have an account?{' '}
                        <button
                          type="button"
                          className="font-medium text-cyan-400 hover:text-cyan-300"
                          onClick={handleSwitchToRegister}
                        >
                          Sign up
                        </button>
                      </p>
                    </>
                  )}

                  {formType === 'register' && (
                    <p>
                      Already have an account?{' '}
                      <button
                        type="button"
                        className="font-medium text-cyan-400 hover:text-cyan-300"
                        onClick={handleSwitchToLogin}
                      >
                        Sign in
                      </button>
                    </p>
                  )}

                  {formType === 'forgot-password' && (
                    <button
                      type="button"
                      className="font-medium text-cyan-400 hover:text-cyan-300"
                      onClick={handleSwitchToLogin}
                    >
                      Return to Sign In
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Return the appropriate popup based on screen size
  if (isMobile) {
    return <MobilePopup />;
  }

  // Desktop layout - popup with blurred background
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="relative w-full max-w-4xl" ref={popupRef}>
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding */}
          <div className="hidden md:flex md:w-1/2">
            <WelcomeHeader isMobile={false} />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formType === 'login' ? 'Sign In to Your Account' : formType === 'register' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p className="text-gray-600">
                {formType === 'login' 
                  ? 'Enter your credentials to access your account' 
                  : formType === 'register' 
                  ? 'Create an account to get started' 
                  : 'Enter your email to receive a password reset link'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}

            {success ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">{success}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {formType === 'register' 
                    ? 'Your account has been created. You can now sign in.' 
                    : 'Please check your email for password reset instructions.'}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={() => {
                      setSuccess('');
                      if (formType === 'register' || formType === 'forgot-password') {
                        setFormType('login');
                      }
                    }}
                  >
                    {formType === 'register' ? 'Go to Sign In' : 'Back to Sign In'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {formType === 'login' && (
                  <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    onSubmit={handleLogin}
                    onDemoLogin={handleDemoLogin}
                  />
                )}

                {formType === 'register' && (
                  <RegisterForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    username={username}
                    setUsername={setUsername}
                    loading={loading}
                    onSubmit={handleRegister}
                  />
                )}

                {formType === 'forgot-password' && (
                  <ForgotPasswordForm
                    email={email}
                    setEmail={setEmail}
                    loading={loading}
                    onSubmit={handleForgotPassword}
                  />
                )}

                <div className="mt-6 text-center text-sm text-gray-600">
                  {formType === 'login' && (
                    <>
                      <button
                        type="button"
                        className="font-medium text-cyan-600 hover:text-cyan-500"
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot your password?
                      </button>
                      <p className="mt-2">
                        Don&apos;t have an account?{' '}
                        <button
                          type="button"
                          className="font-medium text-cyan-600 hover:text-cyan-500"
                          onClick={handleSwitchToRegister}
                        >
                          Sign up
                        </button>
                      </p>
                    </>
                  )}

                  {formType === 'register' && (
                    <p>
                      Already have an account?{' '}
                      <button
                        type="button"
                        className="font-medium text-cyan-600 hover:text-cyan-500"
                        onClick={handleSwitchToLogin}
                      >
                        Sign in
                      </button>
                    </p>
                  )}

                  {formType === 'forgot-password' && (
                    <button
                      type="button"
                      className="font-medium text-cyan-600 hover:text-cyan-500"
                      onClick={handleSwitchToLogin}
                    >
                      Return to Sign In
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Client component that uses useSearchParams
function LoginContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <LoginFormWrapper />
    </Suspense>
  );
}

export default function LoginPage() {
  return <LoginContent />;
}
