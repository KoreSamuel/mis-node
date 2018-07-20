import Router from 'koa-router'
import MenuController from './menu.controller'

const router = new Router();

router.get('/list', MenuController.getMenus)
router.post('/mod', MenuController.modMenu)

export default router
