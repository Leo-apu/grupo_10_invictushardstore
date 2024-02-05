const path = require('node:path');

const controller =  {
    renderModificarProducto: (req,res)  =>{
        res.render(path.join('products' , 'modificarProducto'))
    }
}

module.exports = controller;