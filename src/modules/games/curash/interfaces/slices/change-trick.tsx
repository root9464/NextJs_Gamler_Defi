'use client';
import { trickAtom } from '@/modules/games/curash/store/trick-store';
import TrickIco from '@assets/svg/trick-curash.svg';
import { useAtom } from 'jotai';
import type { CSSProperties } from 'react';

const colorPaletteCurash = [
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
  const [trickColor, SetTrickColor] = useAtom(trickAtom);

  const handleChangeColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPaletteCurash.length);
    const newColors = colorPaletteCurash[randomIndex];
    SetTrickColor(newColors);
  };

  return (
    <div className='flex items-center gap-2.5 pt-5'>
      <TrickIco
        className={`h-[59px] w-[53px]`}
        style={
          {
            '--stop-color-1': trickColor.main,
            '--stop-color-2': trickColor.highlight,
          } as CSSProperties
        }
      />
      <div onClick={handleChangeColor} className='flex cursor-pointer items-center justify-center text-blue-400 hover:text-black'>
        <p>Сменить фишку</p>
      </div>
    </div>
  );
};
