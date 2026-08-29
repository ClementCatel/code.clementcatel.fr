import { eq } from 'drizzle-orm'
import { exerciseInputSchema } from '#shared/schemas/exercise'
import { db } from '../../utils/db'
import { exercise } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const id = getRouterParam(event, 'id')!
  const body = await readValidatedBody(event, exerciseInputSchema.omit({ curriculumId: true }).parse)

  const [row] = await db
    .update(exercise)
    .set(body)
    .where(eq(exercise.id, id))
    .returning()

  if (!row) throw createError({ statusCode: 404, message: 'Exercice introuvable' })

  return row
})