import type { CodeFiles, ExerciseTest } from '../shared/schemas/exercise'

export type ExerciseContent = {
  // Unique within the curriculum. The exercise id is `<curriculum id>--<slug>`,
  // so renaming a slug creates a new exercise and drops progress on the old one.
  slug: string
  title: string
  statement: string
  starterFiles: Partial<CodeFiles>
  solutionFiles: Partial<CodeFiles>
  tests: ExerciseTest[]
}

export type CurriculumContent = {
  // Stable database id, kebab-case. Changing it creates a new curriculum.
  id: string
  title: string
  description?: string
  exercises: ExerciseContent[]
}

export function defineCurriculum(content: CurriculumContent) {
  return content
}
