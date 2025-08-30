'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import Link from 'next/link';
import type { FC } from 'react';

type TestCardProps = {
  roomId: string | undefined;
};

// есть страница ивентов на ней я получаю все сессии
// после чего я нажимаю выбрать конкретную игру и перехожу на нее
// после чего открывается страница лобби в которой я полуаю сессии по конкретному айдишнику(мок)
//

export default function EventsPage() {
  const { data: account } = useAccount();

  console.log('account', account);

  return (
    <div className='flex flex-col gap-10 p-10'>
      <Description />
      <div className='flex gap-10'>
        <TestCardAcceptence roomId={'1'} />
        <TestCardCurash roomId={'1'} />
      </div>
    </div>
  );
}

const TestCardAcceptence: FC<TestCardProps> = ({ roomId }) => {
  const gameType = 'acceptence';
  const linkTo = `/video/lobby/${gameType}/${roomId}`;

  return (
    <Link href={linkTo} className='flex h-[150px] w-[250px] items-center justify-center rounded-4xl bg-pink-600'>
      тестовая игра принятие
    </Link>
  );
};

const TestCardCurash: FC<TestCardProps> = ({ roomId }) => {
  const gameType = 'curash';
  const linkTo = `/video/lobby/${gameType}/${roomId}`;

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
