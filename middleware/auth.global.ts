export default defineNuxtRouteMiddleware((to) => {
  const user = useState<any>('user')
  if (!user.value) {
    const token = useCookie<any>('user_token')
    if (token.value) {
      user.value = token.value
    }
  }
  if (!user.value && to.path !== '/' && to.path !== '/register') {
    const flash = useState<any>('flash')
    flash.value = { message: 'Vous devez être connecté pour accéder à cette page', type: 'error' }
    return navigateTo('/')
  }
})
