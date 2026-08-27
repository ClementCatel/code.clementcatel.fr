import { eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { exercise } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const id = getRouterParam(event, 'id')!
  const [row] = await db.delete(exercise).where(eq(exercise.id, id)).returning()

  if (!row) throw createError({ statusCode: 404, message: 'Exercice introuvable' })

  return { ok: true }
})