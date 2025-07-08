"use client";

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Logo({ isSearchExpanded }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  }, [pathname, router]);

  return (
    <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={handleClick}>
      <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 transform hover:scale-105 transition-transform duration-300">
        <Image 
          src="/images/logo.png" 
          alt="Square Computers Logo" 
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 40px, (max-width: 1200px) 56px, 64px"
        />
      </div>
      {!isSearchExpanded || window.innerWidth >= 768 ? (
        <h1 className="navbar-brand text-base sm:text-lg md:hidden lg:block lg:text-2xl font-semibold mx-2">
          <span className="square-text">Square</span>{' '}
          <span className="computers-text">Computers</span>
        </h1>
      ) : null}
    </div>
  );
}