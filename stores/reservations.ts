import { toast } from 'vue-sonner'

export interface Reservation {
  id: number
  dateDebut: string
  dateFin: string
  statut: string
  stripeAmount: number
  utilisateurId: number
  annonce: Annonce
}

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref<Reservation[]>([])
  const loading = ref(false)

  const getReservationsByUser = async () => {
    console.log('🔄 Chargement des réservations utilisateur...')
    try {
      const { user } = useUserStore()
      if (!user?.token) throw new Error('Utilisateur non authentifié')

      loading.value = true

      const data = await apiFetch<Reservation[]>('/secure/utilisateurs/reservations', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      reservations.value = data
      return data
    } catch (error) {
      console.error('Erreur lors du chargement des réservations :', error)
      toast.error('Erreur lors du chargement des réservations')
      return []
    } finally {
      loading.value = false
    }
  }

  // deleteReservation

  const deleteReservation = async (id: number) => {
    try {
      const { user } = useUserStore()
      if (!user?.token) throw new Error('Utilisateur non authentifié')

      await apiFetch(`/secure/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      // Remove from local state
      reservations.value = reservations.value.filter((r) => r.id !== id)
      toast.success('Réservation supprimée avec succès')
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation :', error)
      toast.error('Erreur lors de la suppression de la réservation')
    }
  }

  return {
    reservations,
    loading,
    getReservationsByUser,
    deleteReservation,
  }
})
