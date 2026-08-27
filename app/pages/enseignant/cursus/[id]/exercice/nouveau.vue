<script setup lang="ts">
definePageMeta({ middleware: 'teacher' })

const route = useRoute()
const curriculumId = route.params.id as string

function onSaved() {
	navigateTo(`/enseignant/cursus/${curriculumId}`)
}
</script>

<template>
	<UContainer class="py-8">
		<h1 class="mb-6 text-2xl font-semibold">Nouvel exercice</h1>
		<ExerciseForm :curriculum-id="curriculumId" @saved="onSaved" />
	</UContainer>
</template>
