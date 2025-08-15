'use client';
import { PageFlow } from '@/components/layouts/page-flow';
import { buttonStyles } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <Link className={buttonStyles({ intent: 'outline', size: 'sm', isDisabled: true })} href='/exchanger'>
        Вывести
      </Link>
    </PageFlow>
  );
}
