import { GlobalProvider } from '@/components/providers/global';
import type { Metadata } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gamler',
  description: 'Gamler online gamefi platform',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <Head>
        <meta httpEquiv='Content-Security-Policy' content="script-src 'self'; connect-src 'self';" />
      </Head>
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
