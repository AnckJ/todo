import jwt from 'jsonwebtoken'
import { ApiError } from '../error/apiError'

export default async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  try {
    const token = authorization.replace('Bearer ', '')
    const user = jwt.verify(token, 'testapi')
    ctx.state.user = user
  } catch (error) {
    console.log(error)
    throw new ApiError('invalidToken')
  }

  await next()
}

