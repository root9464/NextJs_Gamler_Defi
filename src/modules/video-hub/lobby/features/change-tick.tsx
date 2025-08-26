'use client';
import { trickAtom } from '@/modules/video-hub/scene/curash/store/trick-store';
import TrickIco from '@assets/svg/trick-curash.svg';
import { useAtom } from 'jotai';

const colorPalette = [
  { main: '#FFC0CB', highlight: '#FF69B4' },
  { main: '#B0E0E6', highlight: '#4682B4' },
  { main: '#98FB98', highlight: '#3CB371' },
  { main: '#E6E6FA', highlight: '#9370DB' },
  { main: '#FFF266', highlight: '#FF9F05' },
  { main: '#D3D3D3', highlight: '#A9A9A9' },
  { main: '#AFEEEE', highlight: '#48D1CC' },
  { main: '#F5DEB3', highlight: '#D2B48C' },
  { main: '#C7C3FF', highlight: '#7B68EE' },
  { main: '#FFDF00', highlight: '#FFC400' },
];

export const ChangeTrick = () => {
  const [value, setValue] = useAtom(trickAtom);

  const handleChangeColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    const newColors = colorPalette[randomIndex];
    setValue(newColors);
  };

  return (
    <div>
      <h2 className='text-[18px] font-medium text-[#3f4149]'>Ваша фишка в игре:</h2>
      <div className='flex items-center gap-[10px] pt-5'>
        <TrickIco className={`[--stop-color-1:${value.main}] [--stop-color-2:${value.highlight}] h-[59px] w-[53px]`} />
        <div onClick={handleChangeColor} className='flex cursor-pointer items-center justify-center text-blue-400 hover:text-black'>
          <p>Сменить фишку</p>
        </div>
      </div>
    </div>
  );
};
