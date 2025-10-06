'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { usePathname } from 'next/navigation';
import { CopyClipboard } from '../features/copy-clipboard';

export const MyInviteLink = () => {
  const { data: account } = useAccount();
  const pathname = usePathname();
  const domain = window.location.href.split(pathname)[0];
  const link = `${domain}/signup?refferer_id=${account?.user_id}`;

  return (
    <div className='flex w-full flex-col gap-2 sm:w-[511px]'>
      <p className='text-sm text-black/85'>Моя ссылка для приглашения</p>
      <CopyClipboard data={link} />
    </div>
  );
};
