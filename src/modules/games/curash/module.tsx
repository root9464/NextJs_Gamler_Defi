import { SceneModule } from '@/modules/video/scene/module';
import { cn } from '@/shared/utils/tw.utils';
import CoinIcon from '@assets/svg/coin.svg';
import type { FC } from 'react';
import { ChangeDices } from './features/change-dices';
import { GameField } from './features/game-field';
import { RollDices } from './features/roll-dices';
import { SettingsCoins } from './features/setting-coins';
import { CardHolder } from './flows/cardholder';
import { ThrownDice } from './slices/thrown-dice';

type CurashModuleProps = {
  sessionId: string;
};

export const CurashModule: FC<CurashModuleProps> = ({ sessionId }) => {
  return (
    <SceneModule
      sessionId={sessionId}
      controlPanel={{
        adminTopActions: (
          <SettingsCoins
            className={cn(
              'flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white p-2',
              'max-desktop-xs:size-[45px] max-desktop-xs:p-3',
            )}
            children={<CoinIcon className='h-full w-full' />}
          />
        ),
        adminGameActions: (
          <div className='flex flex-row items-center gap-2.5'>
            <RollDices />
            <ChangeDices />
          </div>
        ),
      }}
      cardHolder={CardHolder}
      gameField={<GameField />}
      eventsModals={
        <>
          <ThrownDice />
        </>
      }
    />
  );
};
