const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routers/route');
dotenv.config();
// اتصال به دیتابیس
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    app.listen(process.env.portServer, () => {
      console.log(process.env.portServer);
    });
  })
  .catch(err => {
    console.log('error' + err);
  });

app.use(cors());
app.use(express.json());

app.use('/', router);
