// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // Initialize Firebase
  const app = initializeApp(config.public.firebase)
  const auth = getAuth(app)
  const db = getFirestore(app)

  await setPersistence(auth, inMemoryPersistence)

  return {
    provide: {
      auth: auth,
      db: db
    }
  }
})
