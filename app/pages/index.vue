<script setup lang="ts">
const { data: session } = await useAuthSession()
</script>

<template>
	<UContainer class="py-16">
		<h1 class="text-3xl font-semibold mb-4">
			Plateforme d'exercices sur le développement web
		</h1>
		<p class="text-gray-300">
			Découvrez une collection d'exercices pour maîtriser les bases du
			développement web.
		</p>

		<div v-if="!session" class="mt-8">
			<UButton to="/connexion" size="xl" color="neutral">
				Se connecter
			</UButton>
		</div>

		<div v-else-if="session.user.role === 'teacher'" class="mt-8">
			<UButton to="/enseignant/cursus" size="xl" color="neutral">
				Mes cursus
			</UButton>
		</div>

		<div v-else class="mt-8">
			<UButton to="/cursus" size="xl" color="neutral">
				Voir les cursus disponibles
			</UButton>
		</div>

		<ClientOnly>
			<img
				src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamFjM2pudGhpbXpsdnc5Nmhub2NrenhibTFtbmczc2JmbTludTJndCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/scZPhLqaVOM1qG4lT9/giphy.gif"
				alt="Gif"
				class="mt-8"
        height="300"
        width="300"
			>
		</ClientOnly>
	</UContainer>
</template>
