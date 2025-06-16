export const baseURL = 'http://localhost:8000/api'

export function apiFetch<T>(path: string, options?: Parameters<typeof $fetch<T>>[1]) {
  return $fetch<T>(`${baseURL}${path}`, options)
}
