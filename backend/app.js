var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//const Dotenv = require('dotenv-webpack');
const webpackConfig = {
  node: { global: true, fs: 'empty' }, // Fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
  output: {
    libraryTarget: 'umd' // Fix: "Uncaught ReferenceError: exports is not defined".
  },
//  plugins: [new Dotenv()]
};

// global var __basedir to get base directory
global.__basedir = __dirname;

module.exports = webpackConfig;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Execute App
app.listen(3001, () => {
  console.log('Handshake running on Port:',3001);
});
