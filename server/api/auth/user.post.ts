
import { authAdmin } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const  {sessionCookieString} = await readBody(event)
  try {
    const claim = await authAdmin.verifySessionCookie(sessionCookieString)
    return {
      statusCode: 200,
      claim: claim
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
