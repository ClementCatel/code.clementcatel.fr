import { sql } from 'drizzle-orm'
import { db } from '../../utils/db'
import { exercise } from '../../database/schema'
import { exerciseInputSchema } from '#shared/schemas/exercise'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const body = await readValidatedBody(event, exerciseInputSchema.parse)

  const [row] = await db.insert(exercise).values({
    ...body,
    position: sql`(
      SELECT COALESCE(MAX(position), 0) + 1 FROM ${exercise}
      WHERE curriculum_id = ${body.curriculumId}
    )`,
  }).returning()

  return row
})