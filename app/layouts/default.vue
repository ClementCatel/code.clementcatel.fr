<template>
	<div class="min-h-screen flex flex-col">
		<AppHeader />
		<main class="grow">
			<slot />
		</main>
		<AppFooter />
	</div>
</template>
