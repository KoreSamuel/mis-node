import mongoose from 'mongoose'

const Site = mongoose.model('Site');

class MenuController {


  async getMenus(ctx) {
    const { query } = ctx.request;
    try {
      const site = await Site.findById({ _id: query.id });
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          list: site.site_menus,
        },
      };
    } catch (err) {
      ctx.throw(500)
    }
  }

  async modMenu(ctx) {
    const { body } = ctx.request;
    try {
      Site.findByIdAndUpdate({ _id: body.id }, { $set: { site_menus: body.item } }, (err, docs) => {
        console.log(err || docs)
      });
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          // result: JSON.stringify(rst),
        },
      };
    } catch (err) {
      ctx.throw(500);
    }
  }
}

export default new MenuController();
