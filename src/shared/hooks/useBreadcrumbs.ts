'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type RenameMap = Record<string, string>;

export const useBreadcrumbs = (rename?: RenameMap) => {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, arr) => {
        const href = '/' + arr.slice(0, index + 1).join('/');
        const label = rename?.[href] ?? segment;
        return { href, label };
      });

    return segments;
  }, [pathname, rename]);
};
