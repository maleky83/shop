const jwt = require('jsonwebtoken');
require('dotenv').config();
function auth(req, res, next) {
  const token = req.header('access-token');
  // گرفتن مجوز با توکن به عنوان میدلور برای کارهای خاص
  if (!token) {
    return res.status(401).send('وارد حساب کاربری خود شوید');
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decode;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
}

module.exports = { auth };
