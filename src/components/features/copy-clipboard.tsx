'use client';
import CopyIco from '@assets/svg/copy-icon.svg';
import { cn } from '@shared/utils/tw.utils';
import type { FC } from 'react';

type CopyClipboardProps = {
  data: string;
  className?: string;
};

export const CopyClipboard: FC<CopyClipboardProps> = ({ data, className }) => (
  <div
    className={cn(
      'flex h-8 w-full cursor-pointer flex-row items-center justify-between gap-1 rounded-[6px] border border-[#D9D9D9] bg-white px-3 py-1.5 text-black/85',
      className,
    )}>
    <p className='sm:truncate-0 w-full truncate overflow-hidden whitespace-nowrap text-black/85 sm:overflow-visible sm:whitespace-normal'>
      {data}
    </p>
    <CopyIco />
  </div>
);
