'use client';
import { ReactNode } from 'react';
import { RouterProvider } from './router';
import { TanstackProvider } from './tanstack';

import { ThemeProvider } from './theme';
import { TonProvider } from './ton';

export function GlobalProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <RouterProvider>
      <TonProvider>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeProvider>
      </TonProvider>
    </RouterProvider>
  );
}
