import { parser } from '@lezer/javascript'

// Defined by the console shim. It throws once the current task has spent over
// a second in loops, so an infinite loop can't freeze the preview.
const CALL = '__loopGuard();'

// Inserts a guard call at the start of every loop body.
export function guardLoops(code: string) {
  const inserts: { at: number; text: string }[] = []

  parser.parse(code).iterate({
    enter(node) {
      if (!['ForStatement', 'WhileStatement', 'DoStatement'].includes(node.name)) return

      const first = node.node.firstChild
      const body = node.name === 'DoStatement' ? first?.nextSibling : first?.nextSibling?.nextSibling
      if (!body || body.type.isError) return

      if (body.name === 'Block') {
        inserts.push({ at: body.from + 1, text: CALL })
      } else {
        inserts.push({ at: body.from, text: `{${CALL}` }, { at: body.to, text: '}' })
      }
    },
  })

  // Insert from the end, so earlier offsets stay valid.
  return inserts
    .sort((a, b) => b.at - a.at)
    .reduce((out, { at, text }) => out.slice(0, at) + text + out.slice(at), code)
}
