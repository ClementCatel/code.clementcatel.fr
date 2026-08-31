<script setup lang="ts">
import type { CodeFiles, TestResult } from '~/utils/runner'
import confetti from 'canvas-confetti'

definePageMeta({ middleware: 'student', layout: 'bare' })

const route = useRoute()
const id = route.params.id as string

const { data: exercice } = await useFetch(`/api/exercises/${id}`)

const FILE_KEYS = ['html', 'css', 'js'] as const
const active = ref<(typeof FILE_KEYS)[number]>('html')

const files = ref<CodeFiles>({ ...(exercice.value?.files as CodeFiles) })
const results = ref<TestResult[] | null>(null)
const solved = ref(exercice.value?.completed ?? false)

const { run, running } = useTestRunner()

watchDebounced(
	files,
	() => {
		if (solved.value) return
		$fetch(`/api/progress/${id}`, { method: 'PUT', body: files.value })
	},
	{ debounce: 1000, deep: true },
)

async function validate() {
	results.value = await run(files.value, exercice.value?.tests ?? [])

	if (results.value.every((r) => r.passed)) {
		solved.value = true
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		})
		await $fetch(`/api/progress/${id}/complete`, {
			method: 'POST',
			body: files.value,
		})
	}
}

function goNext() {
	navigateTo(
		exercice.value?.nextId
			? `/exercice/${exercice.value.nextId}`
			: `/cursus/${exercice.value?.curriculumId}`,
	)
}
</script>

<template>
	<div v-if="exercice" class="flex h-screen flex-col">
		<header class="flex items-center gap-4 bg-zinc-950 px-6 py-3">
			<UButton
				:to="`/cursus/${exercice.curriculumId}`"
				variant="link"
				icon="i-lucide-arrow-left"
				class="px-0"
			/>
			<h1 class="flex-1 font-medium">
				{{ exercice.position }}. {{ exercice.title }}
			</h1>
			<UButton :loading="running" :disabled="solved" @click="validate"
				>Valider</UButton
			>
		</header>

		<div class="grid flex-1 grid-cols-[3fr_4fr_3fr] gap-4 overflow-hidden p-4">
			<section class="flex flex-col gap-3 overflow-y-auto">
				<div
					v-if="solved"
					class="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm"
				>
					<UIcon
						name="i-lucide-circle-check"
						class="text-green-500"
					/>
					Exercice validé
				</div>
				<div
					class="rounded-lg bg-zinc-800 p-4 text-sm whitespace-pre-line"
				>
					<h2 class="font-medium text-xl mb-2">Consignes</h2>
					{{ exercice.statement }}
				</div>

				<div v-if="results" class="rounded-lg bg-zinc-800 p-4">
					<ul class="space-y-2 text-sm">
						<li
							v-for="r in results"
							:key="r.label"
							class="flex items-start gap-2"
						>
							<UIcon
								:name="
									r.passed ? 'i-lucide-check' : 'i-lucide-x'
								"
								:class="
									r.passed ? 'text-green-500' : 'text-red-500'
								"
								class="mt-0.5 shrink-0"
							/>
							<span>
								{{ r.label }}
								<span v-if="r.error" class="text-red-500"
									>— {{ r.error }}</span
								>
							</span>
						</li>
					</ul>

					<UButton v-if="solved" class="mt-4" block @click="goNext">
						{{
							exercice.nextId
								? 'Exercice suivant'
								: 'Terminer le cursus'
						}}
					</UButton>
				</div>
			</section>

			<section class="flex min-h-0 flex-col overflow-hidden">
				<div class="mb-2 flex gap-1">
					<UButton
						v-for="key in FILE_KEYS"
						:key="key"
						size="xs"
						:variant="active === key ? 'solid' : 'ghost'"
						color="neutral"
						@click="active = key"
					>
						{{ key.toUpperCase() }}
					</UButton>
				</div>

				<ClientOnly>
					<CodeEditor
						v-model="files[active]"
						:language="active"
						:readonly="solved"
						class="flex-1 overflow-hidden"
					/>
				</ClientOnly>
			</section>

			<section class="overflow-hidden">
				<CodePreview :files="files" />
			</section>
		</div>
	</div>
</template>
