import mongoose from 'mongoose'

const Site = mongoose.model('Site');

class SiteController {

  async getList(ctx) {
    try {
      const sites = await Site.find();
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          siteList: sites.map(k => k.siteInfo),
        },
      };
    } catch (error) {
      ctx.throw(500)
    }
  }

  async editSite(ctx) {
    const { body } = ctx.request;
    try {
      // const site = await Site.findById({ _id: body.id });
      Site.findByIdAndUpdate(body.id, body.values, (err, site) => {
        if (err) {
          throw err
        }
      });
      ctx.body = {
        code: 0,
        message: '修改成功',
        info: {}
      }
    } catch (err) {
      throw err
    }
  }

  async createSite(ctx) {
    const { body } = ctx.request;
    try {
      await Site.create(body, (err, docs) => {
        if (err) {
          throw (err)
        } else {
          console.log(docs)
        }
      });
      ctx.body = {
        code: 0,
        message: '项目新建成功',
        info: {},
      }
    } catch (err) {
      ctx.throw(500)
    }
  }

  async removeSite(ctx) {
    const { body } = ctx.request;
    try {
      await Site.remove({ _id: body.id });
      ctx.body = {
        code: 0,
        message: '删除成功',
        info: {}
      }
    } catch (err) {
      throw (err)
    }
  }

  async exportSite(ctx) {
    const { body } = ctx.request;
    try {
      const site = await Site.findById({ _id: body.id });
      ctx.body = {
        code: 0,
        message: '导出成功',
        info: {
          site
        }
      }
    } catch (err) {
      throw err
    }
  }
}

export default new SiteController();
