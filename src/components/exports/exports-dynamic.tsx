'use client';

import dynamic from 'next/dynamic';

export const IsReferralProgram = dynamic(() => import('@components/slices/is-referral-program').then((mod) => mod.IsReferralProgram), {
  ssr: false,
});
