import { cn } from '@shared/utils/tw.utils';
import { FC, ReactNode } from 'react';

type PageFlowProps = {
  children: ReactNode;
  classNames?: Partial<{
    header: string;
    sidebar: string;
    content: string;
  }>;
};

export const PageFlow: FC<Readonly<PageFlowProps>> = ({ children, classNames }) => {
  return (
    <div className={cn('flex h-full w-full flex-col', classNames?.header)}>
      <div className={cn('h-16 w-full', classNames?.header)}>header</div>
      <div className='flex flex-1 flex-row'>
        <div className={cn('h-full w-[285px]', classNames?.sidebar)}>sidebar</div>
        <div className={cn('h-full flex-1', classNames?.content)}>{children}</div>
      </div>
    </div>
  );
};
