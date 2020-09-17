import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import error from 'koa-json-error'
import parameter from 'koa-parameter'
import koaStatic from 'koa-static'
import routes from './routes'

const app = new Koa()
const router = new Router()

app.use(cors())

app.use(parameter(app))

app.use(error({
  preFormat: (err) => {
    return Object.assign(err, {status: 200})
  },
  postFormat: (err, { stack, ...rest }) => {
    let type = rest.type
    let value = rest.value
    if (!type) {
      if (rest.message === 'Validation Failed') {
        type = 'invalidParam'
        value = '参数错误'
      } else {
        type = rest.name
        value = rest.message
      }
    }
    return {
      error: {
        type,
        value
      },
      data: null,
      stack: process.env.NODE_ENV === 'production' ? undefined : stack
    }
  }
}))

app.use(bodyParser())

Object.keys(routes).forEach(key => {
  router.use('/api', routes[key].routes())
})

app.use(koaStatic('./html'))

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
