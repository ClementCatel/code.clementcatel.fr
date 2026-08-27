<script setup lang="ts">
import { z } from 'zod'
import { authClient } from '~/utils/auth-client'

const schema = z.object({
	email: z.email('Email invalide'),
	password: z.string().min(8, '8 caractères minimum'),
})

const state = reactive({ email: '', password: '' })
const loading = ref(false)
const errorMessage = ref('')

async function submit() {
	loading.value = true
	errorMessage.value = ''

	const { error } = await authClient.signIn.email({
		email: state.email,
		password: state.password,
  })

	loading.value = false

	if (error) {
		errorMessage.value = 'Identifiants incorrects'
		return
	}

  const { data } = await authClient.getSession({ query: { disableCookieCache: true } })

  const target = data?.user.role === 'teacher' ? '/enseignant/cursus' : '/cursus'

  await clearNuxtData('auth:session')
  await navigateTo(
    target,
    { external: true },
  )
}
</script>

<template>
	<UContainer class="max-w-sm py-16">
		<h1 class="mb-6 text-2xl font-semibold">Connexion</h1>

		<UForm
			:schema="schema"
			:state="state"
			:validate-on="[]"
			class="space-y-4"
			@submit="submit"
		>
			<UFormField label="Email" name="email">
				<UInput
					v-model="state.email"
					type="email"
					class="w-full"
					autofocus
				/>
			</UFormField>

			<UFormField label="Mot de passe" name="password">
				<UInput
					v-model="state.password"
					type="password"
					class="w-full"
				/>
			</UFormField>

			<p v-if="errorMessage" class="text-sm text-red-500">
				{{ errorMessage }}
			</p>

			<UButton type="submit" :loading="loading" block
				>Se connecter</UButton
			>
		</UForm>

		<p class="mt-4 text-sm">
			<NuxtLink to="/mot-de-passe-oublie" class="underline"
				>Mot de passe oublié ?</NuxtLink
			>
		</p>

		<p class="mt-4 text-sm text-gray-500">
			Pas encore de compte ?
			<NuxtLink to="/inscription" class="font-medium text-blue-600"
				>Inscrivez-vous</NuxtLink
			>
		</p>
	</UContainer>
</template>
