import { Player, playersAtom, Position } from '@/modules/video/scene/store/players';
import { useSetAtom } from 'jotai';

const generateRandomName = (length: number = 8): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('')
    .replace(/^\w/, (c) => c.toUpperCase());
};

const generateRandomPosition = (): Position => ({
  x: 0,
  y: 0,
});

const generateMockPlayer = (id: string, is_host: boolean = false): Player => ({
  id,
  name: is_host ? 'Ведущий игры' : generateRandomName(),
  is_host,
  position: generateRandomPosition(),
  hand: [],
  metadata: {},
  streamId: `stream-${id}`,
  trackId: `track-${id}`,
});

export const useMockPlayers = () => {
  const setPlayers = useSetAtom(playersAtom);

  const initializeMockPlayers = (count: number, includeHost: boolean = false) => {
    const players: Player[] = Array.from({ length: count }, (_, index) => {
      const playerId = `player-${index + 1}`;
      return generateMockPlayer(playerId, includeHost && index === 0);
    });
    setPlayers(players);
  };

  const initializeLocalPlayer = (id: string, name: string) => {
    const localPlayer: Player = {
      id,
      name,
      is_host: false,
      position: generateRandomPosition(),
      hand: [],
      metadata: {},
      streamId: `stream-${id}`,
      trackId: `track-${id}`,
    };
    setPlayers((prev) => [...prev, localPlayer]);
  };

  return { initializeMockPlayers, initializeLocalPlayer };
};
