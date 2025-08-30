'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useSetAtom } from 'jotai';
import { useEffect, type FC, type ReactNode } from 'react';
import { SocketManager } from '../lib/socket-manager';
import { buildSocketFacade, MINIMAL_FACADE, socketAtom } from '../store/socket';

type SocketInterfaceProps = {
  sessionId: string;
  children: Readonly<ReactNode>;
};

//ws://<your_server_address>/api/session/ws/:session_id/:user_id

export const SocketInterface: FC<SocketInterfaceProps> = ({ sessionId, children }) => {
  const { data: account } = useAccount();
  const setSocket = useSetAtom(socketAtom);

  useEffect(() => {
    if (!account?.user_id) return;

    const url = `ws://localhost:6069/api/session/ws/${sessionId}/${account.user_id}`;
    const socket = new SocketManager(url);
    setSocket(buildSocketFacade(socket));

    socket.on('open', () => console.log('connect in game session susscesful'));

    return () => {
      socket.close();
      setSocket(MINIMAL_FACADE);
    };
  }, [sessionId, account?.user_id, setSocket]);

  return <>{children}</>;
};
