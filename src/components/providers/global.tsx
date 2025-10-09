'use client';
import type { ReactNode } from 'react';
import { DevProvider } from './dev';
import { NuqsProvider } from './nuqs';
import { RouterProvider } from './router';
import { TanstackProvider } from './tanstack';
import { ThemeProvider } from './theme';
import { TonProvider } from './ton';

export function GlobalProvider({ children, ...props }: { children: Readonly<ReactNode> }) {
  return (
    <RouterProvider>
      <NuqsProvider>
        <TonProvider>
          <ThemeProvider {...props}>
            <TanstackProvider>
              <DevProvider>{children}</DevProvider>
            </TanstackProvider>
          </ThemeProvider>
        </TonProvider>
      </NuqsProvider>
    </RouterProvider>
  );
}
