import { toast } from 'vue-sonner'

export interface Annonce {
  id: number
  titre: string
  description: string
  categories: string[]
  prix: number | string
  statut: string
  dateCreation: Date
  photos: string[]
  user: User
}

export const useAnnonceStore = defineStore('annonce', () => {
  const annonces = ref<Annonce[]>([])
  const loading = ref(false)

  const search = ref('')

  const fetchAnnonces = async (search?: string) => {
    try {
      loading.value = true
      const data = await apiFetch<Annonce[]>('/annonces', { query: { q: search } })
      console.log('📦 Annonces chargées :', data)
      // annonces.value = data
      return data
    } catch {
      toast.error('Erreur lors du chargement des annonces')
    } finally {
      loading.value = false
    }
  }

  const getAnnonce = async (id: number) => {
    try {
      const data = await apiFetch<Annonce>(`/annonces/${id}`)
      return data
    } catch {
      toast.error('Erreur lors du chargement de l’annonce')
    } finally {
      loading.value = false
    }
  }

  const groupedByCategory = computed(() => {
    const map = new Map<string, Annonce[]>()

    for (const annonce of annonces.value) {
      const categorie = (annonce as Annonce).categories || 'Autre' // adapte selon ton modèle
      if (!map.has(categorie)) map.set(categorie, [])
      map.get(categorie)!.push(annonce)
    }

    console.log('📦 Annonces chargées :', Array.from(map.entries()))

    return Array.from(map.entries()).map(([categorie, annonces]) => ({ categorie, annonces }))
  })

  const createAnnonce = async (formData: FormData) => {
    try {
      const { user } = useUserStore()
      if (!user?.token) throw new Error('Utilisateur non authentifié')

      const response = await apiFetch('/secure/annonces', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      toast.success('Annonce créée avec succès')
      return response
    } catch (e) {
      if (e instanceof Error) {
        console.error('Erreur lors de la création de l’annonce:', e.message)
      } else {
        toast.error('Erreur lors de la création de l’annonce')
      }
    }
  }

  const updateAnnonce = async (id: number, formData: FormData) => {
    try {
      const { user } = useUserStore()
      if (!user?.token) throw new Error('Utilisateur non authentifié')

      const response = await apiFetch(`/secure/annonces/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      toast.success('Annonce mise à jour')
      return response
    } catch {
      toast.error('Erreur lors de la mise à jour de l’annonce')
    }
  }

  const deleteAnnonce = async (id: number) => {
    try {
      const { user } = useUserStore()
      if (!user?.token) throw new Error('Utilisateur non authentifié')

      await apiFetch(`/annonces/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      annonces.value = annonces.value.filter((a) => a.id !== id)
      toast.success('Annonce supprimée')
    } catch {
      toast.error('Erreur lors de la suppression de l’annonce')
    }
  }

  return {
    annonces,
    loading,
    fetchAnnonces,
    getAnnonce,
    createAnnonce,
    updateAnnonce,
    deleteAnnonce,
    groupedByCategory,
    search,
  }
})
