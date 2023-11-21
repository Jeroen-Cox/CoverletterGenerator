import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { applicationData } = await readBody(event)
  const { uid, applicationUid } = await getQuery(event)

  const docRef = await firestore.doc(`users/${uid}/applications/${applicationUid}`)
  try {
    await docRef.update({
      achievement_1: applicationData.achievement_1,
      achievement_2: applicationData.achievement_2,
      achievement_3: applicationData.achievement_3,
      company: applicationData.company,
      jobTitle: applicationData.jobTitle,
      jobUrl: applicationData.jobUrl,
      linkedinUrl: applicationData.linkedinUrl,
      creationDate: new Date()
    })

    return {
      statusCode: 200,
      statusMessage: 'Application updated'
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'User not found' })
  }
})
