import MenuIcon from '@assets/svg/menu.svg';
import { Sheet } from '../ui/sheet';

export const MobileSheet = () => (
  <Sheet>
    <Sheet.Trigger>
      <MenuIcon />
    </Sheet.Trigger>
    <Sheet.Content side='right' isFloat={false} className='w-full'>
      <Sheet.Header className='border-b border-black/10'>
        <Sheet.Title className='text-black/85'>Меню</Sheet.Title>
      </Sheet.Header>
      <Sheet.Body>
        <div className='space-y-4 p-4'>
          <div className='flex items-center gap-2'>
            <span className='text-black/85'>Размещенные игры</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-black/85'>Мои игры</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-black/85'>События</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-black/85'>Мои игроки</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-black/85'>Билеты</span>
          </div>
        </div>
      </Sheet.Body>
    </Sheet.Content>
  </Sheet>
);
