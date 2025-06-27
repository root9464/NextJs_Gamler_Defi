import { z } from 'zod/v4';

const BaseUserSchema = z.object({
  user_id: z.number(),
  name: z.string().nullable(),
  surname: z.string().nullable(),
  telegram: z.string().regex(/^@.+/, 'Telegram must start with @ and contain at least one character'),
  photo_path: z.string().nullable(),
  refer_id: z.number().nullable().optional(),
  wallet_address: z.string().length(48, 'Wallet address must be 48 characters long').nullable(),
  referral_program_choice: z.boolean(),
});

const ReferralProgramChoiceSchema = BaseUserSchema.extend({
  createdAt: z.iso.datetime({ message: 'createdAt must be a valid ISO 8601 date string' }).nullable(),
});

const AdditionalInformationSchema = BaseUserSchema.extend({
  referred_users: z.array(ReferralProgramChoiceSchema).optional(),
});

type BaseUser = z.infer<typeof BaseUserSchema>;
type AdditionalInformation = z.infer<typeof AdditionalInformationSchema>;
type ReferralProgramChoice = z.infer<typeof ReferralProgramChoiceSchema>;

export { AdditionalInformationSchema, BaseUserSchema, ReferralProgramChoiceSchema };
export type { AdditionalInformation, BaseUser, ReferralProgramChoice };
