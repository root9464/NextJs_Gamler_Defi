import { cn } from '@/shared/utils/tw.utils';
import { FC } from 'react';
import { ControlPanel, ControlPanelProps } from './control-panel';

type MobileFooterProps = {
  controlPanel: ControlPanelProps;
};

export const MobileFooter: FC<MobileFooterProps> = ({ controlPanel }) => {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-[1] h-25 w-full px-4 py-3',
        'bg-neutral-800/50 backdrop-blur-[120px]',
        'rounded-tl-2xl rounded-tr-2xl border border-white/10',
        'min-[1100px]:hidden',
      )}>
      <ControlPanel {...controlPanel} />
    </div>
  );
};
