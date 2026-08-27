<script setup lang="ts">
definePageMeta({ middleware: 'student' })

const { data: curricula } = await useFetch('/api/student/curricula')
</script>

<template>
	<UContainer class="py-8">
		<h1 class="mb-6 text-2xl font-semibold">Cursus disponibles</h1>

		<div
			v-if="!curricula?.length"
			class="rounded-lg border border-dashed p-8 text-center text-sm"
		>
			Aucun cursus publié pour le moment.
		</div>

		<ul v-else class="space-y-3">
			<li
				v-for="c in curricula"
				:key="c.id"
				class="rounded-lg bg-zinc-800 p-4"
			>
				<NuxtLink
					:to="`/cursus/${c.id}`"
					class="font-medium hover:underline"
				>
					{{ c.title }}
				</NuxtLink>
				<p v-if="c.description" class="mt-1 text-sm text-gray-500">
					{{ c.description }}
				</p>
				<UProgress
					:model-value="c.done"
					:max="c.total || 1"
					class="mt-3"
				/>
				<p class="mt-1 text-xs text-gray-500">
					{{ c.done }} / {{ c.total }} exercices
				</p>
			</li>
		</ul>
	</UContainer>
</template>
