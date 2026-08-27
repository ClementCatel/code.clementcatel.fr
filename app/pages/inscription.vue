<script setup lang="ts">
import {
	studentSignupSchema,
	GROUPES_TD,
	type StudentSignup,
} from '#shared/schemas/signup'
import { authClient } from '~/utils/auth-client'

const state = reactive<StudentSignup>({
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	groupTd: 'TD1',
})

const loading = ref(false)
const errorMessage = ref('')
const sent = ref(false)

async function submit() {
	loading.value = true
	errorMessage.value = ''

	const { error } = await authClient.signUp.email({
		email: state.email,
		password: state.password,
		name: `${state.firstName} ${state.lastName}`,
		firstName: state.firstName,
		lastName: state.lastName,
		groupTd: state.groupTd,
	})

	loading.value = false

	if (error) {
		errorMessage.value = error.message ?? 'Inscription impossible'
		return
	}

	sent.value = true
}
</script>

<template>
	<UContainer class="max-w-sm py-16">
		<h1 class="mb-6 text-2xl font-semibold">Inscription</h1>

		<p v-if="sent" class="text-sm">
			Compte créé. Ouvre l'email de confirmation pour activer ton accès.
		</p>

		<UForm
			v-else
			:schema="studentSignupSchema"
			:state="state"
			:validate-on="[]"
			class="space-y-4"
			@submit="submit"
		>
			<UFormField label="Prénom" name="firstName">
				<UInput v-model="state.firstName" class="w-full" autofocus />
			</UFormField>

			<UFormField label="Nom" name="lastName">
				<UInput v-model="state.lastName" class="w-full" />
			</UFormField>

			<UFormField label="Email universitaire" name="email">
				<UInput v-model="state.email" type="email" class="w-full" />
			</UFormField>

			<UFormField label="Groupe TD" name="groupTd">
				<USelect
					v-model="state.groupTd"
					:items="[...GROUPES_TD]"
					class="w-full"
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
				>Créer mon compte</UButton
			>
		</UForm>

		<p class="mt-4 text-sm text-gray-500">
			Déjà inscrit ?
			<NuxtLink to="/connexion" class="font-medium text-blue-600"
				>Se connecter</NuxtLink
			>
		</p>
	</UContainer>
</template>
