<script setup lang="ts">
import { z } from 'zod'
import { authClient } from '~/utils/auth-client'

const schema = z.object({ email: z.string().email('Email invalide') })
const state = reactive({ email: '' })
const loading = ref(false)
const sent = ref(false)

async function submit() {
	loading.value = true
	await authClient.requestPasswordReset({
		email: state.email,
		redirectTo: '/reinitialiser-mot-de-passe',
	})
	loading.value = false
	sent.value = true
}
</script>

<template>
	<UContainer class="max-w-sm py-16">
		<h1 class="mb-6 text-2xl font-semibold">Mot de passe oublié</h1>

		<p v-if="sent" class="text-sm">
			Si un compte existe avec cette adresse, un email vient d'être
			envoyé.
		</p>

		<UForm
			v-else
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
			<UButton type="submit" :loading="loading" block
				>Envoyer le lien</UButton
			>
		</UForm>
	</UContainer>
</template>
