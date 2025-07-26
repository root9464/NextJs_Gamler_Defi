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

const DynamicDescWorkProgram = dynamic(() => import('@components/slices/desc-work-program').then((mod) => mod.DescWorkProgram), {
  ssr: false,
});

const DynamicWalletConnectButton = dynamic(() => import('@components/features/connect-wallet-button').then((mod) => mod.WalletConnectButton), {
  ssr: false,
});

export { DynamicDescWorkProgram, DynamicLayoutFlow, DynamicSideBar, DynamicWalletConnectButton, IsReferralProgram };
