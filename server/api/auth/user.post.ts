import { UserData } from '../../../types/userData.interface'
import { authAdmin } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { sessionCookie } = await readBody(event)
  try {
    const claim = await authAdmin.verifySessionCookie(sessionCookie)
    return {
      statusCode: 200,
      claim: claim
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
