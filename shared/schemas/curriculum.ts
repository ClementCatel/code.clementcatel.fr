import { z } from 'zod'

export const curriculumInputSchema = z.object({
  title: z.string().min(1, 'Titre obligatoire').max(120),
  description: z.string().max(2000).optional(),
  published: z.boolean().default(false),
})

export type CurriculumInput = z.infer<typeof curriculumInputSchema>