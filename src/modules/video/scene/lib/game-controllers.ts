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
  | 'give_deck_for_selection'
  | 'show_player_hand'
  | 'return_card_to_deck'
  | 'transfer_card';

export type ActionPayloadMap = {
  roll_dice: {};
  select_card: { deck_id: string; card_id: string };
  show_everyone_card: { card_id: string; deck_id: string };
  change_dice: { dice_count: number; faces_number: number };
  add_coins: { player_id: string; coins: number };
  move_token: { position: { x: number; y: number } }; //фишку подвинуть
  get_decks: {};
  give_deck_for_selection: { deck_id: string; player_id: string };
  show_player_hand: { player_id: string };
  return_card_to_deck: { deck_id: string; card_id: string };
  transfer_card: { deck_id: string; card_id: string; player_id: string };
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
  showEveryoneCard(card_id: string, deck_id: string): void;
  changeDice(dice_count: number, faces_number: number): void;
  moveToken(position: { x: number; y: number }): void;
  getDecks(): void;
  giveDeckForSelection(deck_id: string, player_id: string): void;
  showPlayerHand(player_id: string): void;
  returnCardToDeck(deck_id: string, card_id: string): void;
  transferCard(deck_id: string, card_id: string, player_id: string): void;
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export function GameControllerMixin<TBase extends Constructor<Pick<WebSocket, 'send'>>>(Base: TBase) {
  return class GameController extends Base implements IGameController {
    void: any;
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

    showEveryoneCard(card_id: string, deck_id: string) {
      this.sendGameAction('show_everyone_card', { card_id, deck_id });
    }

    changeDice(dice_count: number, faces_number: number) {
      this.sendGameAction('change_dice', { dice_count, faces_number });
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

    showPlayerHand(player_id: string) {
      this.sendGameAction('show_player_hand', { player_id });
    }

    returnCardToDeck(deck_id: string, card_id: string) {
      this.sendGameAction('return_card_to_deck', { deck_id, card_id });
    }

    transferCard(deck_id: string, card_id: string, player_id: string) {
      this.sendGameAction('transfer_card', { deck_id, card_id, player_id });
    }
  };
}
