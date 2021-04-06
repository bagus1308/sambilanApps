var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var penRouter     = require('./routes/userPen');
var profileRouter = require('./routes/profile');
var CateRouter    = require('./routes/category');
var ItemRouter    = require('./routes/item');

var app = express();

//dotenv controller
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

//DB controller
const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)

var mongodb = require('mongoose')

mongodb.connect(
  DB,
  {useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify:true}).then(connection =>{
    console.log("Koneksi Berhasil")
})

//Multer middleware
var multer = require('multer')
const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'public/images')
  },
  filename: (req,file,cb) =>{
    cb(null,Date.now()+ '_'+ file.originalname)
  }
})

const fileFilter  = (req,file,cb)=>{

  // console.log("file: " + file)
  if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg'){
    cb(null,true)
  }else {
    cb(null,false)
  }
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use multer
app.use(multer({
  storage:fileStorage,
  fileFilter:fileFilter
}).array('photo',5))

//navigasi
app.use('/'         , indexRouter);
app.use('/users'    , usersRouter);
app.use('/pen'      , penRouter);
app.use('/profile'  , profileRouter);
app.use('/category' , CateRouter);
app.use('/item'     , ItemRouter);

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
