'use client';

import { atom } from 'jotai';
import type { ISocketManager } from '../lib/socket-manager';

const noop = () => {};

export const MINIMAL_SOCKET_MANAGER: ISocketManager = {
  rollDice: noop,
  selectCard: noop,
  showEveryoneCard: noop,
  changeDice: noop,
  addCoins: noop,
  moveToken: noop,
  getDecks: noop,
  giveDeckForSelection: noop,
  on: () => () => {},
  off: noop,
  sendMessage: noop,
  sendGameAction: noop,
  disconnect: noop,
};

export const socketAtom = atom<ISocketManager>(MINIMAL_SOCKET_MANAGER);
