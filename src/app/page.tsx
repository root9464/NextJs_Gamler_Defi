'use client';
import { PageFlow } from '@/components/layouts/page-flow';
import { useAccount } from '@/shared/hooks/api/useAccount';

export default function Home() {
  const { data: userAccount } = useAccount();

  console.log('userAccount', userAccount);
  const apiUrl = `/api/web2/referral/referrer/17`;
  const fullUrl = `${window.location.origin}${apiUrl}`;
  console.log('Full URL:', fullUrl);

  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <h1>fff</h1>
    </PageFlow>
  );
}
