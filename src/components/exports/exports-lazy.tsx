import { lazy } from 'react';

const LazyMobileSheet = lazy(() => import('@components/slices/mobile-sheet').then((mod) => ({ default: mod.MobileSheet })));

export { LazyMobileSheet };
