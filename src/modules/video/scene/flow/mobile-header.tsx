import { UserCameraFrame } from '@/modules/video/scene/flow/remote-users-camera';
import { cn } from '@/shared/utils/tw.utils';
import { MenuBar } from '../slices/menu-bar';

export const MobileHeader = () => {
  return (
    <div
      className={cn(
        'sticky top-0 z-[1] h-44 w-full px-4 py-3',
        'flex flex-col justify-between',
        'bg-neutral-800/50 backdrop-blur-[120px]',
        'rounded-br-2xl rounded-bl-2xl border border-white/10',
        'min-[1100px]:hidden',
      )}>
      <MenuBar />
      <div className='test-box scrollbar-hide flex max-w-3/5 flex-row gap-3 overflow-x-scroll'>
        <UserCameraFrame />
        <UserCameraFrame />
      </div>
    </div>
  );
};
