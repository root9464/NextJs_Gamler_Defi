import TrickIco from '@assets/svg/trick-curash.svg';

export const ChangeTrick = () => {
  return (
    <div>
      <h2 className='text-[18px] font-medium text-[#3f4149]'>Ваша фишка в игре:</h2>
      <div className='flex items-center gap-[10px] pt-5'>
        <TrickIco />
        <div className='flex cursor-pointer items-center justify-center text-blue-400 hover:text-black'>
          <p>Сменить фишку</p>
        </div>
      </div>
    </div>
  );
};
