/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ws://http://127.0.0.1:6069/api/session/ws/:session_id/:user_id

type WSEventHandler<T = any> = (data: T) => void;

type WsMessage<Event extends string = string, Data = any> = {
  event: Event;
  data: Data;
};

export class SocketManager extends WebSocket {
  private handlers: Partial<{ [event: string]: WSEventHandler<any> }> = {};

  private constructor(url: string) {
    super(url);
    this.initEvents();
  }

  private initEvents() {
    this.addEventListener('open', () => this.emit('open'));
    this.addEventListener('close', (e) => this.emit('close', e));
    this.addEventListener('error', (e) => this.emit('error', e));
    this.addEventListener('message', (e) => this.handleMessage(e));
  }

  private emit<Event extends string, Data = any>(event: Event, data?: Data): void {
    this.handlers[event]?.(data);
  }

  public on<Event extends string, Data = any>(event: Event, handler: WSEventHandler<Data>): void {
    this.handlers[event] = handler;
  }

  public off<Event extends string>(event: Event): void {
    delete this.handlers[event];
  }

  private handleMessage(event: MessageEvent) {
    try {
      const { event: evt, data } = JSON.parse(event.data);
      const handler = this.handlers[evt];
      if (handler) handler(data);
    } catch (error) {
      console.error(error);
    }
  }

  //   connect(): void {
  //     if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  //       console.log('Socket already connected.');
  //       return;
  //     }

  //     this.socket = new WebSocket(this.url);

  //     this.socket.onopen = () => {
  //       console.log('Connected to WebSocket');
  //     };

  //     this.socket.onmessage = (event) => {
  //       console.log('Message from server:', event.data);
  //     };

  //     this.socket.onerror = (error) => {
  //       console.error('WebSocket Error:', error);
  //     };

  //     this.socket.onclose = (event) => {
  //       console.log('WebSocket Closed:', event);
  //       this.socket = null;
  //     };
  //   }

  //   public sendEvent(event: any, data: any) {
  //     this.send(JSON.stringify({ event, data }));
  //   }

  //   public diceRolled(data: any) {
  //     this.sendEvent(event, data);
  //   }
}
