import { FetchError } from 'ofetch'
import { toast } from 'vue-sonner'

const handleTokenValidity = ({ code, message }: { code?: number; message?: string }) => {
  const {
    $i18n: { t },
  } = useNuxtApp()
  const router = useRouter()
  const { user } = extractStore(useUserStore())

  if (code === 401) {
    if (message === 'Invalid JWT Token' || message === 'Expired JWT Token') {
      if (user.value) {
        user.value = null
      }

      toast.error(t('expiredSession'))
      router.push('/login')
    }
  }
}

export async function apiFetch<T>(path: string, options?: Parameters<typeof $fetch<T>>[1]) {
  const baseURL = useRuntimeConfig().public.API_BASE_URL

  try {
    const data = await $fetch<T>(path, { ...options, baseURL })
    return data
  } catch (error) {
    if (!(error instanceof FetchError)) throw error

    if (error.status === 401) handleTokenValidity(error.data)

    throw error
  }
}
