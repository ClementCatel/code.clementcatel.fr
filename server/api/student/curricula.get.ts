import { and, count, eq, sql } from 'drizzle-orm'
import { db } from '../../utils/db'
import { curriculum, exercise, progress } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireUser(event)

  const rows = await db
    .select({
      id: curriculum.id,
      title: curriculum.title,
      description: curriculum.description,
      total: count(exercise.id),
      done: sql<number>`count(${progress.completedAt})::int`,
    })
    .from(curriculum)
    .leftJoin(exercise, eq(exercise.curriculumId, curriculum.id))
    .leftJoin(
      progress,
      and(
        eq(progress.exerciseId, exercise.id),
        eq(progress.userId, session.user.id),
      ),
    )
    .where(eq(curriculum.published, true))
    .groupBy(curriculum.id)
    .orderBy(curriculum.title)

  return rows
})