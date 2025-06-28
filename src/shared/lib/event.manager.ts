/* eslint-disable @typescript-eslint/no-explicit-any */
type EventHandler<T> = (data: T) => void;

class EventManager {
  private static listeners: Map<string, Set<EventHandler<any>>> = new Map();
  private static cacheEvents: Map<string, any[]> = new Map();

  static dispatchEvent<T>(eventName: string, data: T): void {
    if (!this.cacheEvents.has(eventName)) {
      this.cacheEvents.set(eventName, []);
    }

    const events = this.cacheEvents.get(eventName)!;
    events.unshift(data);

    if (events.length > 5) {
      events.pop();
    }

    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }

  static addEventListener<T>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(handler);

    const listener = (event: Event) => {
      if (event instanceof CustomEvent) {
        handler(event.detail as T);
      }
    };
    window.addEventListener(eventName, listener);

    return () => {
      window.removeEventListener(eventName, listener);
      this.listeners.get(eventName)?.delete(handler);
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
      }
    }
  }
}

export { EventManager };
export type { EventHandler };
