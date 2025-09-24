import { AcceptanceModule } from '@/modules/games/acceptance/module';
import { validateResult } from '@/shared/utils/zod.utils';
import { z } from 'zod/v4';

const CurashPageShema = z.object({
  id: z.string().min(1, { error: 'ivnalid page params' }),
});

type AcceptencePageProps = z.infer<typeof CurashPageShema>;

export default async function AcceptencePage({ params }: { params: Promise<AcceptencePageProps> }) {
  const { id } = validateResult(await params, CurashPageShema);
  return <AcceptanceModule sessionId={id} />;
}
