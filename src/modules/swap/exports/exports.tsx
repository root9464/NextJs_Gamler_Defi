'use client';
import dynamic from 'next/dynamic';

const DynamicSwapInterface = dynamic(() => import('../flows/swap-interface').then((mod) => mod.SwapInterface), {
  ssr: false,
});

export { DynamicSwapInterface };
