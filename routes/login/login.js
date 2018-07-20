import Router from 'koa-router'
import { LoginControllers } from '../../api/login/index'
import { baseApi } from '../../config'

const router = new Router();

router.prefix(`/${baseApi}`)
router.post('/login', LoginControllers.login)
router.post('/register', LoginControllers.register)

export default router
