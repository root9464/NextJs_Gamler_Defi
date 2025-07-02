import { Skeleton } from '@ui/skeleton';
import type { FC } from 'react';

type TableSkeletonProps = {
  rows: number;
  columns: number;
};

export const TableSkeleton: FC<TableSkeletonProps> = ({ rows, columns }) => (
  <div className='w-full rounded-lg border border-gray-200 bg-white'>
    <div className='grid grid-cols-3 gap-4 border-b border-gray-200 p-4'>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} className='h-6 w-full bg-gray-200' />
      ))}
    </div>
    <div className='flex flex-col items-center justify-center p-4 text-center text-gray-500'>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className='mb-2 h-12 w-full bg-gray-200' />
      ))}
    </div>
  </div>
);
