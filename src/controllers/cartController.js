const db = require('../database/models');
const notifier = require('node-notifier');
const path = require('path');
const iconPath = path.join(__dirname, '../../public/images/invictusNotification.png');

module.exports = {
    addToCart: async (req, res) => {
        const { productId, quantity } = req.body;
        const product = await db.Product.findByPk(productId);
        
        if (!req.session.cart) {
            req.session.cart = [];
        }

        const cartItem = req.session.cart.find(item => item.product.id == productId);

        if (cartItem) {
            cartItem.quantity = 1;
        } else {
            req.session.cart.push({ product, quantity: parseInt(quantity) });
        }

        notifier.notify({
            title: 'InvictusHardStore',
            message: `Producto agregado al carrito`,
            icon: iconPath, 
            sound: true,
            appID: 'Notificacion',
            timeout: 1000,
        });

        res.redirect('/cart');
    },

    viewCart: (req, res) => {
        const cart = req.session.cart || [];
        const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        res.render('cliente/cart', {
            cart,
            total
        });
    },

    purchase: (req, res) => {
        req.session.cart = [];
        res.render('cliente/purchased', {
            cart: [],
            message: '¡Muchas gracias por su compra!'
        });
    },

    cleanCart: (req, res) => {
        req.session.cart = [];
        res.render('cliente/cart', {
            cart: [],
            message: 'Carrito vacío'
        });
    }
};