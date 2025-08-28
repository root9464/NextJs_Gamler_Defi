import SessionLocalData from '@shared/mocks/session.json';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';
import { validateResult } from '../utils/zod.utils';

const ParticipantsSchema = z.object({ ID: z.string(), Name: z.string() });

const SessionSchema = z.object({
  ID: z.string(),
  HostID: z.string(),
  GameName: z.string(),
  Participants: z.array(ParticipantsSchema),
  Status: z.string(),
  TimeToStart: z.string(),
  Price: z.number(),
});

const fetchSession = () => {
  const SessionData = validateResult(SessionLocalData, SessionSchema);
  const sessionId = SessionData.ID;

  return { sessionId };
};

const useSession = () =>
  useQuery({
    queryKey: ['account'],
    queryFn: fetchSession,
    refetchOnWindowFocus: false,
  });

export { useSession };
