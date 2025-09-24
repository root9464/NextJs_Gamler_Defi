import { SceneModule } from '@/modules/video/scene/module';
import type { FC } from 'react';
import { ChangeDices } from './features/change-dices';
import { RollDices } from './features/roll-dices';
import { SettingsCoins } from './features/setting-coins';
import { CardHolder } from './flows/cardholder';
import { GameField } from './slices/game-field';

type CurashModuleProps = {
  sessionId: string;
};

export const CurashModule: FC<CurashModuleProps> = ({ sessionId }) => {
  return (
    <SceneModule
      sessionId={sessionId}
      controlPanel={{
        adminTopActions: <SettingsCoins />,
        adminGameActions: (
          <div className='flex flex-row items-center gap-2.5'>
            <RollDices />
            <ChangeDices />
          </div>
        ),
      }}
      cardHolder={CardHolder}
      gameField={<GameField />}
    />
  );
};
