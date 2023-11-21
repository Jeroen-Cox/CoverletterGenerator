import { Coverletter } from '../../../types/coverLetter.interface'
import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const params = await getQuery(event)
  const query = firestore.collection(`users/${params.uid}/applications/${params['application-uid']}/coverletters`)
  const querySnapshot = await query.orderBy('creationDate', 'desc').get()
  if (querySnapshot) {
    let coverletters: Coverletter[] = []
    querySnapshot.forEach((doc) => {
      let coverletter: Coverletter = {
        uid: doc.id,
        creationDate: doc.data().creationDate,
        content: doc.data().content
      }
      coverletters.push(coverletter)
    })

    return {
      statusCode: 200,
      coverletters: JSON.stringify(coverletters)
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Coverletters not found' })
  }
})
