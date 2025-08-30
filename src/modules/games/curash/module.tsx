import CoinIcon from '@/assets/svg/coin.svg';
import { SceneModule } from '@/modules/video/scene/module';
import type { FC } from 'react';
import { ChangeDices } from './features/change-dices';
import { GameField } from './features/game-field';
import { RollDices } from './features/roll-dices';
import { SettingsCoins } from './features/setting-coins';
import { CardHolder } from './flows/cardholder';

type CurashModuleProps = {
  sessionId: string;
};

export const CurashModule: FC<CurashModuleProps> = ({ sessionId }) => {
  return (
    <SceneModule
      sessionId={sessionId}
      controlPanel={{
        isAdmin: true,
        adminTopActions: (
          <SettingsCoins
            className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'
            children={<CoinIcon />}
          />
        ),
        adminGameActions: (
          <div className='flex flex-row items-center gap-2.5'>
            <RollDices />
            <ChangeDices />
          </div>
        ),
      }}
      cardHolder={<CardHolder />}
      gameField={<GameField />}
    />
  );
};
