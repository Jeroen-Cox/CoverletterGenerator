import { authAdmin } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  try {
    const claim = await authAdmin.verifySessionCookie(cookies.Authorization)
    return {
      statusCode: 200,
      claim: claim
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
