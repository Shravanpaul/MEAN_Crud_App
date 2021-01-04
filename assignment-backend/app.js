var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./core/mongo')();
var api = require('./routes/api');
const fileUpload = require('express-fileupload');
const cors = require('cors');
var app = express();


app.use(session({
  secret: '123456',
  //duration: (1*30*1000),
  saveUninitialized: true,
  resave: false,
  // cookie: {
  //   maxAge : 1*60*1000
  // }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/admin", express.static(path.join(__dirname, 'admin')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/admin/index.html`));
})
app.use(cors());
app.use(fileUpload());
app.use('/api', api);

// app.get('/', async(req, res)=>{
//   res.send('Welcome To Squadupp');
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
