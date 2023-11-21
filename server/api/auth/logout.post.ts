export default defineEventHandler(async (event) => {
  setCookie(event, 'authCookie', 'null', { httpOnly: true, path: '/' })
  return {}
})
