import { eq } from 'drizzle-orm'
import { exercise } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const id = getRouterParam(event, 'id')!
  const [row] = await db.select().from(exercise).where(eq(exercise.id, id))

  if (!row) throw createError({ statusCode: 404, message: 'Exercice introuvable' })

  return row
})