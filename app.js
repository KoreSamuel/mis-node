// import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body';
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import helmet from 'koa-helmet'
import cors from 'koa2-cors'
import jwt from 'koa-jwt'
import routing from './routes'
import { port, connexionString, secret } from './config/index'
import errorHandle from './middlewars/errorHandle'

mongoose.connect(connexionString, { useNewUrlParser: true })
mongoose.Promise = global.Promise

// create Koa application
const app = new Koa();

// apply middlewares
app
  .use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))
  .use(errorHandle)
  .use(jwt({
    secret,
  }).unless({
    path: [/\/register/, /\/login/],
  }))
  .use(logger())
  .use(koaBody({ multipart: true }))
  .use(helmet())

routing(app)

// Start application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app