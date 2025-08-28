import localSessionData from '@shared/mocks/session.json';
import { validateResult } from '@shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';
import z from 'zod/v4';

const ParticipantShema = z.object({
  ID: z.string(),
  Name: z.string(),
});

const SessionSchema = z.object({
  ID: z.string(),
  HostID: z.string(),
  GameName: z.string(),
  Participants: z.array(ParticipantShema),
  Status: z.string(),
  TimeToStart: z.string(),
  Price: z.number(),
});

const fetchSessions = async () => {
  const userAccount = validateResult(localSessionData, SessionSchema);
  const sessionId = localSessionData.ID;

  console.log(userAccount);
  return sessionId;
};

const useSession = () =>
  useQuery({
    queryKey: ['session'],
    queryFn: fetchSessions,
  });

export { useSession };
