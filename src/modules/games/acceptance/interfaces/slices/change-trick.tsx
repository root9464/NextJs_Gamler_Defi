'use client';

import { IconFlow } from '@/modules/video/scene/flow/icon-flow';
import * as TrickIcons from '@assets/svg/acceptence-tricks';
import React from 'react';
import { useTrickIcons } from '../../store/trick-store';

const icons = Object.entries(TrickIcons)
  .filter(([name]) => name.endsWith('Icon'))
  .map(([, comp]) => comp as React.ComponentType<React.SVGProps<SVGSVGElement>>);

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
