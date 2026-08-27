<script setup lang="ts">
import { z } from 'zod'
import { authClient } from '~/utils/auth-client'

const route = useRoute()
const token = route.query.token as string | undefined

const schema = z.object({ password: z.string().min(8, '8 caractères minimum') })
const state = reactive({ password: '' })
const loading = ref(false)
const errorMessage = ref('')

async function submit() {
	if (!token) return
	loading.value = true
	errorMessage.value = ''

	const { error } = await authClient.resetPassword({
		newPassword: state.password,
		token,
	})

	loading.value = false

	if (error) {
		errorMessage.value = 'Lien invalide ou expiré'
		return
	}

	await navigateTo('/connexion', { external: true })
}
</script>

<template>
	<UContainer class="max-w-sm py-16">
		<h1 class="mb-6 text-2xl font-semibold">Nouveau mot de passe</h1>

		<p v-if="!token" class="text-sm text-red-500">Lien invalide.</p>

		<UForm
			v-else
			:schema="schema"
			:state="state"
			:validate-on="[]"
			class="space-y-4"
			@submit="submit"
		>
			<UFormField label="Mot de passe" name="password">
				<UInput
					v-model="state.password"
					type="password"
					class="w-full"
					autofocus
				/>
			</UFormField>
			<p v-if="errorMessage" class="text-sm text-red-500">
				{{ errorMessage }}
			</p>
			<UButton type="submit" :loading="loading" block>Valider</UButton>
		</UForm>
	</UContainer>
</template>
