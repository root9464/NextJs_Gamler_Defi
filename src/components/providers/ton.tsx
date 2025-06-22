import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const manifestUrl = 'https://taiga-labs.github.io/dexlot.json';
const TonConnectUIProvider = dynamic(() => import('@tonconnect/ui-react').then((mod) => mod.TonConnectUIProvider), { ssr: false });

export const TonProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>;
};
