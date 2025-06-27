import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const manifestUrl = 'https://serv.gamler.online/web3/api/ton/manifest';
const TonConnectUIProvider = dynamic(() => import('@tonconnect/ui-react').then((mod) => mod.TonConnectUIProvider), { ssr: false });

export const TonProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>;
};
