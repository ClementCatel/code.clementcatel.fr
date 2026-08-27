import { z } from 'zod'

export const codeFilesSchema = z.object({
  html: z.string().default(''),
  css: z.string().default(''),
  js: z.string().default(''),
})

export type CodeFiles = z.infer<typeof codeFilesSchema>
export type ExerciseTest = z.infer<typeof exerciseTestSchema>

export const exerciseTestSchema = z.object({
  label: z.string().min(1, 'Le libellé est obligatoire'),
  code: z.string().min(1, 'Le code du test est obligatoire'),
})

export const exerciseInputSchema = z.object({
  curriculumId: z.string().min(1),
  title: z.string().min(1, 'Titre obligatoire').max(120),
  statement: z.string().min(1, 'Consigne obligatoire'),
  starterFiles: codeFilesSchema,
  solutionFiles: codeFilesSchema,
  tests: z.array(exerciseTestSchema).min(1, 'Au moins un test'),
})

export type ExerciseInput = z.infer<typeof exerciseInputSchema>