import { eq } from 'drizzle-orm'
import { curriculumInputSchema } from '#shared/schemas/curriculum'
import { db } from '../../utils/db'
import { curriculum } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const id = getRouterParam(event, 'id')!
  const body = await readValidatedBody(event, curriculumInputSchema.partial().parse)

  const [row] = await db
    .update(curriculum)
    .set(body)
    .where(eq(curriculum.id, id))
    .returning()

  if (!row) throw createError({ statusCode: 404, message: 'Cursus introuvable' })

  return row
})