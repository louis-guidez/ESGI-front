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
  const user = ref<(User & { token: string }) | null>(null)

  const getUsers = async () => (await apiFetch<User[]>('/utilisateurs'))._data

  const login = async ({ email, password }: Partial<User>) => {
    try {
      const response = await apiFetch<{ token: string; user: User }>('/login', {
        method: 'POST',
        body: { email, password },
      })

      if (!response.ok || !response._data) {
        throw response
      }

      const users = await getUsers()
      const {
        token,
        user: { id: userId },
      } = response._data

      if (!users) {
        throw new Error('No users found')
      }

      const foundUser = users.find(({ id }) => id === userId)
      if (!foundUser) {
        throw new Error(`No user found with id ${userId}`)
      }

      user.value = { ...foundUser, token }
      localStorage.setItem('user', JSON.stringify(user.value))

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

      if (!response.ok) {
        throw response
      }

      // TODO: update user in store and localstorage

      toast.success(t('userUpdated'))

      return response._data
    } catch (error) {
      toast.error(t('errorWhileUpdatingUser'))
      handleTokenValidity(error as { _data: { code?: number; message: string } })
    }
  }

  const handleTokenValidity = (error: { _data: { code?: number; message: string } }) => {
    const router = useRouter()

    const { code, message } = error._data

    if (code === 401) {
      if (message === 'Invalid JWT Token' || message === 'Expired JWT Token') {
        toast.error('Votre session a expiré, veuillez vous reconnecter.')
        router.push('/login')
      }
    }
  }

  return { user, login, register, updateUser, getUsers }
})
