const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Product = require('../model/product');

// برای پست کردن ثبت نام کاربر
const sign = async (req, res) => {
  try {
    // اطلاعات از کاربر میگیری
    const { name, password, email, typeUser } = req.body;

    // چک میکنی تکراری نباشه
    const existName = await User.findOne({ name });
    if (existName) return res.status(400).send('نام کاربری تکراری است');

    // چک میکنی بیشتر از یکی ادمین نباشه
    if (typeUser === 'admin') {
      const existAdmin = await User.findOne({ typeUser: 'admin' });
      if (existAdmin)
        return res.status(400).send('بیشتر از یک ادمین نمی‌توان ساخت');
    }

    // رمز رو برای امنیت هش میکنی
    const hash = await bcrypt.hash(password, 10);

    // میفرستی توی دیتابیس
    const user = await new User({
      name,
      password: hash,
      email,
      typeUser
    }).save();

    // توکن برای کاربر های مختلف درست میکنیم
    const token = jwt.sign(
      { id: user._id, name: user.name, typeUser: user.typeUser },
      process.env.JWT_SECRET
    );

    // برای پاسخ توکن رو میفرستیم تا فرانت بشناسه و با نوع کاربر
    res.send({ token, typeUser: user.typeUser });
  } catch (err) {
    res.status(500).send('خطای سرور');
  }
};

// برای گرفتن همه کاربر ها
const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// حذف کردن کاربر
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    await Product.deleteMany({ userName: user.name });
    await User.findByIdAndDelete(req.params.id);
    res.send('کاربر حذف شد');
  } catch (err) {
    res.status(500).send(err);
  }
};

// برای ورود کاربر
const log = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    // اگه کاربر وجود نداشت
    if (!user) return res.status(400).send('کاربر وجود ندارد');
    // اگر رمز اشتباه بود
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('رمز اشتباه است');
    // توکن رو میسازه
    const token = jwt.sign(
      { id: user._id, name: user.name, typeUser: user.typeUser },
      process.env.JWT_SECRET
    );

    // میفرسته به عنوان پاسخ به فرانت
    res.send({ token, typeUser: user.typeUser });
  } catch (err) {
    res.status(500).send('خطای سرور');
  }
};

// گرفتن پروفایل کاربر
const getProfile = async (req, res) => {
  try {
    const { id } = req.userData; // از middleware گرفتی
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getUsers, sign, deleteUser, log, getProfile };
