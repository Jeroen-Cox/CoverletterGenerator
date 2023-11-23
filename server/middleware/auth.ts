export default defineEventHandler((event) => {
  const allowedRoutes = ['/', '/account/create', '/account/reset']
  const cookies = parseCookies(event)
  if (cookies.Authorization === null) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized request, please log in'
    })
  }
})
