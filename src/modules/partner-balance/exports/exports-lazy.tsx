'use client';

import { lazy } from 'react';

const LazyPartnerBalanceModule = lazy(() => import('../module').then((mod) => ({ default: mod.PartnerBalanceModule })));
const LazyPayAllOrdersBtn = lazy(() => import('../features/pay-all-orders-btn').then((mod) => ({ default: mod.PayAllOrdersBtn })));

export { LazyPartnerBalanceModule, LazyPayAllOrdersBtn };
