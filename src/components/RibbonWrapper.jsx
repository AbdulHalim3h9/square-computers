'use client';

import dynamic from 'next/dynamic';

// Dynamically import Ribbon with SSR disabled
const Ribbon = dynamic(() => import('./Ribbon'), { 
  ssr: false 
});

export default function RibbonWrapper() {
  return <Ribbon />;
}
