<script setup lang="ts">
import { buildDoc, type CodeFiles, type ConsoleEntry } from '~/utils/runner'

const props = defineProps<{ files: CodeFiles }>()

const debounced = ref<CodeFiles>({ ...props.files })
// Bumped on every rebuild, so messages from a previous run are ignored.
const version = ref(0)
const entries = ref<ConsoleEntry[]>([])

watchDebounced(
	() => props.files,
	(value) => {
		debounced.value = { ...value }
		version.value++
		entries.value = []
	},
	{ debounce: 300, deep: true },
)

const runId = computed(() => `preview-${version.value}`)
const doc = computed(() => buildDoc(debounced.value, runId.value))

// Hidden for HTML/CSS-only exercises.
const showConsole = computed(
	() => debounced.value.js.trim() !== '' || entries.value.length > 0,
)

const frame = ref<HTMLIFrameElement>()
const consoleEl = ref<HTMLElement>()

useEventListener(window, 'message', (e: MessageEvent) => {
	if (e.source !== frame.value?.contentWindow) return
	if (e.data?.type !== 'exercise:console' || e.data.runId !== runId.value) return

	entries.value.push({ level: e.data.level, text: e.data.text })
	nextTick(() => {
		if (consoleEl.value) consoleEl.value.scrollTop = consoleEl.value.scrollHeight
	})
})

const levelClass: Record<ConsoleEntry['level'], string> = {
	log: '',
	info: '',
	warn: 'text-amber-400',
	error: 'text-red-400',
}
</script>

<template>
	<div class="flex h-full flex-col gap-3">
		<!-- Client-only, so the message listener exists before the first run. -->
		<ClientOnly>
			<iframe
				ref="frame"
				:srcdoc="doc"
				sandbox="allow-scripts allow-popups"
				class="min-h-0 w-full flex-1 rounded-lg border bg-white"
			/>
		</ClientOnly>

		<div
			v-if="showConsole"
			class="flex h-48 shrink-0 flex-col rounded-lg bg-zinc-800"
		>
			<h2 class="px-3 pt-2 pb-1 text-xs font-medium text-zinc-400">
				Console
			</h2>
			<div
				ref="consoleEl"
				class="flex-1 overflow-y-auto px-3 pb-2 font-mono text-xs"
			>
				<p v-if="!entries.length" class="text-zinc-500">
					Les messages de console.log s'affichent ici.
				</p>
				<p
					v-for="(entry, i) in entries"
					:key="i"
					:class="levelClass[entry.level]"
					class="border-b border-zinc-700/50 py-1 break-words whitespace-pre-wrap"
				>
					{{ entry.text }}
				</p>
			</div>
		</div>
	</div>
</template>
