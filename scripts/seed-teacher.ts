import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { auth } from '../server/utils/auth'
import { db } from '../server/utils/db'
import { user } from '../server/database/schema'

const email = process.env.TEACHER_EMAIL
const password = process.env.TEACHER_PASSWORD

if (!email || !password) {
  console.error('Set TEACHER_EMAIL and TEACHER_PASSWORD in .env')
  process.exit(1)
}

async function main() {
  const existing = await db.select().from(user).where(eq(user.email, email!))

  if (existing.length > 0) {
    if (existing[0]?.role === 'teacher') {
      console.log(`${email} already exists as teacher — nothing to do.`)
      return
    }
    await db.update(user).set({ role: 'teacher' }).where(eq(user.email, email!))
    console.log(`Promoted existing account ${email} to teacher.`)
    return
  }

  await auth.api.signUpEmail({
    body: {
      email: email!,
      password: password!,
      name: 'Enseignant',
      firstName: 'Enseignant',
      lastName: 'Admin',
      groupTd: 'N/A',
    },
  })

  await db.update(user).set({ role: 'teacher', emailVerified: true }).where(eq(user.email, email!))
  console.log(`Created teacher account: ${email}`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })