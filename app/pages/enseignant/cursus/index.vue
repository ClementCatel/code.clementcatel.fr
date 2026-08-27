<script setup lang="ts">
import {
	curriculumInputSchema,
	type CurriculumInput,
} from '#shared/schemas/curriculum'

definePageMeta({ middleware: 'teacher' })

const { data: curricula, refresh } = await useFetch('/api/curricula', {
	onResponseError: (error) => {
		if (error.response.status === 401) {
			navigateTo('/login')
		}
	},
})

const open = ref(false)
const saving = ref(false)
const state = reactive<CurriculumInput>({
	title: '',
	description: '',
	published: false,
})

async function create() {
	saving.value = true
	try {
		await $fetch('/api/curricula', { method: 'POST', body: state })
		open.value = false
		Object.assign(state, { title: '', description: '', published: false })
		await refresh()
	} finally {
		saving.value = false
	}
}

async function togglePublished(id: string, published: boolean) {
	await $fetch(`/api/curricula/${id}`, {
		method: 'PATCH',
		body: { published },
	})
	await refresh()
}

async function remove(id: string) {
	await $fetch(`/api/curricula/${id}`, { method: 'DELETE' })
	await refresh()
}
</script>

<template>
	<UContainer class="py-8">
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-semibold">Mes cursus</h1>
			<UButton color="neutral" icon="i-lucide-plus" @click="open = true"
				>Nouveau cursus</UButton
			>
		</div>

		<div
			v-if="!curricula?.length"
			class="rounded-lg border border-dashed p-8 text-center text-sm"
		>
			Aucun cursus pour l'instant.
		</div>

		<ul v-else class="space-y-3">
			<li
				v-for="c in curricula"
				:key="c.id"
				class="flex items-center gap-4 rounded-lg bg-zinc-800 p-4"
			>
				<div class="min-w-0 flex-1">
					<NuxtLink
						:to="`/enseignant/cursus/${c.id}`"
						class="font-medium hover:underline"
					>
						{{ c.title }}
					</NuxtLink>
					<p class="text-sm text-gray-500">
						{{ c.exerciseCount }} exercice(s)
					</p>
				</div>

				<USwitch
					:model-value="c.published"
					label="Publié"
					@update:model-value="togglePublished(c.id, $event)"
				/>

				<UButton
					color="error"
					variant="ghost"
					icon="i-lucide-trash-2"
					@click="remove(c.id)"
				/>
			</li>
		</ul>

		<UModal v-model:open="open" title="Nouveau cursus">
			<template #body>
				<UForm
					:schema="curriculumInputSchema"
					:state="state"
					class="space-y-4"
					@submit="create"
				>
					<UFormField label="Titre" name="title">
						<UInput
							v-model="state.title"
							class="w-full"
							autofocus
						/>
					</UFormField>
					<UFormField label="Description" name="description">
						<UTextarea
							v-model="state.description"
							:rows="3"
							class="w-full"
						/>
					</UFormField>
					<UButton type="submit" :loading="saving">Créer</UButton>
				</UForm>
			</template>
		</UModal>
	</UContainer>
</template>
