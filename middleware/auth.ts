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

import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware(({ meta, fullPath }) => {
  const { $i18n } = useNuxtApp()
  const { user } = extractStore(useUserStore())

  const abort = (meta.props as { abortNavigation?: boolean })?.abortNavigation

  if (!user.value) {
    toast.error($i18n.t('notLoggedIn'))

    if (abort) {
      return abortNavigation()
    }

    return navigateTo(`/login?redirect=${fullPath}`)
  }
})
