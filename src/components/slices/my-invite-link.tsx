'use client';
import { UserSchema } from '@/shared/types/user';
import { validateResult } from '@/shared/utils/zod.utils';
import { usePathname } from 'next/navigation';
import { CopyClipboard } from '../features/copy-clipboard';

export const MyInviteLink = () => {
  const localAccountData = localStorage.getItem('user-logged-in');
  const userAccount = validateResult(JSON.parse(localAccountData ?? '{}'), UserSchema);
  const pathname = usePathname();
  const domain = window.location.href.split(pathname)[0];
  const link = `${domain}/signup?refferer_id=${userAccount?.user_id}`;

  return (
    <div className='flex w-full flex-col gap-2 sm:w-[511px]'>
      <p className='text-sm text-black/85'>Моя ссылка для приглашения</p>
      <CopyClipboard data={link} />
    </div>
  );
};
