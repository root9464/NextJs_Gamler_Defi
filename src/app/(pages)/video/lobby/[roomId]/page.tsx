import { LobbyModule } from '@/modules/video-hub/lobby/module';

type LobbyPageProps = {
  roomId: string;
  gameType: string;
};

export default function LobbyPage({ params }: { params: LobbyPageProps }) {
  console.log(params);
  const { roomId, gameType } = params;

  return <LobbyModule roomId={roomId} gameType={gameType} />;
}
