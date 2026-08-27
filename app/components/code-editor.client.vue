<script setup lang="ts">
import { EditorView, basicSetup } from 'codemirror'
import { EditorState, Compartment } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { keymap } from '@codemirror/view'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const model = defineModel<string>({ required: true })
const props = defineProps<{
	language: 'html' | 'css' | 'js'
	readonly?: boolean
}>()

const host = ref<HTMLDivElement>()
const languageCompartment = new Compartment()
const readonlyCompartment = new Compartment()

let view: EditorView | undefined

function languageExtension() {
	if (props.language === 'html') return html()
	if (props.language === 'css') return css()
	return javascript()
}

onMounted(() => {
	view = new EditorView({
		parent: host.value!,
		state: EditorState.create({
			doc: model.value,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				languageCompartment.of(languageExtension()),
				oneDark,
				readonlyCompartment.of(
					EditorState.readOnly.of(props.readonly ?? false),
				),
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						model.value = update.state.doc.toString()
					}
				}),
			],
		}),
	})
})

watch(
	() => props.language,
	() => {
		view?.dispatch({
			effects: languageCompartment.reconfigure(languageExtension()),
		})
	},
)

watch(
	() => props.readonly,
	(value) => {
		view?.dispatch({
			effects: readonlyCompartment.reconfigure(
				EditorState.readOnly.of(value ?? false),
			),
		})
	},
)

watch(model, (value) => {
	if (view && value !== view.state.doc.toString()) {
		view.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: value },
		})
	}
})

onBeforeUnmount(() => view?.destroy())
</script>

<template>
	<div ref="host" class="h-full overflow-auto rounded-lg border text-sm" />
</template>
