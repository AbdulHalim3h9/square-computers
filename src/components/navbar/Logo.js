'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Logo = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex-shrink-0">
      <div className="logo-container" onClick={handleClick}>
        <div className="logo-image">
          <div className="logo">
            <Image 
              src="/images/logo.png" 
              alt="Square Computers Logo" 
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 2.5rem, (max-width: 768px) 3rem, (max-width: 1024px) 3.5rem, 4rem"
            />
          </div>
        </div>
        <div className="brand-text">
          <h1 className="brand-title">
            <span className="square-text">Square</span>{' '}
            <span className="computers-text">Computers</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Logo;
