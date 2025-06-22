'use client';
import { ReactNode } from 'react';
import { RouterProvider } from './router';
import { TanstackProvider } from './tanstack';

import { ThemeProvider } from 'next-themes';
import { TonProvider } from './ton';

export function GlobalProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <RouterProvider>
      <TonProvider>
        <ThemeProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeProvider>
      </TonProvider>
    </RouterProvider>
  );
}
