const db = require('../database/models');

module.exports = {
    addToCart: async (req, res) => {
        const { productId, quantity } = req.body;
        const product = await db.Product.findByPk(productId);
        
        if (!req.session.cart) {
            req.session.cart = [];
        }

        const cartItem = req.session.cart.find(item => item.product.id == productId);

        if (cartItem) {
            cartItem.quantity += parseInt(quantity);
        } else {
            req.session.cart.push({ product, quantity: parseInt(quantity) });
        }

        res.redirect('/cart');
    },

    viewCart: (req, res) => {
        res.render('cliente/cart', {
            cart: req.session.cart || []
        });
    },

    purchase: (req, res) => {
        req.session.cart = [];
        res.render('cliente/cart', {
            cart: [],
            message: '¡Muchas gracias por su compra!'
        });
    }
};