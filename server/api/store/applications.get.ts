import { ApplicationInfo } from '../../../types/applicationInfo.interface'
import { firestore } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { uid } = await getQuery(event)
  const query = firestore.collection(`users/${uid}/applications`)

  const querySnapshot = await query.orderBy('creationDate', 'desc').get()
  if (querySnapshot) {
    let documents: ApplicationInfo[] = []
    querySnapshot.forEach((doc) => {
      let application: ApplicationInfo = {
        uid: doc.id,
        creationDate: doc.data().creationDate,
        company: doc.data().company,
        jobTitle: doc.data().jobTitle,
        achievement_1: doc.data().achievement_1,
        achievement_2: doc.data().achievement_2,
        achievement_3: doc.data().achievement_3,
        jobUrl: doc.data().jobUrl,
        linkedinUrl: doc.data().linkedinUrl
      }
      documents.push(application)
    })

    return {
      statusCode: 200,
      applications: JSON.stringify(documents)
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'User not found' })
  }
})
