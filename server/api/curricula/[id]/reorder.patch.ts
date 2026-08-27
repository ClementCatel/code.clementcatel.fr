import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { db } from '../../../utils/db'
import { exercise } from '../../../database/schema'

const bodySchema = z.object({ ids: z.array(z.string().min(1)).min(1) })

export default defineEventHandler(async (event) => {
  await requireTeacher(event)

  const curriculumId = getRouterParam(event, 'id')!
  const { ids } = await readValidatedBody(event, bodySchema.parse)

  await db.transaction(async (tx) => {
    for (const [index, exerciseId] of ids.entries()) {
      await tx
        .update(exercise)
        .set({ position: index + 1 })
        .where(and(eq(exercise.id, exerciseId), eq(exercise.curriculumId, curriculumId)))
    }
  })

  return { ok: true }
})