const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3300;

app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(express.static(path.resolve(__dirname, "../public")));

const viewPath = ['views', 'views/products', 'views/users'];
const createPathViews = (paths) => {
  return paths.map((p) => path.join(__dirname, p));
}

app.set('view engine', 'ejs');
app.set('views', createPathViews(viewPath));

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const userRouter = require('./routes/users'); 

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);


app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
