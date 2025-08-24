import { ControlPanel } from '@/modules/video-hub/scene/flow/control-panel';
import { SceneModule } from '@/modules/video-hub/scene/module';
import { GameField } from './features/game-field';
import { Wrapper } from './flow/wrapper';

export const AcceptanceModule = () => {
  return <SceneModule controlPanel={<ControlPanel />} gameField={<GameField />} UserWrapper={Wrapper} />;
};
