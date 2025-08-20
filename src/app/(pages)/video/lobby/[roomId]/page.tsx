import { LobbyModule } from '@/modules/video-hub/lobby/module';

type LobbyPageProps = {
  params: {
    roomId: string;
  };
  searchParams: {
    gameType?: string;
  };
};

export default function LobbyPage({ params, searchParams }: LobbyPageProps) {
  const { roomId } = params;
  const { gameType } = searchParams;

  return <LobbyModule roomId={roomId} gameType={gameType} />;
}
