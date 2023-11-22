import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  const allowedRoutes = ['/', '/account/create', '/account/reset']
  // skip middleware on server
  if (process.client) {
    const userStore = useUserStore()
    const { userAuthentication } = storeToRefs(userStore)

    if (!userAuthentication.value) {
      if (allowedRoutes.includes(to.path)) {
        return
      } else {
        // otherwise Redirect user to login page"
        return navigateTo('/')
      }
    } else {
      if (allowedRoutes.includes(to.path)) {
        return navigateTo('/applications/new')
      }
    }
  }
})
