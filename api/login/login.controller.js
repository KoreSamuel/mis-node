import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import UserModel from '../../models/User.model'
import SiteModel from '../../models/Site.model'
import { secret } from '../../config/index';


const User = mongoose.model('User');

class LoginController {

  async login(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.findOne({ username: body.username });
      if (!user) {
        ctx.status = 200
        ctx.body = {
          code: 401,
          message: '用户名不存在',
          info: {}
        }
        return;
      }
      // 匹配密码是否相等
      if (await bcrypt.compare(body.password, user.password)) {
        ctx.status = 200
        ctx.body = {
          code: 0,
          message: '登录成功',
          info: {
            user: user.userInfo,
            // 生成 token 返回给客户端
            token: jsonwebtoken.sign({
              data: user,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365), // 60 seconds * 60 minutes = 1 hour
            }, secret),
          },
        }
      } else {
        ctx.status = 200
        ctx.body = {
          code: 401,
          message: '密码错误',
          info: {},
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  async register(ctx) {
    const { body } = ctx.request;
    try {
      if (!body.username || !body.password) {
        ctx.status = 400;
        ctx.body = {
          error: `expected an object with username, password but got: ${body}`,
        }
        return;
      }
      body.password = await bcrypt.hash(body.password, 5)
      let user = await User.find({ username: body.username });
      if (!user.length) {
        const newUser = new User(body);
        user = await newUser.save();
        ctx.status = 200;
        ctx.body = {
          message: '注册成功',
          user,
        }
      } else {
        ctx.status = 406;
        ctx.body = {
          message: '用户名已经存在',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

}

export default new LoginController();
