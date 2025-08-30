import type { Constructor, IGameController } from '@/modules/video/scene/lib/game-controllers';

export interface ICourageGameController {
  addCoins(player_id: string, coins: number): void;
}

export function CourageGameControllerMixin<TBase extends Constructor<IGameController>>(Base: TBase) {
  return class CourageGameController extends Base implements ICourageGameController {
    addCoins(player_id: string, coins: number) {
      this.sendGameAction('add_coins', { player_id, coins });
    }
  };
}
