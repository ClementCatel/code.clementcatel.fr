import 'dotenv/config'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { count, eq, inArray } from 'drizzle-orm'
import { db } from '../server/utils/db'
import { curriculum, exercise, progress } from '../server/database/schema'
import { curriculumInputSchema } from '../shared/schemas/curriculum'
import { exerciseInputSchema } from '../shared/schemas/exercise'
import type { CurriculumContent } from '../content/define'

const MAX_TESTS = 5
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

const args = process.argv.slice(2)
const name = args.find(a => !a.startsWith('--'))
const apply = args.includes('--apply')
const prune = args.includes('--prune')

if (!name) {
  console.error('Usage: pnpm seed:curriculum <name> [--apply] [--prune]')
  process.exit(1)
}

// Template literals in content files are indented with the code around them.
function dedent(text: string) {
  const lines = text.replace(/^\n/, '').trimEnd().split('\n')
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^[ \t]*/)![0].length))
  return lines.map(l => l.slice(indent)).join('\n')
}

// jsonb does not preserve key order, so compare with sorted keys.
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical((value as Record<string, unknown>)[k])]))
  }
  return value
}

const same = (a: unknown, b: unknown) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b))

async function load(): Promise<CurriculumContent> {
  const path = resolve('content', `${name}.ts`)
  if (!existsSync(path)) throw new Error(`No content file at ${path}`)
  return (await import(pathToFileURL(path).href)).default
}

function validate(content: CurriculumContent) {
  if (!SLUG.test(content.id)) throw new Error(`Curriculum id "${content.id}" must be kebab-case`)
  const meta = curriculumInputSchema.parse({ title: content.title, description: content.description })

  const slugs = new Set<string>()
  const exercises = content.exercises.map((ex, i) => {
    const where = `Exercise ${i + 1} (${ex.slug})`
    if (!SLUG.test(ex.slug)) throw new Error(`${where}: slug must be kebab-case`)
    if (slugs.has(ex.slug)) throw new Error(`${where}: duplicate slug`)
    slugs.add(ex.slug)
    if (ex.tests.length > MAX_TESTS) throw new Error(`${where}: ${ex.tests.length} tests, max ${MAX_TESTS}`)

    const files = (f: Record<string, string | undefined>) =>
      Object.fromEntries(Object.entries(f).map(([k, v]) => [k, dedent(v ?? '')]))

    const parsed = exerciseInputSchema.safeParse({
      curriculumId: content.id,
      title: ex.title,
      statement: dedent(ex.statement),
      starterFiles: files(ex.starterFiles),
      solutionFiles: files(ex.solutionFiles),
      tests: ex.tests.map(t => ({ label: t.label, code: dedent(t.code) })),
    })
    if (!parsed.success) throw new Error(`${where}: ${parsed.error.message}`)

    return { ...parsed.data, id: `${content.id}--${ex.slug}`, position: i + 1 }
  })

  return { meta, exercises }
}

async function main() {
  const content = await load()
  const { meta, exercises } = validate(content)

  const [current] = await db.select().from(curriculum).where(eq(curriculum.id, content.id))
  const existing = await db.select().from(exercise).where(eq(exercise.curriculumId, content.id))
  const byId = new Map(existing.map(e => [e.id, e]))
  const wanted = new Set(exercises.map(e => e.id))
  const stale = existing.filter(e => !wanted.has(e.id))

  console.log(`Curriculum "${meta.title}" (${content.id}): ${
    !current ? 'create, unpublished'
    : current.title === meta.title && (current.description ?? undefined) === meta.description ? 'unchanged'
    : 'update'
  }${current ? `, ${current.published ? 'published' : 'unpublished'}` : ''}`)

  for (const ex of exercises) {
    const row = byId.get(ex.id)
    const status = !row ? 'create'
      : (['position', 'title', 'statement', 'starterFiles', 'solutionFiles', 'tests'] as const)
          .every(k => same(row[k], ex[k])) ? 'unchanged' : 'update'
    console.log(`  ${String(ex.position).padStart(2)}. ${status.padEnd(9)} ${ex.title}`)
  }

  if (stale.length) {
    const counts = await db
      .select({ exerciseId: progress.exerciseId, n: count() })
      .from(progress)
      .where(inArray(progress.exerciseId, stale.map(e => e.id)))
      .groupBy(progress.exerciseId)
    const n = new Map(counts.map(c => [c.exerciseId, c.n]))

    console.log(`\n${stale.length} exercise(s) in the database are missing from the file:`)
    for (const e of stale) console.log(`  - ${e.title} (${e.id}), ${n.get(e.id) ?? 0} student progress row(s)`)
    if (!prune) {
      console.error('\nAborting. Re-run with --prune to delete them along with their student progress.')
      process.exit(1)
    }
    console.log('They will be deleted (--prune).')
  }

  if (!apply) {
    console.log('\nDry run, nothing written. Re-run with --apply to write.')
    return
  }

  await db.transaction(async (tx) => {
    await tx.insert(curriculum)
      .values({ id: content.id, ...meta, published: false })
      .onConflictDoUpdate({ target: curriculum.id, set: { title: meta.title, description: meta.description ?? null } })

    if (stale.length) await tx.delete(exercise).where(inArray(exercise.id, stale.map(e => e.id)))

    for (const { curriculumId: _, ...ex } of exercises) {
      await tx.insert(exercise)
        .values({ ...ex, curriculumId: content.id })
        .onConflictDoUpdate({ target: exercise.id, set: ex })
    }
  })

  console.log('\nWritten.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
  })
