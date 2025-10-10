'use client';

import { ENVs } from '@/shared/lib/envs';
import userMock from '@/shared/mocks/user.json';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

export const DevProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const isDev = ENVs.server.NODE_ENV === 'development';

  if (isDev) {
    localStorage.setItem('user-logged-in', JSON.stringify(userMock));
    console.log('is dev mode');

    return (
      <>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    );
  }

  return children;
};
