const Shop = require('../model/shop');

// اضافه کردن محصول توسط ادمین
const addProduct = async (req, res, next) => {
  const { name, price, about, img } = req.body;

  const shop = new Shop({
    name: name,
    price: price,
    about: about,
    img: img
  });

  shop
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

// گرفتن محصولات موجود
const getProduct = async (req, res, next) => {
  Shop.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

// حذف محصول توسط ادمین
const deleteProduct = async (req, res, next) => {
  Shop.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.send();
    })
    .catch(err => {
      console.log(err);
      return res.status(401).send(err);
    });
};

// ویرایش محصول توسط ادمین
const editeProduct = async (req, res) => {
  const edite = await Shop.findOne(req.body);
  const product = await Shop.findOne({ _id: req.params.id });
  const findName = await Shop.findOne({ name: req?.body?.name });

  if (!req.body) {
    return res.status(400).send('لطفا چیزی را تغییر بدهید بعد کلیک کنید');
  }

  if (product?.name != edite?.name) {
    if (findName & (findName?._id != product?._id)) {
      return res
        .status(400)
        .send('این اسم وجود دارد لطفا اسم دیگری انتخاب کنید');
    }

    await Shop.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.send();
      })
      .catch(err => {
        res.status(400).send(err + 'error');
      });
  }
};

module.exports = { addProduct, getProduct, deleteProduct, editeProduct };
