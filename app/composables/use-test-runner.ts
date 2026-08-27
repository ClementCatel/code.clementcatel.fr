import { buildDoc, type CodeFiles, type ExerciseTest, type TestResult } from '~/utils/runner'

const TIMEOUT_MS = 3000

export function useTestRunner() {
  const running = ref(false)

  function run(files: CodeFiles, tests: ExerciseTest[]): Promise<TestResult[]> {
    running.value = true
    const runId = crypto.randomUUID()

    return new Promise((resolve) => {
      const frame = document.createElement('iframe')
      frame.setAttribute('sandbox', 'allow-scripts')
      frame.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden'

      let settled = false
      const finish = (results: TestResult[]) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        window.removeEventListener('message', onMessage)
        frame.remove()
        running.value = false
        resolve(results)
      }

      const onMessage = (e: MessageEvent) => {
        if (e.source !== frame.contentWindow) return
        if (e.data?.runId !== runId) return

        if (e.data.type === 'exercise:results') finish(e.data.results)
        if (e.data.type === 'exercise:crash') {
          finish(tests.map(t => ({
            label: t.label, passed: false, error: `Erreur JS : ${e.data.message}`,
          })))
        }
      }

      const timer = setTimeout(() => {
        finish(tests.map(t => ({
          label: t.label,
          passed: false,
          error: 'Ton code ne répond pas — boucle infinie ?',
        })))
      }, TIMEOUT_MS)

      window.addEventListener('message', onMessage)
      document.body.appendChild(frame)
      frame.srcdoc = buildDoc(files, tests, runId)
    })
  }

  return { run, running }
}