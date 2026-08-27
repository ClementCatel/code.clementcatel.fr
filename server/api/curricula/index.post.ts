import { curriculumInputSchema } from '#shared/schemas/curriculum'
import { db } from '../../utils/db'
import { curriculum } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const body = await readValidatedBody(event, curriculumInputSchema.parse)
  const [row] = await db.insert(curriculum).values(body).returning()

  return row
})