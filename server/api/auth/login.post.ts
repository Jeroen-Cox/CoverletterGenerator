import { authAdmin } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)
  const expiresIn = 60 * 60 * 24 * 5

  try {
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: '/'
    }

    const authCookie = await authAdmin.createSessionCookie(token, { expiresIn })
    setCookie(event, 'authCookie', authCookie, options)

    return {
      statusCode: 200,
      message: 'Auth successful'
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
