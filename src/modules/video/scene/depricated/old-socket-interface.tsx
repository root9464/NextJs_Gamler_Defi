'use client';

import { useSetAtom } from 'jotai';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { SocketManager } from '../lib/socket-manager';
import type { Player } from '../store/players';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { MINIMAL_SOCKET_MANAGER, socketAtom } from '../store/socket';

interface OldSocketInterfaceProps {
  sessionId: string;
  children: Readonly<ReactNode>;
}

export const OkdSocketInterface: FC<OldSocketInterfaceProps> = ({ sessionId, children }) => {
  const [userId] = useState(() => Math.floor(Math.random() * 10000).toString());
  const setSocket = useSetAtom(socketAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);
  const setPlayers = useSetAtom(playersAtom);

  useEffect(() => {
    const url = `ws://127.0.0.1:6069/api/session/ws/sales_courage/125/${encodeURIComponent(userId)}`;
    const socketManager = new SocketManager(url);
    setSocket(socketManager);

    socketManager.on('open', () => {
      console.log('Connected to game session successfully');
      setCurrentUserId(userId);
    });

    const unsubscribeJoined = socketManager.on('player_joined', (payload: { player: Player }) => {
      console.log(`Player joined: ${payload.player.name} (ID: ${payload.player.id})`);
      setPlayers((prev) => {
        const exists = prev.some((p) => p.id === payload.player.id);
        if (!exists) return [...prev, payload.player];
        return prev;
      });
    });

    const unsubscribeLeft = socketManager.on('player_left', (payload: { playerId: string }) => {
      console.log(`Player left: ID ${payload.playerId}`);
      setPlayers((prev) => prev.filter((player) => player.id !== payload.playerId));
    });

    const unsubscribeFullState = socketManager.on('full_state', (payload: { players: Player[] }) => {
      console.log('Full state received:', payload);
      setPlayers(payload.players);
    });

    return () => {
      socketManager.close();
      unsubscribeJoined();
      unsubscribeLeft();
      unsubscribeFullState();
      setSocket(MINIMAL_SOCKET_MANAGER);
      setCurrentUserId(null);
      setPlayers([]);
    };
  }, [sessionId, setCurrentUserId, setPlayers, setSocket, userId]);

  return <>{children}</>;
};
