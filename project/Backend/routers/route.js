// روت برای منظم شدن

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// تابع های محصولات
const {
  addProduct,
  getProduct,
  editeProduct,
  deleteProduct
} = require('../controllers/shop-controller');

// تابع های کاربرها
const {
  getProfile,
  sign,
  deleteUser,
  log,
  getUsers
} = require('../controllers/user-controller');

// تابع های سبد خرید
const {
  buyCart,
  GetCart,
  deleteCart
} = require('../controllers/product-controller');

// router.use(auth);

// آدرس های درخواست محصولات
router.post('/shop', addProduct);
router.get('/shop', getProduct);
router.delete('/shop/:id', deleteProduct);
router.patch('/shop/:id',editeProduct);
// آدرس های درخواست کاربر ها
router.post('/sign', sign);
router.post('/log', log);
router.get('/user', getUsers);
router.delete('/user/:id', deleteUser);
router.get('/user/profile', auth, getProfile);
// آدرس های درخواست سبد خرید
router.post('/product', auth, buyCart);
router.get('/product', auth, GetCart);
router.delete('/product/:id', deleteCart);

module.exports = router;
