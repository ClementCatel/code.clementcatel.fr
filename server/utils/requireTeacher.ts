import type { H3Event } from 'h3'
import { auth } from './auth'

export async function requireTeacher(event: H3Event) {
  const session = await auth.api.getSession({ headers: event.headers })

  if (!session) throw createError({ statusCode: 401, message: 'Non authentifié' })
  if (session.user.role !== 'teacher') {
    throw createError({ statusCode: 403, message: 'Réservé aux enseignants' })
  }
  return session
}