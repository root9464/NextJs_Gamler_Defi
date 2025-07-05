'use client';

import { lazy } from 'react';

const LazyDebtTable = lazy(() => import('../entities/debt-table').then((mod) => ({ default: mod.DebtTable })));
export { LazyDebtTable };

