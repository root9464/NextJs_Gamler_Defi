import { Camera } from '@components/slices/camera';
import { ControlPanelCurash } from './features/control-panel';
import { GameField } from './features/game-field';
import { WrapperCurash } from './slices/wrapper';

export const CurashModule = () => {
  return (
    <div className='flex h-max w-full gap-[25px] bg-black px-5 py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-5'>
        <div className='flex w-[688px] justify-between'>
          <ControlPanelCurash />
          <Camera />
        </div>
        <GameField />
      </div>
      <div className='flex flex-wrap content-start gap-6'>
        {/*мап массива где видеокамера и карточки*/}
        {Array.from({ length: 4 }).map((_, index) => (
          <WrapperCurash key={index} />
        ))}
      </div>
    </div>
  );
};
