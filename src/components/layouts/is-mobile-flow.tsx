'use client';

import { useWindow } from '@/shared/hooks/useWindow';
import type { FC, ReactNode } from 'react';

type IsMobileFlowProps = {
  mobile: ReactNode;
  desktop: ReactNode;
};

export const IsMobileFlow: FC<IsMobileFlowProps> = ({ mobile, desktop }) => {
  const { isMobile } = useWindow();

  return isMobile ? mobile : desktop;
};
