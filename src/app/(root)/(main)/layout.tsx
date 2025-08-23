import { PageLayout } from '@/components/layouts/page-layout';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function Layout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <PageLayout
      classNames={{
        content: 'flex max-h-[calc(100vh-64px)] w-full flex-col gap-8 py-4 px-[30px] desktop-sm:pl-6 desktop-sm:pr-[60px]',
      }}>
      {children}
      <Toaster
        toastOptions={{
          style: {
            width: 'fit-content',
          },
        }}
      />
    </PageLayout>
  );
}
