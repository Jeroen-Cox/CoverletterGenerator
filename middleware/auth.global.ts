import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  if (process.client) {
    const userStore = useUserStore()
    const { userAuthentication } = storeToRefs(userStore)

    if (!userAuthentication.value) {
      
      if (to.path === '/') {
        return
      }else{
        console.log("Redirect user to login page")
        return navigateTo("/")
      }
    } 
    
  }
})
