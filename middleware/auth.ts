import { useUserStore } from '@/stores/index'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const { userAuthentication } = storeToRefs(userStore)
  if (process.server && to.meta.layout === 'default') {
    const sessionCookie = useCookie('authCookie')

    $fetch('/api/auth/user', {
      method: 'POST',
      body: JSON.stringify({ sessionCookie: sessionCookie.value })
    }).then((response) => {
      if (response.statusCode === 200) {
        userAuthentication.value = response.claim
        return
      } else {
        console.log('hoi')
      }
    })
  }
})
