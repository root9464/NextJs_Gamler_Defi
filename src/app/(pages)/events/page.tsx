'use client';
import { setIdRoom } from '@/modules/video-hub/lobby/store/hub-id';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import type { FC } from 'react';

type TestCardProps = {
  roomId: number;
};

export default function EventsPage() {
  return (
    <div className='flex flex-col gap-[40px]'>
      <Description />
      <TestCard roomId={1} />
    </div>
  );
}

const TestCard: FC<TestCardProps> = ({ roomId }) => {
  console.log(roomId, 'roomId');
  const linkTo = `/video/lobby/${roomId}`;
  const setRoomId = useSetAtom(setIdRoom);

  return (
    <Link
      onClick={() => setRoomId(roomId)}
      href={linkTo}
      className='flex h-[150px] w-[250px] items-center justify-center rounded-4xl bg-amber-600'>
      тестовая игра
    </Link>
  );
};

const Description = () => (
  <div className='flex h-fit w-full flex-col gap-2.5 sm:w-[900px]'>
    <h2 className='heading-1'>События</h2>
    <p className='title-1'>Раздел, где вы можете добавить событие и анонсировать игру с вашим участием</p>
  </div>
);
