import { and, desc, eq, isNotNull } from 'drizzle-orm'
import { db } from '../../utils/db'
import { curriculum, exercise, progress } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireUser(event)

  const rows = await db
    .select({
      id: exercise.id,
      title: exercise.title,
      statement: exercise.statement,
      curriculumTitle: curriculum.title,
      completedAt: progress.completedAt,
    })
    .from(progress)
    .innerJoin(exercise, eq(exercise.id, progress.exerciseId))
    .innerJoin(curriculum, eq(curriculum.id, exercise.curriculumId))
    .where(and(eq(progress.userId, session.user.id), isNotNull(progress.completedAt)))
    .orderBy(desc(progress.completedAt))

  return rows
})