'use client';

import dynamic from 'next/dynamic';

const IsReferralProgram = dynamic(() => import('@components/slices/is-referral-program').then((mod) => mod.IsReferralProgram), {
  ssr: false,
});

const DynamicSideBar = dynamic(() => import('@components/slices/side-bar').then((mod) => mod.SideBar), {
  ssr: false,
});

const DynamicDescWorkProgram = dynamic(() => import('@components/slices/desc-work-program').then((mod) => mod.DescWorkProgram));
const DynamicWalletConnectButton = dynamic(() => import('@components/features/connect-wallet-button').then((mod) => mod.WalletConnectButton));
const DynamicBalanceInHeader = dynamic(() => import('@components/slices/balance-in-header').then((mod) => mod.BalanceInHeader));
const DynamicMobileSheet = dynamic(() => import('@components/slices/mobile-sheet').then((mod) => mod.MobileSheet));

export { DynamicBalanceInHeader, DynamicDescWorkProgram, DynamicMobileSheet, DynamicSideBar, DynamicWalletConnectButton, IsReferralProgram };
