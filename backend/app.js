var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentProfileRouter = require('./routes/student_profile');
var companyProfileRouter = require('./routes/company_profile');
var jobPostingRouter = require('./routes/job_posting');
var jobApplicationRouter = require('./routes/job_application');
var eventRouter = require('./routes/event');
var eventRegistrationRouter = require('./routes/event_registration');

var app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


require('dotenv').config();

// global var __basedir to get base directory
global.__basedir = __dirname;

//module.exports = webpackConfig;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student_profile', studentProfileRouter);
app.use('/company_profile', companyProfileRouter);
app.use('/job_postings', jobPostingRouter);
app.use('/job_application', jobApplicationRouter);
app.use('/events', eventRouter);
app.use('/event_registrations', eventRegistrationRouter);


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


//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// Execute App
app.listen(3001, () => {
  console.log('Handshake running on Port:',3001);
});
