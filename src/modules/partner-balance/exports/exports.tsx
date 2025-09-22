'use client';

import dynamic from 'next/dynamic';

const DynamicPartnerBalanceModule = dynamic(() => import('../module').then((mod) => mod.PartnerBalanceModule));
const DynamicPayAllOrdersBtn = dynamic(() => import('../features/pay-all-orders-btn').then((mod) => mod.PayAllOrdersBtn));

export { DynamicPartnerBalanceModule, DynamicPayAllOrdersBtn };
