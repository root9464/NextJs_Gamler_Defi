import AllMuteIcon from '@/assets/svg/allmute.svg';
import { ControlPanel } from '@/modules/video-hub/scene/flow/control-panel';
import { SceneModule } from '@/modules/video-hub/scene/module';
import { GameField } from './features/game-field';
import { Wrapper } from './flow/wrapper';

export const CurashModule = () => {
  return (
    <SceneModule
      controlPanel={
        <ControlPanel
          isAdmin={true}
          additionalActions={
            <>
              <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
                <AllMuteIcon />
              </div>
            </>
          }
        />
      }
      UserWrapper={Wrapper}
      gameField={<GameField />}
    />
  );
};
