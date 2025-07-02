import MenuIcon from '@assets/svg/menu.svg';
import { Sheet } from '../ui/sheet';

export const MobileSheet = () => (
  <Sheet>
    <Sheet.Trigger>
      <MenuIcon />
    </Sheet.Trigger>
    <Sheet.Content isFloat={false} className='w-full'>
      <Sheet.Header>
        <Sheet.Title>Not Floated</Sheet.Title>
        <Sheet.Description>This sheet is not floated.</Sheet.Description>
      </Sheet.Header>
      <Sheet.Body>
        <h3>Menu</h3>
      </Sheet.Body>
    </Sheet.Content>
  </Sheet>
);
