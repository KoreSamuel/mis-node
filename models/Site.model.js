import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  site_name: String,
  site_template: String,
  site: String,
  site_desc: String,
  site_menus: [
    {
      menu_name: String,
      menu: String,
      menu_url: String,
    }
  ],
  site_pages: [
    {
      page_name: String,
      page_url: String,
      page: String,
      page_template: String,
      page_config: {
        url: String,
        fields: Object,
      }
    }
  ],
})
SiteSchema
  .virtual('siteInfo')
  .get(function () {
    return {
      site_id: this._id,
      site_name: this.site_name,
      site: this.site,
      site_template: this.site_template,
      site_desc: this.site_desc,
    }
  })
const Site = mongoose.model('Site', SiteSchema)

module.exports = Site
