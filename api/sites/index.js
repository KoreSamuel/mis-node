import Router from 'koa-router'
import SiteController from './site.controller'

const router = new Router();

router.get('/list', SiteController.getList)
router.post('/create', SiteController.createSite)
router.post('/remove', SiteController.removeSite)
router.post('/export', SiteController.exportSite)
router.post('/edit', SiteController.editSite)
export default router
