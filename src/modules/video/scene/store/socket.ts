'use client';

import { atom } from 'jotai';
import type { ISocketManager } from '../lib/socket-manager';

const noop = () => {};

export const MINIMAL_SOCKET_MANAGER: ISocketManager = {
  on: () => () => {},
  off: noop,
  sendMessage: noop,
  disconnect: noop,
  gameController: {
    rollDice: noop,
    selectCard: noop,
    showEveryoneCard: noop,
    changeDice: noop,
    moveToken: noop,
    getDecks: noop,
    giveDeckForSelection: noop,
    sendGameAction: noop,
    courage: {
      addCoins: noop,
    },
  },
};

export const socketAtom = atom<ISocketManager>(MINIMAL_SOCKET_MANAGER);

export interface Token {
  userId: string;
  position: {
    x: number;
    y: number;
  };
}
export const tokensAtom = atom<Token[]>([]);
