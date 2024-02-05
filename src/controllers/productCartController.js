const path = require('node:path');

const controller =  {
    renderProductCart: (req,res)  =>{
        res.render('productCart')
    }
}

module.exports = controller;