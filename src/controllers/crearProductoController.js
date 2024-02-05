const path = require('node:path');

const controller =  {
    renderCrearProducto: (req,res)  =>{
        res.render(path.join('products' , 'crearProducto'))
    }
}

module.exports = controller;