'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterClient() {
  const router = useRouter();

  useEffect(() => {
    // Client-side redirect
    router.replace('/auth/login?form=register');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Redirecting...</h2>
          <p className="mt-2 text-gray-600">Taking you to the registration page.</p>
        </div>
      </div>
    </div>
  );
}
