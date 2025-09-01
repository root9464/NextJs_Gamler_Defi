import { UserCameraFrame } from '@/modules/video/scene/flow/remote-users-camera';
import { CardHolder } from '../slices/cardholder';

export const Wrapper = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <UserCameraFrame />
      <CardHolder />
    </div>
  );
};
