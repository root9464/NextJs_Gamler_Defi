import { WebCamera } from './web-camera';
import { WebCards } from './web-cards';

export const WebWrapper = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <WebCamera />
      <WebCards />
    </div>
  );
};
