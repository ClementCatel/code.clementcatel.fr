<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { authClient } from '~/utils/auth-client'

const { data: session } = await useAuthSession()

const isTeacher = computed(() => session.value?.user.role === 'teacher')

async function logout() {
  await authClient.signOut()
  await clearNuxtData('auth:session')
  await navigateTo('/connexion', { external: true })
}

const items = ref<NavigationMenuItem[]>([
	{
		label: 'Mes cursus',
		to: isTeacher.value ? '/enseignant/cursus' : '/cursus',
	},
])
</script>

<template>
	<UHeader title="code.clementcatel.fr" class="bg-zinc-950">
		<UNavigationMenu :items="items" />

		<template #right>
			<template v-if="session">
				<span class="text-sm text-gray-300 px-2">
					{{ session.user.firstName }} {{ session.user.lastName }}
				</span>
				<UButton
					size="xs"
					color="neutral"
					variant="ghost"
					icon="i-lucide-log-out"
					@click="logout"
				>
					Déconnexion
				</UButton>
			</template>
			<template v-else>
				<UButton size="xs" to="/connexion">Connexion</UButton>
			</template>
		</template>

		<template #body>
			<UNavigationMenu
				:items="items"
				orientation="vertical"
				class="-mx-2.5"
			/>
		</template>
	</UHeader>
</template>
