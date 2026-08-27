import { sql } from 'drizzle-orm'
import { codeFilesSchema } from '#shared/schemas/exercise'
import { db } from '../../../utils/db'
import { progress } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireUser(event)
  const exerciseId = getRouterParam(event, 'exerciseId')!
  const files = await readValidatedBody(event, codeFilesSchema.parse)

  await db
    .insert(progress)
    .values({
      userId: session.user.id,
      exerciseId,
      draftFiles: files,
      completedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [progress.userId, progress.exerciseId],
      set: {
        draftFiles: files,
        updatedAt: new Date(),
        completedAt: sql`COALESCE(${progress.completedAt}, NOW())`,
      },
    })

  return { ok: true }
})