import { ReactNode } from 'react';

export const PageFlow = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='grid h-full w-full grid-cols-3 grid-rows-3'>
      <div className='row-span-3 w-[285px] bg-red-500'>1</div>
      <div className='col-span-2 h-24 bg-blue-500'>2</div>
      <div className='col-span-2 bg-green-500'>{children}</div>
    </div>
  );
};
