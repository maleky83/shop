const product = require('../model/product');
const Product = require('../model/product');

// خرید و افزودن کالا به سبد خرید
const buyCart = async (req, res, next) => {
  const { name: productName, price } = req.body;
  const { name: userName } = req.userData;
  // اگر نام مشتری و نام کالا یکی بود به تعداد کالا یکی اضافه میکنه
  const existName = await Product.findOne({ productName, userName });
  if (existName) {
    return await Product.findByIdAndUpdate(existName.id, {
      quantity: existName.quantity + 1
    })
      .then(() => {
        return res.send();
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  }
  // بعد توی سبد ذخیره میکنه
  await new Product({ userName, productName, price, quantity: 1 })
    .save()
    .catch(err => {
      return res.status(400).send(err);
    });
};

// گرفتن همه محصولات مشتری برای سبد خرید
const GetCart = async (req, res) => {
  const { name } = req.userData;

  await product.deleteMany({ quantity: { $lte: 0 } });
  Product.find({ userName: name })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

// حذف محصول از سبد خرید توسط مشتری
const deleteCart = async (req, res) => {
  Product.findOneAndDelete(req.params.id)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const quantityCart = async (req, res) => {
  const find = await Product.findById(req.body.id);
  await Product.findByIdAndUpdate(req.body.id, {
    quantity: req.body.type == 'plus' ? find.quantity + 1 : find.quantity - 1
  })
    .then(() => {
      return res.send();
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(err);
    });
};

module.exports = { deleteCart, GetCart, buyCart, quantityCart };
