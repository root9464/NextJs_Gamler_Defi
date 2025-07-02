'use client';

import { lazy } from 'react';

const LazyPayAllOrdersBtn = lazy(() => import('../features/pay-all-orders-btn').then((mod) => ({ default: mod.PayAllOrdersBtn })));

export { LazyPayAllOrdersBtn };
