'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type RenameMap = Record<string, string>;

export const useBreadcrumbs = (rename?: RenameMap) => {
  const pathname = usePathname();

  return useMemo(() => {
    const segmentsRaw = pathname.split('/').filter(Boolean);
    const segmentsFiltered = segmentsRaw.filter((segment) => segment !== 'web3');

    const segments = segmentsFiltered.map((segment, index, arr) => {
      const href = '/' + arr.slice(0, index + 1).join('/');
      const label = rename?.[href] ?? segment;
      return { href, label };
    });

    return segments;
  }, [pathname, rename]);
};
