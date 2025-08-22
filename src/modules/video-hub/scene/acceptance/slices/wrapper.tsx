import { Camera } from '@/components/slices/camera';
import { WebCardsAcceptance } from './cards';

export const WebWrapper = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <Camera />
      <WebCardsAcceptance />
    </div>
  );
};
