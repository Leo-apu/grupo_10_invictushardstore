const path = require('node:path');

const controller =  {
    renderProductDetail: (req,res)  =>{
        // res.render('/products/productDetail');
        res.render(path.join('products', 'productDetail'));
    }
}

module.exports = controller;