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
      'flex h-8 cursor-pointer flex-row items-center justify-between gap-1 rounded-[6px] border border-[#D9D9D9] bg-white px-3 py-1.5 text-black/85',
      className,
    )}>
    <p className='w-full text-black/85'>{data}</p>
    <CopyIco />
  </div>
);
