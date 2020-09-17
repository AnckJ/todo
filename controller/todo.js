import Todo from '../model/todo'
import { ApiError } from '../error/apiError'

class TodoController {
  async list (ctx) {
    let { size = 10, page, ...searchParams = {} } = ctx.request.body
    page = Number(page)
    size = Number(size)
    if (page) {
      const total = await Todo.countDocuments(searchParams)
      const maxPage = Math.ceil(total / size) || 1
      if (maxPage < page) {
        page = maxPage
      }
      const data = await Todo.find(searchParams).sort({ updated: -1 }).skip((page - 1) * size).limit(size)
      ctx.body = {
        error: null,
        data,
        page,
        total
      }
    } else {
      const data = await Todo.find(searchParams).sort({ updated: -1 }).limit(300)
      ctx.body = {
        error: null,
        data
      }
    }
  }

  async insert (ctx) {
    const params = ctx.request.body
    await new Todo(params).save()
    const data = await Todo.findOne(params)
    ctx.body = {
      error: null,
      data
    }
  }

  async update (ctx) {
    const params = ctx.request.body
    const { ids, _id, data } = params
    if (!ids && !_id) {
      throw new ApiError('missingId')
    }
    if (ids) {
      const orArray = ids.map(id => ({
        _id: id
      }))
      await Todo.updateMany({ $or: orArray }, { $set: data })
      ctx.body = {
        error: null,
        data: ids
      }
    } else {
      await Todo.findByIdAndUpdate(_id, { $set: params })
      ctx.body = {
        error: null,
        data: _id
      }
    }
  }

  async delete (ctx) {
    const params = ctx.request.body
    const { ids, id } = params
    if (!ids && !id) {
      throw new ApiError('missingId')
    }
    if (ids) {
      const orArray = ids.map(id => ({
        _id: id
      }))
      await Todo.deleteMany({ $or: orArray })
      ctx.body = {
        error: null,
        data: ids
      }
    } else {
      await Todo.remove({ _id: id })
      ctx.body = {
        error: null,
        data: id
      }
    }
  }
}

export default new TodoController()
