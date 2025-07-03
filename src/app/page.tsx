'use client';
import { PageFlow } from '@/components/layouts/page-flow';
import { Avatar } from '@/components/ui/avatar';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useWindow } from '@/shared/hooks/useWindow';

export default function Home() {
  const { data: account } = useAccount();
  const { isMobile } = useWindow();
  console.log(isMobile);

  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <h1>fff</h1>
      <Avatar src={account?.user_photo_url} className='h-10 w-10 object-cover' />
    </PageFlow>
  );
}
