export default defineNuxtPlugin(() => {
  const user = useState<any>('user', () => null)
  const token = useCookie<any>('user_token', { default: () => null })
  if (!user.value && token.value) {
    user.value = token.value
  }
})
