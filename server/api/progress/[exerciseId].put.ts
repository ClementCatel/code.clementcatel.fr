import { codeFilesSchema } from '#shared/schemas/exercise'
import { db } from '../../utils/db'
import { progress } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireUser(event)
  const exerciseId = getRouterParam(event, 'exerciseId')!
  const files = await readValidatedBody(event, codeFilesSchema.parse)

  await db.insert(progress)
    .values({ userId: session.user.id, exerciseId, draftFiles: files })
    .onConflictDoUpdate({
      target: [progress.userId, progress.exerciseId],
      set: { draftFiles: files, updatedAt: new Date() },
    })

  return { ok: true }
})