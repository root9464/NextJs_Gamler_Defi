'use client';
import ExitIcon from '@/assets/svg/exit.svg';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { IconFlow } from '../flow/icon-flow';
import { SocketManager } from '../lib/socket-manager';
import { socketAtom } from '../store/socket';

export const LeaveGame = () => {
  const socket = useAtomValue(socketAtom);
  const router = useRouter();
  const handleLeave = () => {
    if (socket instanceof SocketManager && socket.readyState === WebSocket.OPEN) {
      socket.disconnect();
    }
    router.push('/');
  };
  return (
    <IconFlow as='button' className='bg-[#FF4343]' onClick={handleLeave}>
      <ExitIcon className='h-full w-full' />
    </IconFlow>
  );
};
