import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    const { uid } = await getQuery(event)
    const documentRef = firestore.doc(`users/${uid}`)
    const snapshot = await documentRef.get()
    const credits: number = await snapshot.get('credits')
    return {
      statusCode: 200,
      credits: credits
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
