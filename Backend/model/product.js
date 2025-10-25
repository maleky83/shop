// ساخت مدل سبد خرید برای مشتریان

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productShema = new schema({
  userName: {
    type: String,
    require: true
  },
  productName: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  }
});

const product = mongoose.model('product', productShema);
module.exports = product ;
