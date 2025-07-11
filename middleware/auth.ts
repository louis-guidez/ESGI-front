/**
 * use this middleware to check if the user is logged in
 *
 * e.g
 *
 *  definePageMeta({
 *   middleware: ['auth',],
 *  });
 *
 */

export default defineNuxtRouteMiddleware(() => {
  const { user } = extractStore(useUserStore())

  if (!user) {
    return navigateTo('/login')
  }
})
