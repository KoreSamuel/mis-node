import mongoose from 'mongoose'

const Site = mongoose.model('Site');

class PageController {

  async getPages(ctx) {
    const { query } = ctx.request;
    try {
      const site = await Site.findById({ _id: query.id });
      const list = site.site_pages.map(k => {
        return {
          page_id: k._id,
          page_name: k.page_name,
          page: k.page,
          page_url: k.page_url,
          page_template: k.page_template,
        }
      });
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          list,
        },
      };
    } catch (err) {
      ctx.throw(500)
    }
  }

  async createPage(ctx) {
    const { body } = ctx.request;
    try {
      const site = await Site.findById({ _id: body.id });
      site.site_pages = [...site.site_pages, body.values];
      site.markModified('site_pages');
      site.save((err) => {
        if (err) {
          console.log(err)
        }
      })
      const list = site.site_pages.map(k => {
        return {
          page_id: k._id,
          page_name: k.page_name,
          page_url: k.page_url,
          page: k.page,
          page_template: k.page_template,
        }
      });
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          list,
        },
      };
    } catch (err) {

    }
  }

  async removePage(ctx) {
    const { body } = ctx.request;
    try {
      const site = await Site.findById({ _id: body.id });
      site.site_pages = site.site_pages.filter(k => {
        return k._id + '' !== body.page_id
      })
      site.markModified('site_pages');
      site.save((err) => {
        if (err) {
          console.log(err)
        }
      })
      const list = site.site_pages.map(k => {
        return {
          page_id: k._id,
          page_name: k.page_name,
          page_url: k.page_url,
          page: k.page,
          page_template: k.page_template,
        }
      });
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          list,
        },
      };
    } catch (err) {

    }
  }

  async editPage(ctx) {
    const { body } = ctx.request;
    try {
      const site = await Site.findById({ _id: body.id });
      site.site_pages = site.site_pages.map(k => {
        return k._id + '' === body.page_id ? body.values : k
      })
      site.markModified('site_pages');
      site.save((err) => {
        if (err) {
          console.log(err)
        }
      })
      const list = site.site_pages.map(k => {
        return {
          page_id: k._id,
          page_name: k.page_name,
          page_url: k.page_url,
          page: k.page,
          page_template: k.page_template,
        }
      });
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          list,
        },
      };
    } catch (err) {

    }
  }

  async getPageDetail(ctx) {
    const { query } = ctx.request;
    try {
      const pages = await Site.findById({ _id: query.id })
      const page = pages.site_pages.filter(k => {
        return k._id + '' === query.page_id
      })[0];
      ctx.body = {
        code: 0,
        message: 'success',
        info: page,
      }
    } catch (err) {
      throw (err)
    }
  }

  async savePageDetail(ctx) {
    const { body } = ctx.request;
    try {
      const site = await Site.findById({ _id: body.id });
      site.site_pages = site.site_pages.map(k => {
        if (k._id + '' === body.page_id) {
          k.page_config = {
            url: body.values.url,
            fields: {
              searchFields: body.values.searchFields,
              showFields: body.values.showFields
            }
          }
        }
        return k;
      })
      site.markModified('site_pages');
      site.save((err) => {
        if (err) {
          console.log(err)
        }
      })
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          data: site.site_pages
        }
      }
    } catch (err) {
      throw (err)
    }
  }
}

export default new PageController();
