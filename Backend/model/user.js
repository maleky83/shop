// ساخت مدل کاربر ها

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  typeUser: {
    type: String,
    require: true
  }
});

const user = mongoose.model('user', userSchema);
module.exports = user;
