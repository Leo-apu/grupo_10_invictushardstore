const path = require('node:path');

const controller =  {
    renderRegistro: (req,res)  =>{
        // res.render('/Users/registro');
        res.render(path.join('Users', 'registro'));
    }
}

module.exports = controller;