import { computed } from "vue"
export function useAuth() {
  const user = useState<any>('user', () => null)
  const loggedIn = computed(() => !!user.value)

  function logout() {
    user.value = null
    const token = useCookie<any>('user_token')
    token.value = null
    navigateTo('/')
  }

  return { user, loggedIn, logout }
}

