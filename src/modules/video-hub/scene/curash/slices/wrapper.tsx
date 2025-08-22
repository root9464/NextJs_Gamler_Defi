import { Camera } from '@/components/slices/camera';
import { CardsCurash } from './cards';

export const WrapperCurash = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <Camera />
      <CardsCurash />
    </div>
  );
};
