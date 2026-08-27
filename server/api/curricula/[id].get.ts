import { asc, eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { curriculum, exercise } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const id = getRouterParam(event, 'id')!

  const [row] = await db.select().from(curriculum).where(eq(curriculum.id, id))
  if (!row) throw createError({ statusCode: 404, message: 'Cursus introuvable' })

  const exercises = await db
    .select({
      id: exercise.id,
      position: exercise.position,
      title: exercise.title,
    })
    .from(exercise)
    .where(eq(exercise.curriculumId, id))
    .orderBy(asc(exercise.position))

  return { ...row, exercises }
})