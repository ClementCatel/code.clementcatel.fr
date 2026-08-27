
import { APIError, betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from '../database/schema'
import { sendMail } from './email'

const STUDENT_DOMAIN = '@etu.unicaen.fr'

function isAllowedEmail(email: string) {
  if (process.env.NODE_ENV !== 'production') return true
  
  const normalized = email.toLowerCase()
  if (normalized.endsWith(STUDENT_DOMAIN)) return true
  return normalized === process.env.TEACHER_EMAIL?.toLowerCase()
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema}),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail(
        user.email,
        'Réinitialise ton mot de passe',
        `<p>Bonjour,</p>
         <p>Clique sur ce lien pour choisir un nouveau mot de passe :</p>
         <p><a href="${url}">Réinitialiser mon mot de passe</a></p>
         <p>Ce lien expire dans une heure.</p>`,
      )
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail(
        user.email,
        'Confirme ton adresse email',
        `<p>Bonjour,</p>
        <p>Clique sur ce lien pour activer ton compte :</p>
        <p><a href="${url}">Confirmer mon adresse</a></p>`,
      )
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!isAllowedEmail(user.email)) {
            throw new APIError('BAD_REQUEST', {
              message: `Utilise ton adresse universitaire (${STUDENT_DOMAIN})`,
            })
          }
          return { data: user }
        },
      },
    },
  },
  user: {
    additionalFields: {
      role:     { type: 'string', defaultValue: 'student', input: false },
      firstName:{ type: 'string', required: true },
      lastName: { type: 'string', required: true },
      groupTd:  { type: 'string', required: true },
    },
  },
})