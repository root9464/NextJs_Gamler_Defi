/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type { ActionPayloadMap, ActionType } from '@/modules/games/curash/lib/game-controllers';
import { atom } from 'jotai';
import type { ISocketManager } from '../lib/socket-manager';

export const MINIMAL_SOCKET_MANAGER: ISocketManager = {
  rollDice: () => {},
  selectCard: (_deck_id: string, _card_id: string) => {},
  showEveryoneCard: (_card_id: string) => {},
  changeDice: (_dice_count: number, _faces_number: number) => {},
  addCoins: (_player_id: string, _coins: number) => {},
  moveToken: (_position: { x: number; y: number }) => {},
  getDecks: () => {},
  giveDeckForSelection: (_deck_id: string, _player_id: string) => {},
  on: (_event, _handler) => () => {},
  off: (_event, _handler) => {},
  sendMessage: (_event, _data) => {},
  sendGameAction: function <T extends ActionType>(type: T, payload: ActionPayloadMap[T]): void {
    throw new Error('Function not implemented.');
  },
};

export const socketAtom = atom<ISocketManager>(MINIMAL_SOCKET_MANAGER);
