import { UserCameraFrame } from '@/components/slices/user-camera-frame';
import { CardHolder } from './cardholder';

export const Wrapper = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <UserCameraFrame />
      <CardHolder />
    </div>
  );
};
