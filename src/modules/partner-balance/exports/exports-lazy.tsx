'use client';

import { lazy } from 'react';

const LazyPartnerBalanceModule = lazy(() => import('../module').then((mod) => ({ default: mod.PartnerBalanceModule })));

export { LazyPartnerBalanceModule };
