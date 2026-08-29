<script setup lang="ts">
definePageMeta({ middleware: 'teacher' })

const route = useRoute()
const curriculumId = route.params.id as string
const exerciseId = route.params.exerciseId as string

const { data: exercice } = await useFetch(`/api/teacher/exercises/${exerciseId}`)

function onSaved() {
  navigateTo(`/enseignant/cursus/${curriculumId}`)
}
</script>

<template>
  <UContainer v-if="exercice" class="py-8">
    <UButton
      :to="`/enseignant/cursus/${curriculumId}`"
      variant="link"
      icon="i-lucide-arrow-left"
      class="mb-4 px-0"
    >
      Retour au cursus
    </UButton>

    <h1 class="mb-6 text-2xl font-semibold">Modifier l'exercice</h1>

    <ExerciseForm :curriculum-id="curriculumId" :exercise="exercice" @saved="onSaved" />
  </UContainer>
</template>