import { CurashModule } from '@/modules/games/curash/module';
import { validateResult } from '@/shared/utils/zod.utils';
import { z } from 'zod/v4';

const CurashPageShema = z.object({
  id: z.string().min(1, { error: 'ivnalid page params' }),
});

type CurashPageProps = z.infer<typeof CurashPageShema>;

export default async function CurashPage({ params }: { params: Promise<CurashPageProps> }) {
  const { id } = validateResult(await params, CurashPageShema);
  return <CurashModule sessionId={id} />;
}
