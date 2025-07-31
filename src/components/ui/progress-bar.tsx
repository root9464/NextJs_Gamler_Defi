'use client';

import { cn } from '@/shared/utils/tw.utils';
import { composeTailwindRenderProps } from '@shared/lib/primitive';
import { motion } from 'motion/react';
import { ProgressBar as ProgressBarPrimitive, type ProgressBarProps as ProgressBarPrimitiveProps } from 'react-aria-components';
import { Label } from './field';

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const ProgressBar = ({ label, ref, className, ...props }: ProgressBarProps) => {
  return (
    <ProgressBarPrimitive ref={ref} className={composeTailwindRenderProps(className, 'flex flex-col')} {...props}>
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div
            className={cn(
              'relative mt-1 h-2 min-w-64 overflow-hidden rounded-full bg-[#F5F5F5] outline-1 -outline-offset-1 outline-transparent',
              'w-full',
            )}>
            {!isIndeterminate ? (
              <motion.div
                data-slot='progress-content'
                className='bg-uiActiveBlue absolute top-0 left-0 h-full rounded-full forced-colors:bg-[Highlight]'
                initial={{ width: '0%' }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            ) : (
              <motion.div
                data-slot='progress-content'
                className='bg-uiActiveBlue absolute top-0 h-full rounded-full forced-colors:bg-[Highlight]'
                initial={{ left: '0%', width: '40%' }}
                animate={{ left: ['0%', '100%', '0%'] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: 'easeInOut',
                }}
              />
            )}
          </div>
          <div className='flex justify-between gap-2'>
            {label && <Label>{label}</Label>}
            <span className='text-sm text-black/85 tabular-nums'>{valueText}</span>
          </div>
        </>
      )}
    </ProgressBarPrimitive>
  );
};

export { ProgressBar };
export type { ProgressBarProps };
