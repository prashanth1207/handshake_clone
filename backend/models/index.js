'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const db = {};
require('dotenv').config()

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0,
};
mongoose.connect(process.env.MONGO_DB_URL, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    require(path.join(__dirname, file))
  });
