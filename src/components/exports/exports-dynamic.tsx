'use client';

import dynamic from 'next/dynamic';

const IsReferralProgram = dynamic(() => import('@components/slices/is-referral-program').then((mod) => mod.IsReferralProgram), {
  ssr: false,
});

const DynamicSideBar = dynamic(() => import('@components/slices/side-bar').then((mod) => mod.SideBar), {
  ssr: false,
});

const DynamicLayoutFlow = dynamic(() => import('@components/layouts/layout-flow').then((mod) => mod.LayoutFlow), {
  ssr: false,
});

export { DynamicLayoutFlow, DynamicSideBar, IsReferralProgram };
