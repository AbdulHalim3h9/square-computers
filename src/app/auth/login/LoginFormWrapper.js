'use client';

import dynamic from 'next/dynamic';

// Import forms with no SSR
const LoginForm = dynamic(() => import('@/components/forms').then(mod => mod.LoginForm), { ssr: false });
const RegisterForm = dynamic(() => import('@/components/forms').then(mod => mod.RegisterForm), { ssr: false });
const ForgotPasswordForm = dynamic(() => import('@/components/forms').then(mod => mod.ForgotPasswordForm), { ssr: false });

// Import AnimatedBackground with no SSR
const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

export default function LoginFormWrapper() {
  // Your existing login form logic here
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="relative w-full max-w-4xl" ref={popupRef}>
        {/* Your existing JSX */}
      </div>
    </div>
  );
}
