'use client';
import TrickIco from '@assets/svg/trick-curash.svg';
import { useState } from 'react';

const colorPalette = [
  { main: '#FFD1DC', highlight: '#FF69B4', shadow: '#C71585' },
  { main: '#B0E0E6', highlight: '#4682B4', shadow: '#00008B' },
  { main: '#98FB98', highlight: '#3CB371', shadow: '#006400' },
  { main: '#E6E6FA', highlight: '#9370DB', shadow: '#483D8B' },
  { main: '#FFF266', highlight: '#FF9F05', shadow: '#E87500' },
  { main: '#D3D3D3', highlight: '#A9A9A9', shadow: '#2F4F4F' },
  { main: '#AFEEEE', highlight: '#48D1CC', shadow: '#008B8B' },
  { main: '#F5DEB3', highlight: '#D2B48C', shadow: '#8B4513' },
  { main: '#C7C3FF', highlight: '#7B68EE', shadow: '#4B0082' },
  { main: '#FFDF00', highlight: '#FFC400', shadow: '#CD7F32' },
];

export const ChangeTrick = () => {
  const [chipColors, setChipColors] = useState(colorPalette[4]);
  console.log(chipColors);

  const handleChangeColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    const newColors = colorPalette[randomIndex];

    setChipColors(newColors);
  };

  return (
    <div>
      <h2 className='text-[18px] font-medium text-[#3f4149]'>Ваша фишка в игре:</h2>
      <div className='flex items-center gap-[10px] pt-5'>
        <TrickIco />
        <div onClick={handleChangeColor} className='flex cursor-pointer items-center justify-center text-blue-400 hover:text-black'>
          <p>Сменить фишку</p>
        </div>
      </div>
    </div>
  );
};
