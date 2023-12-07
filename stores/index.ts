import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  UserCredential,
  signOut,
  getIdToken
} from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { UserData } from '~/types/userData.interface'

export const useUserStore = defineStore(
  'user',
  () => {
    const { auth, db } = useFirebaseClient()

    const userAuthentication = ref<any>()
    const userData = reactive<UserData>({ credits: 0 })
    const loadingUserData = ref<boolean>(false)
    const error = ref<boolean>(false)
    const errorMessage = ref<string>('')

    function resetUserData() {
      userAuthentication.value = null
      userData.credits = 0
    }

    async function createUser(email: string, password: string) {
      loadingUserData.value = true
      error.value = false
      errorMessage.value = ''

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const token = await getIdToken(userCredential.user)
          verifyUserServerSide(token)
          saveUserInFirestore(userCredential.user.uid)
          loadingUserData.value = false
        })
        .catch((error) => {
          loadingUserData.value = false
          error.value = true
          if (error.code === 'auth/wrong-password') {
            errorMessage.value = 'wrong password'
          }
        })
    }

    async function saveUserInFirestore(userUid: string) {
      await setDoc(doc(db, 'users', userUid), {
        credits: 1
      })
    }

    async function logInUser(credentials: { emailAddress: string; password: string }) {
      loadingUserData.value = true
      error.value = false
      errorMessage.value = ''
      signInWithEmailAndPassword(auth, credentials.emailAddress, credentials.password)
        .then(async (userCredential) => {
          userAuthentication.value = userCredential.user
          const token = await getIdToken(userCredential.user)
          await verifyUserServerSide(token)
          loadingUserData.value = false
        })
        .catch((response) => {
          loadingUserData.value = false
          error.value = true
          switch (response.code) {
            case 'auth/wrong-password':
              errorMessage.value = 'wrong password'
              break
            case 'auth/user-not-found':
              errorMessage.value = 'No account exists with this email'
              break
          }
        })
    }

    async function verifyUserServerSide(token: string) {
      $fetch('/api/auth/set-token', {
        method: 'POST',
        body: { token: token }
      })
        .then(() => {
          signOut(auth).then(async () => {
            await navigateTo('/applications')
          })
        })
        .catch((e) => {
          return
        })
    }

    async function getUserData(uid: string) {
      loadingUserData.value = true
      $fetch(`/api/user/user-data?uid=${uid}`, {
        method: 'GET'
      })
        .then((response) => {
          userData.credits = response.credits
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          loadingUserData.value = false
        })
    }

    async function logOutUser() {
      await $fetch('/api/auth/logout', { method: 'POST' }).then(async () => {
        resetUserData()
        await navigateTo('/')
      })
    }

    async function SendResetPasswordEmail(emailAddress: string) {
      loadingUserData.value = true
      sendPasswordResetEmail(auth, emailAddress)
        .then(() => {
          loadingUserData.value = false
        })
        .catch((error) => {
          loadingUserData.value = false
          error.value = true
        })
    }

    return {
      userAuthentication,
      userData,
      loadingUserData,
      error,
      errorMessage,
      logInUser,
      logOutUser,
      createUser,
      getUserData,
      SendResetPasswordEmail
    }
  },
  {
    persist: true
  }
)
