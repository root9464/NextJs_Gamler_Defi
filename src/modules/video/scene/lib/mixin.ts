import { CourageGameControllerMixin } from '@/modules/games/curash/lib/courage-game-controller';
import { GameControllerMixin } from './game-controllers';

class BaseManager extends WebSocket {}
const MixedGameController = GameControllerMixin(BaseManager);
const MixedFullController = CourageGameControllerMixin(MixedGameController);

export { BaseManager, MixedFullController, MixedGameController };
