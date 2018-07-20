import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  site_name: String,
  site_template: String,
  site_desc: String,
  site_menus: [
    {
      menu_name: String,
      menu_url: String
    }
  ],
  site_pages: [
    {
      page_name: String,
      page_url: String,
      page_template: String,
      page_config: {}
    }
  ],
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})
SiteSchema
  .virtual('siteInfo')
  .get(function () {
    return {
      site_id: this._id,
      site_name: this.site_name,
      site_template: this.site_template,
      site_desc: this.site_desc,
    }
  })
const Site = mongoose.model('Site', SiteSchema)

module.exports = Site
