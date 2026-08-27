<script setup lang="ts">
definePageMeta({ middleware: 'student' })

const route = useRoute()
const id = route.params.id as string

const { data: exercises } = await useFetch(`/api/curricula/${id}/exercises`)
</script>

<template>
	<UContainer class="py-8">
		<UButton
			to="/cursus"
			variant="link"
			icon="i-lucide-arrow-left"
			class="mb-4 px-0"
		>
			Tous les cursus
		</UButton>

		<ol class="space-y-2">
			<li
				v-for="ex in exercises"
				:key="ex.id"
				class="flex items-center gap-3 rounded-lg bg-zinc-800 p-4"
			>
				<UIcon
					:name="
						ex.completed
							? 'i-lucide-circle-check'
							: ex.unlocked
								? 'i-lucide-circle'
								: 'i-lucide-lock'
					"
					:class="ex.completed ? 'text-green-500' : 'text-gray-400'"
				/>

				<NuxtLink
					v-if="ex.unlocked"
					:to="`/exercice/${ex.id}`"
					class="flex-1 font-medium hover:underline"
				>
					{{ ex.position }}. {{ ex.title }}
				</NuxtLink>
				<span v-else class="flex-1 text-gray-400"
					>{{ ex.position }}. {{ ex.title }}</span
				>
			</li>
		</ol>
	</UContainer>
</template>
