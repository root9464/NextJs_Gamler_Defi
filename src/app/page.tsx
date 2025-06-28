import { TestEvents } from '@/components/test-events';
import { Button } from '@/components/ui/button';
import Icon from '../assets/svg/helper-symbol.svg';

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Icon />
      <TestEvents />
    </div>
  );
}
