import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { content, creationDate } = await readBody(event)
  const { uid, applicationUid } = await getQuery(event)
  const collectionRef = firestore.collection(`users/${uid}/applications/${applicationUid}/coverletters`)
  const coverletter = await collectionRef.add({ content: content, creationDate: creationDate })

  if (coverletter) {
    return {
      statusCode: 200,
      statusMessage: 'Coverletter created'
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Coverletter could not be created' })
  }
})
