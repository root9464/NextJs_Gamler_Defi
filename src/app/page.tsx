'use client';
import { PageFlow } from '@/components/layouts/page-flow';
import { userMock } from '@/shared/mocks/user.json';
import { UserSchema } from '@/shared/types/user';
import { validateResult } from '@/shared/utils/zod.utils';

export default function Home() {
  const userAccount = validateResult(userMock, UserSchema);

  console.log('userAccount', userAccount);

  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <h1>fff</h1>
    </PageFlow>
  );
}
