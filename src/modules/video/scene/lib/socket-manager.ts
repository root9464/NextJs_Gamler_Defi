/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ICourageGameController } from '@/modules/games/curash/lib/courage-game-controller';
import { CourageGameControllerMixin } from '@/modules/games/curash/lib/courage-game-controller';
import type { IGameController } from '@/modules/video/scene/lib/game-controllers';
import { GameControllerMixin } from '@/modules/video/scene/lib/game-controllers';
import type { WSEventHandler, WSMessage } from '@/shared/types/ws';

export interface ISocketManager {
  on<E extends string, D = any>(event: E, handler: WSEventHandler<D>): () => void;
  off<E extends string>(event: E, handler?: WSEventHandler<any>): void;
  sendMessage<Event extends string, Data = any>(event: Event, data: Data): void;
  disconnect(): void;
  gameController: IGameController & { courage: ICourageGameController };
}

export class SocketManager extends WebSocket implements ISocketManager {
  private handlers = new Map<string, Set<WSEventHandler<any>>>();
  public readonly gameController: IGameController & { courage: ICourageGameController };

  constructor(url: string) {
    super(url);
    const gameControllerInstance = new (GameControllerMixin(WebSocket))(url);
    const CourageControllers = new (CourageGameControllerMixin(WebSocket))(url);

    this.gameController = {
      sendGameAction: gameControllerInstance.sendGameAction.bind(gameControllerInstance),
      rollDice: gameControllerInstance.rollDice.bind(gameControllerInstance),
      selectCard: gameControllerInstance.selectCard.bind(gameControllerInstance),
      showEveryoneCard: gameControllerInstance.showEveryoneCard.bind(gameControllerInstance),
      changeDice: gameControllerInstance.changeDice.bind(gameControllerInstance),
      moveToken: gameControllerInstance.moveToken.bind(gameControllerInstance),
      getDecks: gameControllerInstance.getDecks.bind(gameControllerInstance),
      giveDeckForSelection: gameControllerInstance.giveDeckForSelection.bind(gameControllerInstance),
      courage: {
        addCoins: CourageControllers.addCoins.bind(CourageControllers),
      },
    };

    this.addEventListener('open', () => this.emit('open'));
    this.addEventListener('close', (e) => this.emit('close', e));
    this.addEventListener('error', (e) => this.emit('error', e));
    this.addEventListener('message', (e) => this.handleMessage(e));
  }

  private emit<E extends string, D = any>(event: E, data?: D) {
    this.handlers.get(event)?.forEach((h) => h(data));
  }

  on<E extends string, D = any>(event: E, handler: WSEventHandler<D>): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler as WSEventHandler<any>);
    return () => this.off(event, handler as WSEventHandler<any>);
  }

  off<E extends string>(event: E, handler?: WSEventHandler<any>) {
    if (!this.handlers.has(event)) return;
    if (handler) {
      this.handlers.get(event)!.delete(handler);
      if (this.handlers.get(event)!.size === 0) this.handlers.delete(event);
    } else this.handlers.delete(event);
  }

  private handleMessage(e: MessageEvent) {
    try {
      const parsed = JSON.parse(e.data);
      if (parsed?.type && parsed?.payload) return this.emit(parsed.type, parsed.payload);
      if (parsed?.event && parsed?.data) {
        if (parsed.event === 'game_action' && parsed.data.type) return this.emit(parsed.data.type, parsed.data.payload);
        return this.emit(parsed.event, parsed.data);
      }
    } catch (err) {
      throw new Error(`socketManager: invalid format message — ${(err as Error).message}`);
    }
  }

  sendMessage<Event extends string, Data = any>(event: Event, data: Data) {
    if (this.readyState !== WebSocket.OPEN) throw new Error('socketManager: connection dont open');
    this.send(JSON.stringify(<WSMessage<Event, Data>>{ event, data }));
  }

  disconnect() {
    this.handlers.clear();
    this.close();
  }
}
