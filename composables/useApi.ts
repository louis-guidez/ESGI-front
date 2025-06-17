export const baseURL = useRuntimeConfig().public.API_BASE_URL

export function apiFetch<T>(path: string, options?: Parameters<typeof $fetch<T>>[1]) {
  return $fetch<T>(`${baseURL}${path}`, options)
}
