import { z } from 'zod'

export const GROUPES_TD = ['TD1', 'TD2', 'TD3'] as const

export const studentSignupSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(8, '8 caractères minimum'),
  firstName: z.string().min(1, 'Prénom obligatoire'),
  lastName: z.string().min(1, 'Nom obligatoire'),
  groupTd: z.enum(GROUPES_TD, { message: 'Choisis ton groupe' }),
})

export type StudentSignup = z.infer<typeof studentSignupSchema>