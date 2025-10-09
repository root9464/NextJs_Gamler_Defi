import MenuIcon from '@assets/svg/menu.svg';
import { Sheet } from '../ui/sheet';

import { cn } from '@/shared/utils/tw.utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from './side-bar';

export const MobileSheet = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
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
            {MENU_ITEMS.map((item) => (
              <div key={item.label} className='flex flex-row items-center gap-2'>
                <item.icon
                  className={cn(
                    'h-[14px] w-[14px] shrink-0 bg-transparent fill-black/85',
                    isActive(item.href) && 'fill-uiActiveBlue bg-uiActiveMutedBlue',
                  )}
                />
                <Link className='text-black/85' href={item.href}>
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  );
};
