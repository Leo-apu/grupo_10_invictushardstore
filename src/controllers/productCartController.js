const path = require('node:path');

const controller =  {
    renderProductCart: (req,res)  =>{
        // res.render('/products/productCart');
        res.render(path.join('products', 'productCart'));
    }
}

module.exports = controller;