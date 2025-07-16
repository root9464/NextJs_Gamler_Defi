import { z } from 'zod/v4';

const UserSchema = z.object({
  user_id: z.number(),
  link: z.string(),
  name: z.string(),
  referral_program_choice: z.boolean(),
  photo_path: z.string(),
  coins_number: z.number(),
  player_likes_number: z.number(),
  host_likes_number: z.number(),
});

type User = z.infer<typeof UserSchema>;

export { UserSchema };
export type { User };
