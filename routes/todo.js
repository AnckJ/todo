import Router from 'koa-router'
import todoController from '../controller/todo'
import auth from '../midleware/auth'

const router = new Router({ prefix: '/todo' })

router.post('/list', auth, todoController.list)

router.post('/insert', auth, todoController.insert)

router.put('/update', auth, todoController.update)

router.post('/update', auth, todoController.update)

router.delete('/delete', auth, todoController.delete)

export default router
