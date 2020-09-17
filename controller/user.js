import jwt from 'jsonwebtoken'
import User from '../model/user'
import { ApiError } from '../error/apiError'

class UserController {
  async list (ctx) {
    const docs = await User.find({})

    ctx.body = {
      error: null,
      data: docs
    }
  }

  async read (ctx) {
    const currentUser = ctx.state.user
    const user = await User.findOne({ _id: currentUser._id })
    ctx.body = {
      error: null,
      data: user
    }
  }

  async register (ctx) {
    const params = ctx.request.body
    const { name } = params

    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) {
      throw new ApiError('userExists')
    }
    const result = await new User(params).save()
    ctx.body = {
      error: null,
      data: result
    }
  }

  async login (ctx) {
    const params = ctx.request.body
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })

    const user = await User.findOne(params)
    if (!user) {
      throw new ApiError('loginFaild')
    }
    const { _id, username } = user
    const token = jwt.sign({ _id, username }, 'testapi', { expiresIn: '1h' })
    ctx.body = {
      error: null,
      data: {
        token,
        user
      }
    }
  }

  async update (ctx) {
    const params = ctx.request.params
    const result = await userModel.updateOne({ _id: params._id }, { $set: params })
    console.log(result)
    ctx.body = result
  }
}

export default new UserController()
