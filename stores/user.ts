import { toast } from 'vue-sonner'

export interface User {
  id: number
  email: string | null
  roles: string[]
  password?: string | null
  nom?: string | null
  prenom?: string | null
  dateInscription?: Date | null
  cagnotte?: string | null
  emailIsVerified?: boolean | null
  adresse?: string | null
  postalCode?: number | null
  ville?: string | null
  pays?: string | null
}

export const useUserStore = defineStore('user', () => {
  // JSON.parse(localStorage.getItem('user') || 'null')
  const user = ref<User | null>(null)

  const getUsers = async () => apiFetch<User[]>('/utilisateurs')

  const login = async ({ email, password }: Partial<User>) => {
    try {
      const { userId } = await apiFetch<{ message: string; userId: number }>('/login', {
        method: 'POST',
        body: { email, password },
      })

      const users = await getUsers()

      if (!users) {
        throw new Error('No users found')
      }

      const foundUser = users.find(({ id }) => id === userId)
      if (!foundUser) {
        throw new Error(`No user found with id ${userId}`)
      }

      user.value = foundUser

      toast.success('Connexion reussie !')
    } catch {
      toast.error('Erreur lors de la connexion')
    }
  }

  const register = async ({ email, password }: Partial<User>) => {
    try {
      await apiFetch('/register', {
        method: 'POST',
        body: { email, password },
      })

      toast.success('Création de compte reussie ! Veuillez vous connecter.')
    } catch {
      toast.error('Erreur lors de la création de compte')
    }
  }

  return { user, login, register }
})
