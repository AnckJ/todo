import Router from 'koa-router'
import userController from '../controller/user'
import auth from '../midleware/auth'

const router = new Router()

router.get('/user/read', auth, userController.read)

router.get('/user/list', auth, userController.list)

router.put('/user/update', auth, userController.update)

router.post('/register', userController.register)

router.post('/login', userController.login)

export default router
