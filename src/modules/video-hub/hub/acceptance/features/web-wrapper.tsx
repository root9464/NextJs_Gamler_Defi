import { WebCameraAcceptance } from './web-camera';
import { WebCardsAcceptance } from './web-cards';

export const WebWrapper = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <WebCameraAcceptance />
      <WebCardsAcceptance />
    </div>
  );
};
