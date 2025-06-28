/* eslint-disable @typescript-eslint/no-explicit-any */
type EventHandler<T> = (data: T) => void;

class EventManager {
  private static channels: Map<string, BroadcastChannel> = new Map();
  private static listeners: Map<string, Set<EventHandler<any>>> = new Map();
  private static cacheEvents: Map<string, any[]> = new Map();

  private static getChannel(eventName: string): BroadcastChannel {
    if (!this.channels.has(eventName)) {
      const channel = new BroadcastChannel(eventName);
      channel.onmessage = (event) => this.handleBroadcast(eventName, event.data);
      this.channels.set(eventName, channel);
    }
    return this.channels.get(eventName)!;
  }

  private static handleBroadcast<T>(eventName: string, data: T): void {
    if (!this.cacheEvents.has(eventName)) this.cacheEvents.set(eventName, []);

    const events = this.cacheEvents.get(eventName)!;
    events.unshift(data);
    if (events.length > 5) events.pop();

    const handlers = this.listeners.get(eventName);
    if (handlers) {
      for (const handler of handlers) {
        handler(data);
      }
    }
  }

  static dispatchEvent<T>(eventName: string, data: T): void {
    if (!this.cacheEvents.has(eventName)) {
      this.cacheEvents.set(eventName, []);
    }

    const events = this.cacheEvents.get(eventName)!;
    events.unshift(data);
    if (events.length > 5) events.pop();

    this.getChannel(eventName).postMessage(data);
  }

  static addEventListener<T>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(handler);

    const cachedData = this.getEventInCache<T>(eventName);
    if (cachedData !== undefined) {
      handler(cachedData);
    }

    return () => {
      this.removeEventListener(eventName, handler);
    };
  }

  static getEventInCache<T>(eventName: string): T | undefined {
    const events = this.cacheEvents.get(eventName);
    return events?.[0];
  }

  static updateEventListener<T>(eventName: string, oldHandler: EventHandler<T>, newHandler: EventHandler<T>): void {
    if (this.listeners.has(eventName)) {
      const handlers = this.listeners.get(eventName)!;
      if (handlers.has(oldHandler)) {
        handlers.delete(oldHandler);
        handlers.add(newHandler);
      }
    }
  }

  static removeEventListener<T>(eventName: string, handler: EventHandler<T>): void {
    if (this.listeners.has(eventName)) {
      const handlers = this.listeners.get(eventName)!;
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.listeners.delete(eventName);
        this.channels.get(eventName)?.close();
        this.channels.delete(eventName);
      }
    }
  }
}

export { EventManager };
export type { EventHandler };
