import { PageFlow } from '@/components/layouts/page-flow';
import { GlobalProvider } from '@/components/providers/global';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
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
      <body>
        <GlobalProvider>
          <PageFlow
            classNames={{
              content: 'flex max-h-[calc(100vh-64px)] w-full flex-col gap-8 py-4 px-[30px] desktop-sm:pl-6 desktop-sm:pr-[60px]',
              // header: 'px-4 desktop-sm:pl-6 desktop-sm:pr-[60px]',
            }}>
            {children}
            <Toaster
              toastOptions={{
                style: {
                  width: 'fit-content',
                },
              }}
            />
          </PageFlow>
        </GlobalProvider>
      </body>
    </html>
  );
}
