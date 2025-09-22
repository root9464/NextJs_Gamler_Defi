import type { Constructor } from '@/modules/video/scene/lib/game-controllers';

export interface ICourageGameController {
  addCoins(player_id: string, coins: number): void;
}

export function CourageGameControllerMixin<TBase extends Constructor<{ send: (data: string) => void }>>(Base: TBase) {
  return class CourageGameController extends Base implements ICourageGameController {
    addCoins(player_id: string, coins: number) {
      const message = JSON.stringify({
        event: 'game_action',
        data: {
          type: 'add_coins',
          payload: { player_id, coins },
        },
      });
      this.send(message);
    }
  };
}
