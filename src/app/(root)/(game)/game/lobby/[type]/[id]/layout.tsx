import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className='w-full px-4 py-10'>{children}</div>;
}
