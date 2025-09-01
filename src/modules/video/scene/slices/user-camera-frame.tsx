import HeartIcon from '@/assets/svg/hearthub.svg';
import InfoIcon from '@/assets/svg/info.svg';
import MuteIcon from '@/assets/svg/mute.svg';
import { cn } from '@/shared/utils/tw.utils';
import type { FC } from 'react';

type UsersCameraFrameProps = {
  stream: MediaStream;
};

export const UserCameraFrame: FC<UsersCameraFrameProps> = ({ stream }) => {
  return (
    <div
      className={cn(
        'relative flex h-50 w-[332px] shrink-0 flex-col justify-between overflow-hidden rounded-[11px] bg-red-300 px-[15px] py-[18px]',
        'max-desktop-xs:w-30 max-desktop-xs:px-2.5 max-desktop-xs:h-[77px] py-1',
      )}>
      <div className='relative z-10 flex w-full justify-between'>
        <div
          className={cn(
            'flex h-[22px] w-11 items-center justify-center rounded-[55px] bg-white text-xs text-black',
            'max-desktop-xs:text-[9px] max-desktop-xs:w-8 max-desktop-xs:h-5',
          )}>
          <p>1:00</p>
        </div>
        <div className={cn('flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-[#222226]', 'max-desktop-xs:size-4')}>
          <MuteIcon className='max-desktop-xs:size-2 aspect-[17/19] h-[19px] w-[17px]' />
        </div>
      </div>

      <video
          key={stream.id}
          autoPlay
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          className='absolute inset-0 h-full w-full object-cover'
        />

      <Footer />
    </div>
  );
};

const Footer = () => (
  <div className='relative z-10 mt-2 flex w-full items-center justify-between'>
    <h1 className='max-desktop-xs:text-[9px] font-medium text-white'>Игрок 1</h1>
    <div className='flex gap-2.5'>
      <div className='max-desktop-xs:hidden flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-[#222226]'>
        <InfoIcon />
      </div>
      <div className={cn('flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-[#222226]', 'max-desktop-xs:size-4')}>
        <HeartIcon className='max-desktop-xs:size-2 aspect-[21/19] h-[19px] w-[21px]' />
      </div>
    </div>
  </div>
);
