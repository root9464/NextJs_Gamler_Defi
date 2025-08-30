/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ICourageGameController } from '@/modules/games/curash/lib/courage-game-controller';
import type { IGameController } from '@/modules/video/scene/lib/game-controllers';
import { atom } from 'jotai';
import type { ISocketManager } from '../lib/socket-manager';

export type SocketFacade = {
  raw: ISocketManager;
  gameController: IGameController & { courage?: ICourageGameController };
};

const noop = () => {};

const MINIMAL_RAW: ISocketManager = {
  rollDice: noop,
  selectCard: noop,
  showEveryoneCard: noop,
  changeDice: noop,
  moveToken: noop,
  getDecks: noop,
  giveDeckForSelection: noop,
  on: () => () => {},
  off: noop,
  sendMessage: noop,
  sendGameAction: noop,
  disconnect: noop,
};

function buildFacade(raw: ISocketManager): SocketFacade {
  const base: IGameController = {
    sendGameAction: (type, payload) => raw.sendGameAction(type as any, payload as any),
    rollDice: () => raw.rollDice(),
    selectCard: (d, c) => raw.selectCard(d, c),
    showEveryoneCard: (id) => raw.showEveryoneCard(id),
    changeDice: (dice_count, faces_number) => raw.changeDice(dice_count, faces_number),
    moveToken: (pos) => raw.moveToken(pos),
    getDecks: () => raw.getDecks(),
    giveDeckForSelection: (deck_id, player_id) => raw.giveDeckForSelection(deck_id, player_id),
  };

  const courage: ICourageGameController = {
    addCoins: (player_id, coins) => raw.sendGameAction('add_coins' as any, { player_id, coins } as any),
  };

  return { raw, gameController: { ...base, courage } };
}

export const MINIMAL_FACADE: SocketFacade = buildFacade(MINIMAL_RAW);

export const socketAtom = atom<SocketFacade>(MINIMAL_FACADE);
export const buildSocketFacade = buildFacade;
