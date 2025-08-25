import Link from 'next/link';
import type { FC } from 'react';

type TestCardProps = {
  roomId: number;
};

export default function EventsPage() {
  return (
    <div className='flex flex-col gap-10 p-10'>
      <Description />
      <div className='flex gap-10'>
        <TestCardAcceptence roomId={1} />
        <TestCardCurash roomId={2} />
      </div>
    </div>
  );
}

const TestCardAcceptence: FC<TestCardProps> = ({ roomId }) => {
  const gameType = 'acceptence';
  const linkTo = `/game/lobby/${gameType}/${roomId}`;

  return (
    <Link href={linkTo} className='flex h-[150px] w-[250px] items-center justify-center rounded-4xl bg-pink-600'>
      тестовая игра принятие
    </Link>
  );
};
const TestCardCurash: FC<TestCardProps> = ({ roomId }) => {
  const gameType = 'curash';
  const linkTo = `/game/lobby/${gameType}/${roomId}`;

  return (
    <Link href={linkTo} className='flex h-[150px] w-[250px] items-center justify-center rounded-4xl bg-green-600'>
      тестовая игра кураж
    </Link>
  );
};

const Description = () => (
  <div className='flex h-fit w-full flex-col gap-2.5 sm:w-225'>
    <h2 className='heading-1'>События</h2>
    <p className='title-1'>Раздел, где вы можете добавить событие и анонсировать игру с вашим участием</p>
  </div>
);
