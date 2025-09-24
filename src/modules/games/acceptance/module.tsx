import { SceneModule } from '@/modules/video/scene/module';
import { FC } from 'react';
import { CardHolder } from './flows/cardholder';
import { GameField } from './slices/game-field';

type AcceptanceModuleProps = {
  sessionId: string;
};

export const AcceptanceModule: FC<AcceptanceModuleProps> = ({ sessionId }) => {
  return <SceneModule sessionId={sessionId} controlPanel={{}} cardHolder={CardHolder} gameField={<GameField />} />;
};
