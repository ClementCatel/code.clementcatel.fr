<script setup lang="ts">
import {
	exerciseInputSchema,
	type ExerciseInput,
} from '#shared/schemas/exercise'
import type { TestResult } from '~/utils/runner'

const props = defineProps<{ curriculumId: string }>()
const emit = defineEmits<{ saved: [id: string] }>()

const FILE_KEYS = ['html', 'css', 'js'] as const

const state = reactive<ExerciseInput>({
	curriculumId: props.curriculumId,
	title: '',
	statement: '',
	starterFiles: { html: '', css: '', js: '' },
	solutionFiles: { html: '', css: '', js: '' },
	tests: [{ label: '', code: '' }],
})

const { run, running } = useTestRunner()
const toast = useToast()
const saving = ref(false)
const checkResults = ref<TestResult[] | null>(null)

const verified = computed(
	() =>
		checkResults.value !== null &&
		checkResults.value.every((r) => r.passed),
)

watch(
	() => [state.solutionFiles, state.tests],
	() => {
		checkResults.value = null
	},
	{ deep: true },
)

function addTest() {
	state.tests.push({ label: '', code: '' })
}

function removeTest(index: number) {
	state.tests.splice(index, 1)
}

async function verify() {
	checkResults.value = await run(state.solutionFiles, state.tests)
}

async function save() {
	if (!verified.value) return
	saving.value = true
	try {
		const row = await $fetch<{ id: string }>('/api/exercises', {
			method: 'POST',
			body: state,
		})
		emit('saved', row.id)
	} catch (e: unknown) {
		toast.add({
			title: "Échec de l'enregistrement",
			description: (e as { data?: { message?: string } }).data?.message,
			color: 'error',
		})
	} finally {
		saving.value = false
	}
}
</script>

<template>
	<UForm
		:schema="exerciseInputSchema"
		:state="state"
		class="space-y-8"
		@submit="save"
	>
		<UFormField label="Titre" name="title">
			<UInput v-model="state.title" class="w-full" />
		</UFormField>

		<UFormField label="Consigne" name="statement">
			<UTextarea v-model="state.statement" :rows="4" class="w-full" />
		</UFormField>

		<section class="space-y-3">
			<h3 class="font-medium">Code de départ</h3>
			<UFormField
				v-for="key in FILE_KEYS"
				:key="key"
				:label="key.toUpperCase()"
			>
				<UTextarea
					v-model="state.starterFiles[key]"
					:rows="5"
					class="w-full font-mono text-sm"
				/>
			</UFormField>
		</section>

		<section class="space-y-3">
			<h3 class="font-medium">Solution de référence</h3>
			<UFormField
				v-for="key in FILE_KEYS"
				:key="key"
				:label="key.toUpperCase()"
			>
				<UTextarea
					v-model="state.solutionFiles[key]"
					:rows="5"
					class="w-full font-mono text-sm"
				/>
			</UFormField>
		</section>

		<section class="space-y-3">
			<h3 class="font-medium">Tests</h3>

			<div
				v-for="(test, i) in state.tests"
				:key="i"
				class="space-y-2 rounded-lg bg-zinc-800 p-3"
			>
				<UFormField
					label="Libellé montré à l'étudiant"
					:name="`tests.${i}.label`"
				>
					<UInput v-model="test.label" class="w-full" />
				</UFormField>
				<UFormField label="Code du test" :name="`tests.${i}.code`">
					<UTextarea
						v-model="test.code"
						:rows="2"
						class="w-full font-mono text-sm"
					/>
				</UFormField>
				<UButton
					size="xs"
					color="error"
					variant="ghost"
					:disabled="state.tests.length === 1"
					@click="removeTest(i)"
				>
					Supprimer
				</UButton>
			</div>

			<UButton
				size="sm"
				variant="subtle"
				icon="i-lucide-plus"
				@click="addTest"
			>
				Ajouter un test
			</UButton>
		</section>

		<section class="space-y-3">
			<UButton :loading="running" variant="subtle" @click="verify">
				Vérifier contre ma solution
			</UButton>

			<ul v-if="checkResults" class="space-y-1 text-sm">
				<li
					v-for="r in checkResults"
					:key="r.label"
					class="flex items-start gap-2"
				>
					<UIcon
						:name="r.passed ? 'i-lucide-check' : 'i-lucide-x'"
						:class="r.passed ? 'text-green-500' : 'text-red-500'"
						class="mt-0.5 shrink-0"
					/>
					<span>
						{{ r.label || '(libellé vide)' }}
						<span v-if="r.error" class="text-red-500"
							>— {{ r.error }}</span
						>
					</span>
				</li>
			</ul>
		</section>

		<UButton type="submit" :disabled="!verified" :loading="saving">
			Enregistrer
		</UButton>
	</UForm>
</template>
