<script setup lang="ts"></script>

<template>
	<UFooter>
		<template #left>
			<p class="text-muted text-sm">
				code.clementcatel.fr © {{ new Date().getFullYear() }}
			</p>
		</template>

		<template #right>
			<UButton
				icon="i-simple-icons-linkedin"
				color="neutral"
				variant="ghost"
				to="https://www.linkedin.com/in/cl%C3%A9ment-catel/"
				target="_blank"
				aria-label="LinkedIn"
			/>
			<UButton
				icon="i-simple-icons-github"
				color="neutral"
				variant="ghost"
				to="https://github.com/ClementCatel/code.clementcatel.fr"
				target="_blank"
				aria-label="GitHub"
			/>
		</template>
	</UFooter>
</template>
