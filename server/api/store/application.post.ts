import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { applicationData } = await readBody(event)
  const { uid } = await getQuery(event)

  const collectionRef = firestore.collection(`users/${uid}/applications`)
  const docRef = await collectionRef.add({
    achievement_1: applicationData.achievement_1,
    achievement_2: applicationData.achievement_2,
    achievement_3: applicationData.achievement_3,
    company: applicationData.company,
    jobTitle: applicationData.jobTitle,
    jobUrl: applicationData.jobUrl,
    linkedinUrl: applicationData.linkedinUrl,
    creationDate: new Date()
  })

  if (docRef) {
    const id: string = docRef.id
    return {
      statusCode: 200,
      statusMessage: 'Coverletter created',
      documentId: id
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Application could not be created' })
  }
})
