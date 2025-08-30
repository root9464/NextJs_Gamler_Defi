import ChangeIcon from '@/assets/svg/change.svg';

export const DiceSettings = () => {
  return (
    <div className='bg-uiActiveBlue flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:text-black'>
      <ChangeIcon className='fill-white' />
    </div>
  );
};
