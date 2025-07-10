'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Create a wrapper component that uses useSearchParams
function AuthLayoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formType, setFormType] = useState('login');
  
  // Handle URL query params
  useEffect(() => {
    const formParam = searchParams.get('form');
    if (['login', 'register'].includes(formParam)) {
      setFormType(formParam);
    }
  }, [searchParams]);
  
  return (
    <AuthLayoutInner 
      formType={formType} 
      setFormType={setFormType} 
      router={router} 
    />
  );
}

// Main layout component
// Import forms with no SSR
const LoginForm = dynamic(() => import('@/components/forms').then(mod => mod.LoginForm), { ssr: false });
const RegisterForm = dynamic(() => import('@/components/forms').then(mod => mod.RegisterForm), { ssr: false });

// Import AnimatedBackground with no SSR
const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

export default function AuthLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthLayoutContent />
    </Suspense>
  );
}

function AuthLayoutInner({ formType, setFormType, router }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const popupRef = useRef(null);

  // Check if mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleDemoLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    
    // Set demo admin credentials
    setEmail('admin@example.com');
    setPassword('admin123');
    
    // Wait for state to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Proceed with login
    await handleLogin(e, true);
  };

  const handleLogin = async (e, isDemo = false) => {
    if (!isDemo) {
      e?.preventDefault();
    }
    
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if ((email && password) || isDemo) {
        // Check for demo admin credentials
        const isDemoAdmin = email === 'admin@example.com' && password === 'admin123';
        const isAdmin = isDemo || isDemoAdmin || email === 'admin@example.com';
        
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        
        // Store user data
        const userData = {
          email: isDemo || isDemoAdmin ? 'admin@example.com' : email,
          username: isDemo || isDemoAdmin ? 'admin' : email.split('@')[0],
          isAdmin
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        setSuccess(isAdmin ? 'Admin login successful! Redirecting...' : 'Login successful! Redirecting...');
        
        // Redirect to admin panel for admin users, otherwise to dashboard
        const redirectPath = isAdmin ? '/admin' : '/dashboard';
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Your registration logic here
      setSuccess('Registration successful! You can now sign in with your credentials.');
      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      // Switch back to login after a short delay
      setTimeout(() => {
        setFormType('login');
        router.push('/auth?form=login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

const handleSwitchToRegister = () => {
    setFormType('register');
    setError('');
    setSuccess('');
    router.push('/auth?form=register');
  };

  const handleSwitchToLogin = () => {
    setFormType('login');
    setError('');
    setSuccess('');
    router.push('/auth?form=login');
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
  const WelcomeHeader = ({ isMobile = false }) => (
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

  // Handle click outside to close
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      router.push('/');
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        router.push('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [router]);

  // Mobile popup content
  const MobilePopup = () => (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={(e) => e.target === e.currentTarget && router.push('/')}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md" 
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.push('/')}
          className="absolute right-4 top-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <WelcomeHeader isMobile={true} />

        <div className="w-full p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {formType === 'login' ? 'Sign In' : formType === 'register' ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="text-gray-600 mb-6">
              {formType === 'login' 
                ? 'Enter your credentials to access your account' 
                : formType === 'register' 
                  ? 'Create a new account to get started' 
                  : 'Enter your email to receive a password reset link'}
            </p>
            
            {formType === 'login' && (
              <>
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  loading={loading}
                  error={error}
                  success={success}
                  handleSubmit={handleLogin}
                  onSwitchToRegister={handleSwitchToRegister}
                  onDemoLogin={handleDemoLogin}
                />
                <div className="mt-6 text-center text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToRegister}
                    className="font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
            
            {formType === 'register' && (
              <>
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
                  error={error}
                  success={success}
                  handleSubmit={handleRegister}
                  onSwitchToLogin={handleSwitchToLogin}
                />
                <div className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToLogin}
                    className="font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );

  // Desktop layout - popup with blurred background
  const DesktopLayout = () => (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={(e) => e.target === e.currentTarget && router.push('/')}
    >
      <div 
        className="relative w-full max-w-4xl" 
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding */}
          <div className="hidden md:flex md:w-1/2">
            <WelcomeHeader isMobile={false} />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formType === 'login' ? 'Sign In to Your Account' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {formType === 'login' 
                  ? 'Enter your credentials to access your account' 
                  : 'Create a new account to get started'}
              </p>
            </div>

            {formType === 'login' && (
              <>
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  loading={loading}
                  error={error}
                  success={success}
                  handleSubmit={handleLogin}
                  onSwitchToRegister={handleSwitchToRegister}
                  onDemoLogin={handleDemoLogin}
                />
                <div className="mt-6 text-center text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToRegister}
                    className="font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}

            {formType === 'register' && (
              <>
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
                  error={error}
                  success={success}
                  handleSubmit={handleRegister}
                  onSwitchToLogin={handleSwitchToLogin}
                />
                <div className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToLogin}
                    className="font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}


          </div>
        </div>
      </div>
    </div>
  );

  // Return the appropriate layout based on screen size
  return isMobile ? <MobilePopup /> : <DesktopLayout />;
}
