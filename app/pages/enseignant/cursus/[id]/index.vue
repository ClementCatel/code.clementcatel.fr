<script setup lang="ts">
definePageMeta({ middleware: 'teacher' })

const route = useRoute()
const id = route.params.id as string

const { data: cursus, refresh } = await useFetch(`/api/curricula/${id}`)

async function move(index: number, direction: -1 | 1) {
	const list = [...(cursus.value?.exercises ?? [])]
	const target = index + direction
	if (target < 0 || target >= list.length) return

	const [moved] = list.splice(index, 1)
	list.splice(target, 0, moved!)

	await $fetch(`/api/curricula/${id}/reorder`, {
		method: 'PATCH',
		body: { ids: list.map((e) => e.id) },
	})
	await refresh()
}

async function remove(exerciseId: string) {
	await $fetch(`/api/exercises/${exerciseId}`, { method: 'DELETE' })
	await refresh()
}
</script>

<template>
	<UContainer v-if="cursus" class="py-8">
		<UButton
			to="/enseignant/cursus"
			variant="link"
			icon="i-lucide-arrow-left"
			class="mb-4 px-0"
		>
			Tous les cursus
		</UButton>

		<div class="mb-6 flex items-start justify-between gap-4">
			<div>
				<h1 class="text-2xl font-semibold">{{ cursus.title }}</h1>
				<p v-if="cursus.description" class="mt-1 text-sm text-gray-500">
					{{ cursus.description }}
				</p>
			</div>
			<UButton
				:to="`/enseignant/cursus/${id}/exercice/nouveau`"
				icon="i-lucide-plus"
				color="neutral"
			>
				Nouvel exercice
			</UButton>
		</div>

		<div
			v-if="!cursus.exercises.length"
			class="rounded-lg border border-dashed p-8 text-center text-sm"
		>
			Aucun exercice.
		</div>

		<ol v-else class="space-y-2">
			<li
				v-for="(ex, i) in cursus.exercises"
				:key="ex.id"
				class="flex items-center gap-3 rounded-lg bg-zinc-800 p-3"
			>
				<span class="w-6 text-sm text-gray-400">{{ i + 1 }}</span>
				<span class="flex-1 font-medium">{{ ex.title }}</span>

				<UButton
					size="xs"
					variant="ghost"
					icon="i-lucide-chevron-up"
					:disabled="i === 0"
					@click="move(i, -1)"
				/>
				<UButton
					size="xs"
					variant="ghost"
					icon="i-lucide-chevron-down"
					:disabled="i === cursus.exercises.length - 1"
					@click="move(i, 1)"
				/>
				<UButton
					size="xs"
					color="error"
					variant="ghost"
					icon="i-lucide-trash-2"
					@click="remove(ex.id)"
				/>
			</li>
		</ol>
	</UContainer>
</template>
