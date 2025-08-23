import { LobbyModule } from '@/modules/video-hub/lobby/module';
import { validateResult } from '@/shared/utils/zod.utils';
import { z } from 'zod/v4';

const LobbyParamsSchema = z.object({
  id: z.string().min(1, 'Room ID cannot be empty'),
  type: z.string().min(1, 'Game type cannot be empty'),
});

type LobbyPageProps = z.infer<typeof LobbyParamsSchema>;

export default async function LobbyPage({ params }: { params: Promise<LobbyPageProps> }) {
  const { type, id } = validateResult(await params, LobbyParamsSchema);

  return <LobbyModule roomId={id} gameType={type} />;
}
