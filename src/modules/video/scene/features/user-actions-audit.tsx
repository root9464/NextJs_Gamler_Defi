import ArrowIcon from '@/assets/svg/arrow-right.svg';
import DiceIcon from '@/assets/svg/dice.svg';

export const UserActionsAudit = () => {
  return (
    <div className='max-desktop-xs:hidden flex h-[39px] items-center justify-center gap-[10px] **:text-white'>
      <p className='text-base font-medium'>Игрок</p>
      <ArrowIcon />
      <div className='flex flex-col gap-[5px]'>
        <p className='text-xs'>Последний ход</p>
        <div className='flex items-center gap-[4px] bg-transparent'>
          <DiceIcon className='h-4 w-5' />
          <p>5</p>
        </div>
      </div>
    </div>
  );
};
