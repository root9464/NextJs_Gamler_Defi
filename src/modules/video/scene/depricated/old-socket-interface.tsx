'use client';
import { useSetAtom } from 'jotai';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { SocketManager } from '../lib/socket-manager';
import { currentUserIdAtom } from '../store/players';
import { MINIMAL_SOCKET_MANAGER, socketAtom } from '../store/socket';

type OldSocketInterfaceProps = {
  sessionId: string;
  children: Readonly<ReactNode>;
};

//ws://<your_server_address>/api/session/ws/:session_id/:user_id

export const OkdSocketInterface: FC<OldSocketInterfaceProps> = ({ sessionId, children }) => {
  const [userId] = useState(() => Math.floor(Math.random() * 10000).toString());

  const setSocket = useSetAtom(socketAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);
  useEffect(() => {
    const url = `ws://127.0.0.1:6069/api/session/ws/sales_courage/125/${encodeURIComponent(userId)}`;
    const socket = new SocketManager(url);
    setSocket(socket);

    socket.on('open', () => {
      console.log('connect in game session susscesful');
      setCurrentUserId(userId);
    });

    return () => {
      socket.close();
      setSocket(MINIMAL_SOCKET_MANAGER);
    };
  }, [sessionId, setCurrentUserId, setSocket, userId]);

  return <>{children}</>;
};
