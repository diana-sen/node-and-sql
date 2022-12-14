var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const package = require('./package.json')

require('dotenv').config()
//console.log(process.env) // To confirm dotenv is working

var app = express();

app.use(logger('dev')); // Shows time of petition
//app.use(logger());  //more info
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
// app.use('/health', (req, res, nex) => res.send({ status:"OK"}));
app.use('/health', (req, res, nex) => {
  let healthInfo = {
    status: "OK",
    name: package.name,
    version: package.version,
  };

  if (req.query.environment === "true") {
    healthInfo = { ...healthInfo, environment: process.env.ENVIRONMENT };
  }
  res.send(healthInfo);
});

app.use('/api/v1/', indexRouter);
app.use('*', (req, res, nex) => res.send({ message:"Not found"})); //defined at the end
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
