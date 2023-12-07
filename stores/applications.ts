import { addDoc, collection, getDocs, orderBy, query, updateDoc, doc, DocumentReference } from 'firebase/firestore'
import { ApplicationInfo } from '~/types/applicationInfo.interface'
import { Coverletter } from '~/types/coverLetter.interface'

export const useApplicationsStore = defineStore('applications', () => {
  const { db } = useFirebaseClient()

  const userStore = useUserStore()

  const coverLetters = ref<Coverletter[]>([])
  const loadingApplications = ref<boolean>(false)
  const loadingCoverletters = ref<boolean>(false)
  const generatingCoverletter = ref<boolean>(false)
  const creatingNewApplication = ref<boolean>(true)
  const selectedApplicationUid = ref('')

  function resetApplicationForm() {
    creatingNewApplication.value = true
    coverLetters.value = []
    selectedApplicationUid.value = ''
  }

  async function generateCoverLetter(formData: ApplicationInfo) {
    if (userStore.userData.credits > 0) {
      generatingCoverletter.value = true
      if (formData.jobUrl) {
        try {
          const response = await $fetch('/api/scrape/job-url', {
            method: 'POST',
            body: { jobUrl: formData.jobUrl }
          })

          if (response) {
            const applicationData = formData
            applicationData.jobTitle = response.job.jobTitle
            applicationData.company = response.job.company
            const data = await $fetch<string>('/api/chat-completion', {
              method: 'POST',
              body: { applicationData: applicationData }
            })
            if (data) {
              addCoverLetterFirebase(data).then(async () => {
                updateUserCreditsFirebase().then(async () => {
                  await getCoverLetters()
                  await userStore.getUserData(userStore.userAuthentication.uid)
                })
              })
            }
          }
        } catch (e) {
          console.log('something went wrong')
        }
      }

      generatingCoverletter.value = false
    }
  }
  async function updateUserCreditsFirebase() {
    userStore.loadingUserData = true
    const credits = userStore.userData.credits - 1
    if (userStore.userAuthentication) {
      $fetch(`/api/user/update-credits?uid=${userStore.userAuthentication.uid}`, {
        method: 'PUT',
        body: { credits: credits }
      })
        .catch((e) => {
          throw createError({ statusCode: 401, statusMessage: 'Could not update credits' })
        })
        .finally(() => {
          userStore.loadingUserData = false
        })
    }
  }
  async function addApplicationFirebase(applicationData: ApplicationInfo): Promise<string> {
    if (userStore.userAuthentication) {
      return $fetch(`/api/store/application?uid=${userStore.userAuthentication.uid}`, {
        method: 'POST',
        body: { applicationData: applicationData }
      })
        .then((response) => {
          return response.documentId
        })
        .catch((e) => {
          throw createError({ statusCode: 401, statusMessage: 'Could not update credits' })
        })
        .finally(() => {
          userStore.loadingUserData = false
        })
    } else {
      throw createError({ statusCode: 401, statusMessage: 'Could not update credits' })
    }
  }

  async function updateApplicationFirebase(applicationData: ApplicationInfo) {
    if (userStore.userAuthentication) {
      return $fetch(
        `/api/store/updateApplication?uid=${userStore.userAuthentication.uid}&applicationUid=${selectedApplicationUid.value}`,
        {
          method: 'POST',
          body: { applicationData: applicationData }
        }
      )
        .then((response) => {
          return
        })
        .catch((e) => {
          throw createError({ statusCode: 401, statusMessage: 'Could not update application' })
        })
    } else {
      throw createError({ statusCode: 401, statusMessage: 'User not authorized' })
    }
  }

  async function addCoverLetterFirebase(content: string) {
    if (userStore.userAuthentication) {
      $fetch(
        `/api/store/coverletter?uid=${userStore.userAuthentication.uid}&applicationUid=${selectedApplicationUid.value}`,
        {
          method: 'POST',
          body: { content: content, creationDate: new Date() }
        }
      )
    }
  }

  async function getCoverLetters() {
    loadingCoverletters.value = true
    if (userStore.userAuthentication) {
      $fetch(
        `/api/store/coverletters?uid=${userStore.userAuthentication.uid}&application-uid=${selectedApplicationUid.value}`,
        {
          method: 'GET'
        }
      )
        .then((res) => {
          coverLetters.value = JSON.parse(res.coverletters)
        })
        .catch((e) => {
          throw createError({ statusCode: 401, statusMessage: 'Could not fetch coverletters' })
        })
        .finally(() => {
          loadingCoverletters.value = false
        })
    }
    loadingCoverletters.value = false
  }

  const applications = ref<ApplicationInfo[]>([])
  const applicationData = computed((): ApplicationInfo => {
    const data = applications.value.find((application) => application.uid === selectedApplicationUid.value)
    if (data) {
      return data
    } else {
      return {
        uid: '',
        creationDate: undefined,
        company: '',
        jobTitle: '',
        achievement_1: '',
        achievement_2: '',
        achievement_3: '',
        jobUrl: '',
        linkedinUrl: ''
      }
    }
  })

  async function getApplications() {
    loadingApplications.value = true

    if (userStore.userAuthentication) {
      $fetch(`/api/store/applications?uid=${userStore.userAuthentication.uid}`, {
        method: 'GET'
      })
        .then((res) => {
          applications.value = JSON.parse(res.applications)
        })
        .catch((e) => {
          throw createError({ statusCode: 401, statusMessage: 'Could not fetch applications' })
        })
        .finally(() => {
          loadingApplications.value = false
        })
    } else {
      throw createError({ statusCode: 401, statusMessage: 'User not authorized' })
    }
    loadingApplications.value = false
  }

  return {
    applications,
    applicationData,
    loadingApplications,
    generatingCoverletter,
    coverLetters,
    selectedApplicationUid,
    creatingNewApplication,
    addApplicationFirebase,
    updateApplicationFirebase,
    resetApplicationForm,
    generateCoverLetter,
    getApplications,
    getCoverLetters
  }
})
