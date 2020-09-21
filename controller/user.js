import fs from 'fs'
import path from 'path'
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
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      email: { type: 'string', required: true }
    })

    const params = ctx.request.body
    const { username } = params

    const repeatedUser = await User.findOne({ username })
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
    const params = ctx.request.body
    const token = ctx.header.authorization.replace('Bearer ', '')
    const user = jwt.verify(token, 'testapi')
    const data = await User.findOne({ _id: user._id })

    Object.keys(params).forEach(key => {
      const value = params[key]
      if (key === 'password' && value) {
        data.password = value
      } else {
        data[key] = value
      }
    })
    data.updated = new Date()
    await User.updateOne({ _id: user._id }, { $set: data })
    ctx.body = {
      error: null,
      data
    }
  }

  uploadAvatar (ctx) {
    const params = ctx.request.files
    const file = params.file
    const reader = fs.createReadStream(file.path)
    const filePath = `${path.join(__dirname, '../public/avatar/')}/${file.name}`
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream)
    ctx.body = {
      error: null,
      data: `http://${ctx.request.header.host}/avatar/${file.name}`
    }
  }
}

export default new UserController()
