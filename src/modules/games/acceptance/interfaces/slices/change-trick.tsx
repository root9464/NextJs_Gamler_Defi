'use client';

import { IconFlow } from '@/components/flows/icon-flow';
import { useTrickIcons } from '../../store/trick-store';

export const ChangeTrick: React.FC = () => {
  const { component: Icon, selectRandomIcon } = useTrickIcons();

  const handleChange = () => {
    selectRandomIcon();
  };

  return (
    <div className='flex h-fit items-center justify-center gap-2.5 pt-5'>
      <IconFlow className='bg-white shadow-md'>
        <Icon className='size-10' />
      </IconFlow>
      <div onClick={handleChange} className='flex cursor-pointer items-center justify-center text-blue-400 hover:text-black'>
        <p>Сменить фишку</p>
      </div>
    </div>
  );
};
