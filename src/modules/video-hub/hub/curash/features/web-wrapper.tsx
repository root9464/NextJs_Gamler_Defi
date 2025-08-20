import { WebCameraCurash } from './web-camera';
import { WebCardsCurash } from './web-cards';

export const WebWrapperCurash = () => {
  return (
    <div className='flex h-[294px] w-[332px] flex-col gap-[25px]'>
      <WebCameraCurash />
      <WebCardsCurash />
    </div>
  );
};
