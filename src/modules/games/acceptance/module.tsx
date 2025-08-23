import { ControlPanel } from '@/modules/video-hub/scene/flow/control-panel';
import { GameModule } from '@/modules/video-hub/scene/module';
import { GameField } from './features/game-field';
import { Wrapper } from './flow/wrapper';

export const AcceptanceModule = () => {
  return <GameModule controlPanel={<ControlPanel />} gameField={<GameField />} UserWrapper={Wrapper} />;
};
