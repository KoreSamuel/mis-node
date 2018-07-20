import Router from 'koa-router'
import PageController from './page.controller'

const router = new Router();

router.get('/list', PageController.getPages)
router.post('/create', PageController.createPage)
router.post('/remove', PageController.removePage)
router.post('/edit', PageController.editPage)
router.get('/detail', PageController.getPageDetail)
router.post('/saveDetail', PageController.savePageDetail)

export default router