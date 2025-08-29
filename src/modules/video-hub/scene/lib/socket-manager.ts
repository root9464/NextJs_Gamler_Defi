/* eslint-disable @typescript-eslint/no-explicit-any */
// ws://http://127.0.0.1:6069/api/session/ws/:session_id/:user_id
import { GameControllers } from './game-controllers';

type WSEventHandler<T = any> = (data: T) => void;

export class SocketManager extends WebSocket {
  private handlers: Partial<{ [event: string]: WSEventHandler<any> }> = {};

  sayImAnEngineer() {
    console.log('I am an engineer too');
  }

  constructor(url: string) {
    console.log('Engineer class');
    super(url);
    this.initEvents();
  }

  private initEvents() {
    this.addEventListener('open', () => this.emit('open'));
    this.addEventListener('close', (e) => this.emit('close', e));
    this.addEventListener('error', (e) => this.emit('error', e));
    this.addEventListener('message', (e) => this.handleMessage(e));
  }

  private emit<Event extends string, Data = any>(event: Event, data?: Data) {
    this.handlers[event]?.(data);
  }

  public on<Event extends string, Data = any>(event: Event, handler: WSEventHandler<Data>) {
    this.handlers[event] = handler;
  }

  public off<Event extends string>(event: Event) {
    delete this.handlers[event];
  }

  private handleMessage(event: MessageEvent) {
    const { event: evt, data } = JSON.parse(event.data);
    const handler = this.handlers[evt];
    if (handler) handler(data);
  }

  public sendMessage<Event extends string, Data = any>(event: Event, data: Data) {
    if (this.readyState === WebSocket.OPEN) {
      this.send(JSON.stringify({ event, data }));
    }
  }
}

interface Employee extends SocketManager, GameControllers {
  sayImAnEngineer(): void;
}
class Employee {
  constructor() {
    this.sayImAnEngineer();
  }
}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
    });
  });
}

applyMixins(Employee, [SocketManager, GameControllers]);

const emp: Employee = new Employee();
emp.sayImAnEngineer();
