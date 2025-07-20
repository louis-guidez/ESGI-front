import { toast } from 'vue-sonner'

export interface Categorie {
  id: number
  label: string
}

export const useCategorieStore = defineStore('categorie', () => {
  const categories = ref<Categorie[]>([])
  const loading = ref(false)

  // 🔄 Récupération de toutes les catégories depuis l’API
  const fetchCategories = async () => {
    try {
      loading.value = true
      const data = await apiFetch<Categorie[]>('/categories')
      categories.value = data
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories')
      console.error('fetchCategories error:', error)
    } finally {
      loading.value = false
    }
  }

  // 📌 Récupération d'une catégorie par ID
  const getById = (id: number): Categorie | undefined => {
    return categories.value.find((c) => c.id === id)
  }

  // 📋 Récupération de toutes les catégories (copie protégée)
  const getAllCategories = (): Categorie[] => {
    return [...categories.value]
  }

  return {
    categories,
    loading,
    fetchCategories,
    getById,
    getAllCategories,
  }
})
