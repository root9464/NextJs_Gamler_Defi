/* eslint-disable @typescript-eslint/no-explicit-any */
import { SocketManager } from './socket-manager';

export type ActionType = 'roll_dice' | 'select_card' | 'show_everyone_card' | 'prompt_select_card' | 'card_revealed' | 'change_dice';

type Test<T = any> = {
  event: 'game_action';
  data: {
    payload: T;
    type: ActionType;
  };
};

export class GameControllers extends SocketManager {
  public diceRoll<K = object>(action: Test<K>['event'], data: Test<K>['data']) {
    this.sendMessage(action, data);
  }

  public selectCard<K = object>(action: Test<K>['event'], data: Test<K>['data']) {
    this.sendMessage(action, data);
  }

  public showEveryoneCard<K = object>(action: Test<K>['event'], data: Test<K>['data']) {
    this.sendMessage(action, data);
  }

  public promptSelectCard<K = object>(action: Test<K>['event'], data: Test<K>['data']) {
    this.sendMessage(action, data);
  }

  public cardRevealed<K = object>(action: Test<K>['event'], data: Test<K>['data']) {
    this.sendMessage(action, data);
  }

  public changeDice<K = object>(action: Test<K>['event'], data: Test<K>['data']) {
    this.sendMessage(action, data);
  }
}
