'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import LoginForm with no SSR
const LoginForm = dynamic(
  () => import('@/components/forms').then(mod => mod.LoginForm),
  { ssr: false, loading: () => <div>Loading login form...</div> }
);

// Import AnimatedBackground with no SSR
const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900" />
    )
  }
);

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

export default function LoginClient() {
  const router = useRouter();
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

  // Handle demo login
  const handleDemoLogin = async () => {
    try {
      // Simulate demo login
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('demoUser', 'true');
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Demo login failed:', err);
    }
  };

  // Handle register click
  const handleRegisterClick = () => {
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex md:w-1/2">
        <WelcomeHeader />
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:hidden">
              <WelcomeHeader isMobile={true} />
            </div>
            
            <div className="p-6 md:p-8">
              <LoginForm 
                onRegisterClick={handleRegisterClick}
                onDemoLogin={handleDemoLogin}
              />
            </div>
          </div>
        </div>
      </div>
      
      <AnimatedBackground />
    </div>
  );
}
