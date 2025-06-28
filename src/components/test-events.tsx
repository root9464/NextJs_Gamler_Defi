'use client';
import { EventManager } from '@/shared/lib/event.manager';
import { Button } from './ui/button';

export const TestEvents = () => {
  const sendEvent = () => {
    EventManager.dispatchEvent('reactEvent', { message: 'Привет, мир!' });
  };

  return (
    <div>
      <Button onClick={sendEvent}>Отправить событие</Button>
      <Reader />
    </div>
  );
};

const Reader = () => {
  const handleButtonClick = () => {
    const eventData = EventManager.getEventInCache('reactEvent');
    console.log(eventData);
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>Прочитать событие</Button>
    </div>
  );
};
