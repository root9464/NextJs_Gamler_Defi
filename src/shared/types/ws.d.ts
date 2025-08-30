/* eslint-disable @typescript-eslint/no-explicit-any */
export type WSMessage<Event extends string = string, Data = any> = {
  event: Event;
  data: Data;
};
export type WSEventHandler<T = any> = (data: T) => void;
