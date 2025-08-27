import { ControlPanel } from '@/modules/video/scene/flow/control-panel';
import { SceneModule } from '@/modules/video/scene/module';
import { GameField } from './features/game-field';

export const AcceptanceModule = () => {
  return <SceneModule controlPanel={<ControlPanel />} gameField={<GameField />} />;
};
