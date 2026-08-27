import { and, eq } from 'drizzle-orm'
import { db } from '../../../utils/db'
import { exercise, progress } from '../../../database/schema'
import { auth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session) {
    throw createError({ statusCode: 401, message: 'Non authentifié' })
  }

  const curriculumId = getRouterParam(event, 'id')
  if (!curriculumId) {
    throw createError({ statusCode: 400, message: 'Cursus manquant' })
  }

  const rows = await db
    .select({
      id: exercise.id,
      position: exercise.position,
      title: exercise.title,
      completedAt: progress.completedAt,
    })
    .from(exercise)
    .leftJoin(
      progress,
      and(
        eq(progress.exerciseId, exercise.id),
        eq(progress.userId, session.user.id),
      ),
    )
    .where(eq(exercise.curriculumId, curriculumId))
    .orderBy(exercise.position)

  let previousDone = true

  return rows.map((row) => {
    const unlocked = previousDone
    previousDone = row.completedAt !== null

    return {
      id: row.id,
      position: row.position,
      title: row.title,
      completed: row.completedAt !== null,
      unlocked,
    }
  })
})