import { z } from 'zod/v4';

const UserSchema = z.object({
  user_id: z.number().int().positive(),
  link: z.string().min(1),
  name: z.string().min(1),
  name_native: z.string().nullable(),
  surname: z.string().min(1),
  surname_native: z.string().nullable(),
  specialization: z.string().min(1),
  specialization_native: z.string().nullable(),
  education: z.string().min(1),
  education_native: z.string().nullable(),
  country: z.string().min(1),
  country_native: z.string().nullable(),
  city: z.string().min(1),
  city_native: z.string().nullable(),
  site: z.url(),
  vk: z.url(),
  instagram: z.string().min(1),
  photo_path: z.string().min(1),
  email: z.email(),
  is_email_verified: z.boolean(),
  is_phone_verified: z.boolean(),
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  telegram: z.string().min(1),
  coins_number: z.number().int().nonnegative(),
  player_likes_number: z.number().int().nonnegative(),
  host_likes_number: z.number().int().nonnegative(),
  gender: z.string().min(1),
  certificates: z.array(z.string()),
  about: z.string().min(1),
  refer_id: z.number().int().positive(),
  balance: z.string().regex(/^\d+\.\d{2}$/),
  referral_program_choice: z.boolean(),
  is_policy_accepted: z.boolean(),
  is_referral_terms_accepted: z.boolean(),
  referral_terms_accepted_at: z.string().nullable(),
  currency: z.string().min(1),
  native_language: z.string().min(1),
  languages: z.array(z.string().min(1)).min(1),
});

type User = z.infer<typeof UserSchema>;

export { UserSchema };
export type { User };
