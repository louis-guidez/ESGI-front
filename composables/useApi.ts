export function apiFetch<T>(path: string, options?: Parameters<typeof $fetch<T>>[1]) {
  const baseURL = useRuntimeConfig().public.API_BASE_URL
  return $fetch.raw<T>(path, { ...options, baseURL, ignoreResponseError: true })
}
