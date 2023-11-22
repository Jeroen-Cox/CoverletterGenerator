export default defineEventHandler(async (event) => {
  setCookie(event, 'Authorization', 'null', { httpOnly: true, path: '/' })
  return {}
})
