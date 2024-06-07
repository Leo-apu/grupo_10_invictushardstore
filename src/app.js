const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const session = require('express-session');
const userMenu = require('./middlewares/userMenu');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3300;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: "Frase secreta",
  resave: false,
  saveUninitialized: false,
}));
app.use(userMenu);
app.use(express.static(path.resolve(__dirname, "../public")));

// View engine setup
const viewPath = ['views', 'views/products', 'views/users'];
const createPathViews = (paths) => {
  return paths.map((p) => path.join(__dirname, p));
}
app.set('view engine', 'ejs');
app.set('views', createPathViews(viewPath));

// Routes
const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const userRouter = require('./routes/users');
const productsApiRouter = require('./routes/api/productsRouter');
const usersApiRouter = require('./routes/api/users');
const cartRouter = require('./routes/cart');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);
app.use('/api/products', productsApiRouter);
app.use('/api/users', usersApiRouter);
app.use('/cart', cartRouter);

// Error handling
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

module.exports = app;
