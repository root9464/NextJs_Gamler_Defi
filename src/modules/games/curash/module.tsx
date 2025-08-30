import CoinIcon from '@/assets/svg/coin.svg';
import DiceIcon from '@/assets/svg/dice.svg';
import { ControlPanel } from '@/modules/video/scene/flow/control-panel';
import { SceneModule } from '@/modules/video/scene/module';
import type { FC } from 'react';
import { ChangeDices } from './features/change-dices';
import { GameField } from './features/game-field';
import { SettingsCoins } from './features/setting-coins';
import { CardHolder } from './flows/cardholder';

type CurashModuleProps = {
  sessionId: string;
};

export const CurashModule: FC<CurashModuleProps> = ({ sessionId }) => {
  return (
    <SceneModule
      sessionId={sessionId}
      controlPanel={
        <ControlPanel
          isAdmin={true}
          adminPanelActions={
            <>
              <div className='flex flex-row items-center gap-2.5'>
                <DiceIcon className='h-[43px] w-[37px] cursor-pointer' />
                <ChangeDices />
              </div>
            </>
          }
          adminActions={
            <>
              <SettingsCoins
                className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'
                children={<CoinIcon />}
              />
            </>
          }
        />
      }
      cardHolder={<CardHolder />}
      gameField={<GameField />}
    />
  );
};
