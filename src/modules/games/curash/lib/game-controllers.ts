/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { WSMessage } from '@/shared/types/ws';

export type ActionType =
  | 'roll_dice'
  | 'select_card'
  | 'show_everyone_card'
  | 'change_dice'
  | 'add_coins'
  | 'move_token'
  | 'get_decks'
  | 'give_deck_for_selection';

type ActionPayloadMap = {
  roll_dice: {};
  select_card: { deck_id: string; card_id: string };
  show_everyone_card: { card_id: string };
  change_dice: { dice_count: number; faces_number: number };
  add_coins: { player_id: string; coins: number };
  move_token: { position: { x: number; y: number } };
  get_decks: {};
  give_deck_for_selection: { deck_id: string; player_id: string };
};

type BodyEvent<T extends ActionType> = WSMessage<
  'game_action',
  {
    type: T;
    payload: ActionPayloadMap[T];
  }
>;

export interface IGameController {
  sendGameAction<T extends ActionType>(type: T, payload: ActionPayloadMap[T]): void;
  rollDice(): void;
  selectCard(deck_id: string, card_id: string): void;
  showEveryoneCard(card_id: string): void;
  changeDice(dice_count: number, faces_number: number): void;
  addCoins(player_id: string, coins: number): void;
  moveToken(position: { x: number; y: number }): void;
  getDecks(): void;
  giveDeckForSelection(deck_id: string, player_id: string): void;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function GameControllerMixin<TBase extends Constructor<Pick<WebSocket, 'send'>>>(Base: TBase) {
  return class GameController extends Base implements IGameController {
    sendGameAction<T extends ActionType>(type: T, payload: ActionPayloadMap[T]) {
      const body: BodyEvent<T> = { event: 'game_action', data: { type, payload } };
      this.send(JSON.stringify(body));
    }

    rollDice() {
      this.sendGameAction('roll_dice', {});
    }

    selectCard(deck_id: string, card_id: string) {
      this.sendGameAction('select_card', { deck_id, card_id });
    }

    showEveryoneCard(card_id: string) {
      this.sendGameAction('show_everyone_card', { card_id });
    }

    changeDice(dice_count: number, faces_number: number) {
      this.sendGameAction('change_dice', { dice_count, faces_number });
    }

    addCoins(player_id: string, coins: number) {
      this.sendGameAction('add_coins', { player_id, coins });
    }

    moveToken(position: { x: number; y: number }) {
      this.sendGameAction('move_token', { position });
    }

    getDecks() {
      this.sendGameAction('get_decks', {});
    }

    giveDeckForSelection(deck_id: string, player_id: string) {
      this.sendGameAction('give_deck_for_selection', { deck_id, player_id });
    }
  };
}
