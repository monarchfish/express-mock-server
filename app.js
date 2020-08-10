const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mock = require('./mock/mock-server.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

// -----device info
let useragent = require('express-useragent');
app.use(useragent.express());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.dir(req.headers);
    next();
});

mock(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.dir(err.message)
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;