'use client';
import { Button, buttonStyles } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
      <Tooltip delay={0}>
        <Button intent='outline' isDisabled className='h-9' size='sm'>
          Обменять
        </Button>
        <Tooltip.Content>
          <p className='text-muted-fg mt-1 max-w-2xs text-sm text-pretty'>Прежде чем вывести свои токены, пожалуйста, сначала оплатите долг.</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger
          className={buttonStyles({
            className: 'h-9',
            isDisabled: true,
            intent: 'outline',
          })}>
          вывести
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p className='text-muted-fg mt-1 max-w-2xs text-sm text-pretty'>Прежде чем вывести свои токены, пожалуйста, сначала оплатите долг.</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
