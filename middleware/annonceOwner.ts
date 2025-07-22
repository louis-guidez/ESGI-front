import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware(async ({ params: { id } }) => {
  const { user } = extractStore(useUserStore())
  const { getAnnonce } = extractStore(useAnnonceStore())

  try {
    const response = await getAnnonce(Number(id))
    if (!response) return

    if (response.user.id !== user.value?.id) {
      toast.error('Vous n’avez pas le droit de modifier cette annonce')
      return abortNavigation()
    }
  } catch {
    toast.error('Annonce introuvable')

    return abortNavigation()
  }
})
