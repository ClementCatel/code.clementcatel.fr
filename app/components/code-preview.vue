<script setup lang="ts">
import { buildDoc, type CodeFiles } from '~/utils/runner'

const props = defineProps<{ files: CodeFiles }>()

const debounced = ref<CodeFiles>({ ...props.files })

watchDebounced(
	() => props.files,
	(value) => {
		debounced.value = { ...value }
	},
	{ debounce: 300, deep: true },
)

const doc = computed(() => buildDoc(debounced.value))
</script>

<template>
	<iframe
		:srcdoc="doc"
		sandbox="allow-scripts allow-popups"
		class="h-full w-full rounded-lg border bg-white"
	/>
</template>
