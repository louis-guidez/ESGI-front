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
  const user = useCookie<(User & { token: string }) | null>('user', {
    default: () => null,
  })

  const settings = useCookie('settings', {
    default: () => ({}),
  })

  const getUsers = async () => await apiFetch<User[]>('/utilisateurs')

  const login = async ({ email, password }: Partial<User>) => {
    try {
      const {
        token,
        user: { id: userId },
      } = await apiFetch<{ token: string; user: User }>('/login', {
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

      user.value = { ...foundUser, token }

      toast.success('Connexion reussie !')
      return foundUser
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
      return true
    } catch {
      toast.error('Erreur lors de la création de compte')
    }
  }

  const updateUser = async (userId: number, data: Partial<User>) => {
    const {
      $i18n: { t },
    } = useNuxtApp()
    if (!user.value?.token) {
      throw new Error('No token available')
    }

    try {
      const response = await apiFetch(`http://localhost:8000/api/secure/utilisateurs/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.value.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ignoreResponseError: true,
      })

      // TODO: update user in store and localstorage

      toast.success(t('userUpdated'))
      return response
    } catch {
      toast.error(t('errorWhileUpdatingUser'))
    }
  }

  const logout = () => {
    const router = useRouter()
    const { currentRoute } = router

    if ([currentRoute.value.meta.middleware].flat().includes('auth')) router.push('/')

    user.value = null
    localStorage.removeItem('user')
  }

  return { user, settings, login, logout, register, getUsers, updateUser }
})
