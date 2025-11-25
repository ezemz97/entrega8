const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const catsRoutes = require('./routes/cats');
const catsProductsRoutes = require('./routes/cats_products');
const productsRoutes = require('./routes/products');
const productsCommentsRoutes = require('./routes/products_comments');
const cartRoutes = require('./routes/cart');
const userCartRoutes = require('./routes/user_cart');
const sellRoutes = require('./routes/sell');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas públicas
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

// Rutas API
app.use('/api/cats', catsRoutes);
app.use('/api/cats_products', catsProductsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/products_comments', productsCommentsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user_cart', userCartRoutes);
app.use('/api/sell', sellRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
});

module.exports = app;
