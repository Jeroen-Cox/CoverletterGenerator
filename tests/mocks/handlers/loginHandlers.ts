import { loginResponse } from '../responses/loginResponse'
import { rest } from 'msw'
// const config = useRuntimeConfig()
const baseUrl = `${process.env.baseUrl}/api`

export default [
  rest.get(`${baseUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(loginResponse))
  })
]
