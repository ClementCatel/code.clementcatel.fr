import { eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { curriculum } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const id = getRouterParam(event, 'id')!
  const [row] = await db.delete(curriculum).where(eq(curriculum.id, id)).returning()

  if (!row) throw createError({ statusCode: 404, message: 'Cursus introuvable' })

  return { ok: true }
})