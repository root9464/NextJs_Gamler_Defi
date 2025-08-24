'use client';
import { Wrapper } from '@/modules/games/curash/flow/wrapper';
import { ControlPanel } from '@/modules/video-hub/scene/flow/control-panel';
import { SceneModule } from '@/modules/video-hub/scene/module';

import AllMuteIcon from '@/assets/svg/allmute.svg';
import { GameField } from '@/modules/games/curash/features/game-field';

export default function Home() {
  return (
    <>
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
    </>
  );
}
