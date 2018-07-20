import Router from 'koa-router'
import login from './api/login'
import users from './api/users'
import sites from './api/sites'
import pages from './api/pages'
import menus from './api/menus'
import { baseApi } from './config/index'

const router = new Router()


router.prefix(`/${baseApi}`)
export default function (app) {
  router.use('', login.routes(), login.allowedMethods())
  router.use('/users', users.routes(), users.allowedMethods())
  router.use('/sites', sites.routes(), sites.allowedMethods())
  router.use('/pages', pages.routes(), pages.allowedMethods())
  router.use('/menus', menus.routes(), menus.allowedMethods())
  app.use(router.routes())
}