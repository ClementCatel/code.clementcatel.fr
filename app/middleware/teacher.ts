export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await useAuthSession()

  if (!session.value) {
    return navigateTo('/connexion')
  }
  if (session.value.user.role !== 'teacher') {
    return abortNavigation({ statusCode: 403, message: 'Réservé aux enseignants' })
  }
})