export default defineNuxtRouteMiddleware((to) => {
  const user = useState<any>('user')
  if (!user.value && to.path !== '/' && to.path !== '/register') {
    return navigateTo('/')
  }
})
