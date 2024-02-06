const path = require('node:path');

const controller =  {
    renderLogin: (req,res)  =>{
        res.render(path.join('Users', 'login'));
    }
}

module.exports = controller;