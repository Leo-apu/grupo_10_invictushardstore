const { compareSync } = require('bcryptjs');
const { login, logout } = require('../controllers/userController');
const user = require('../models/User');

function userMenu(req, res, next) {
    res.locals.isLoged = false;

    let emailCookie = req.cookies.userEmail;
    let userFromCookie = user.findByField('email', emailCookie);

    if (userFromCookie) {
        req.session.userLog = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLoged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userMenu