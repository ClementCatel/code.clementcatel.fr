import { and, asc, eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { exercise, progress } from '../../database/schema'
import type { CodeFiles } from '#shared/schemas/exercise'

export default defineEventHandler(async (event) => {
  const session = await requireUser(event)
  const id = getRouterParam(event, 'id')!

  const [current] = await db.select().from(exercise).where(eq(exercise.id, id))
  if (!current) throw createError({ statusCode: 404, message: 'Exercice introuvable' })

  const siblings = await db
    .select({ id: exercise.id, position: exercise.position })
    .from(exercise)
    .where(eq(exercise.curriculumId, current.curriculumId))
    .orderBy(asc(exercise.position))

  const index = siblings.findIndex(s => s.id === id)

  if (index > 0) {
    const previousId = siblings[index - 1]!.id
    const [previousProgress] = await db
      .select({ completedAt: progress.completedAt })
      .from(progress)
      .where(and(eq(progress.exerciseId, previousId), eq(progress.userId, session.user.id)))

    if (!previousProgress?.completedAt) {
      throw createError({ statusCode: 403, message: 'Termine l\'exercice précédent d\'abord' })
    }
  }

  const [mine] = await db
    .select()
    .from(progress)
    .where(and(eq(progress.exerciseId, id), eq(progress.userId, session.user.id)))

  return {
    id: current.id,
    curriculumId: current.curriculumId,
    position: current.position,
    title: current.title,
    statement: current.statement,
    files: (mine?.draftFiles ?? current.starterFiles) as CodeFiles,
    tests: current.tests,
    completed: mine?.completedAt !== null && mine?.completedAt !== undefined,
    nextId: siblings[index + 1]?.id ?? null,
  }
})