import { desc, eq, sql } from 'drizzle-orm'
import { db } from '../../utils/db'
import { curriculum, exercise } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const rows = await db
    .select({
      id: curriculum.id,
      title: curriculum.title,
      description: curriculum.description,
      published: curriculum.published,
      createdAt: curriculum.createdAt,
      exerciseCount: sql<number>`count(${exercise.id})::int`,
    })
    .from(curriculum)
    .leftJoin(exercise, eq(exercise.curriculumId, curriculum.id))
    .groupBy(curriculum.id)
    .orderBy(desc(curriculum.createdAt))

  return rows
})