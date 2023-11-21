import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { credits } = await readBody(event)
  const { uid } = await getQuery(event)

  const docRef = firestore.doc(`users/${uid}`)
  const update = await docRef.update({ credits: credits })

  if (update) {
    return {
      statusCode: 200,
      statusMessage: `Updated credits for user: ${uid}`
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Credits could not be updated' })
  }
})
