// ساخت مدل محصولات برای نمایش و حذف و اضافه محصولات

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const blogSchema = new schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  about: {
    type: String,
    require: true
  },
  img: {
    type: String,
    require: true
  }
});

const shop = mongoose.model('blog', blogSchema);
module.exports = shop;
