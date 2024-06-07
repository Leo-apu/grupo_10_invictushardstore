const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const notifier = require('node-notifier');

const iconPath = path.join(__dirname, '../../public/images/invictusNotification.png');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        const user = req.session.userLogged;
        res.render('index', { user: user, products: products.results });
    },
    search: (req, res) => {},

    register: async function (req, res) {
        try {
            res.render('registro');
        } catch (error) {
            console.log("Error", error);
        }
    },

    processRegister: async function (req, res) {
        const resultValidation = validationResult(req);
        try {
            const existingUser = await db.User.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                return res.render('registro', {
                    errors: { email: { msg: 'El correo electrónico ya está registrado' } },
                    oldData: req.body
                });
            }

            if (resultValidation.errors.length > 0) {
                return res.render('registro', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            const newUser = await db.User.create({
                ...req.body,
                img: req.file.filename,
                password: bcryptjs.hashSync(req.body.password, 10),
            });

            // Mostrar notificación de éxito
            notifier.notify({
				title: 'InvictusHardStore',
				message: `Usuario creado exitosamente`,
				icon: iconPath, // Usar el icono personalizado
				sound: true, // Opcional, reproduce un sonido con la notificación
            });

            return res.redirect('/users/login');
        } catch (error) {
            console.log("Error:", error);
        }
    },

    login: (req, res) => {
        res.render('login');
    },

    loginProcess: async (req, res) => {
        try {
            let userToLogin = await db.User.findOne({ where: { email: req.body.email } });

            if (userToLogin) {
                let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if (correctPassword) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;

                    if (req.body.remember) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 });
                    }

                    return res.redirect('/users/profile');
                }

                return res.render('login', {
                    errors: {
                        password: {
                            msg: 'La contraseña es incorrecta'
                        }
                    }
                });
            }

            return res.render('login', {
                errors: {
                    email: {
                        msg: 'No se encontró un usuario con este email'
                    }
                }
            });
        } catch (error) {
            console.log("Error:", error);
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Hubo un error al procesar el inicio de sesión'
                    }
                }
            });
        }
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    profile: async (req, res) => {
        try {
            const userId = req.session.userLogged.id;
            const user = await db.User.findByPk(userId);

            if (user) {
                return res.render('profile', { user: user });
            } else {
                return res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).send('Error interno del servidor');
        }
    },

    editProfile: async function(req, res) {
        try {
            const user = await db.User.findByPk(req.params.id);
            return res.render('profileEdit', { user });
        } catch (error) {
            console.log("Error:", error);
        }
    },

    updateProfile: async function(req, res) {
        try {
            if (req.file) {
                await db.User.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    img: req.file.filename
                }, {
                    where: { id: req.params.id }
                });
            } else {
                await db.User.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email
                }, {
                    where: { id: req.params.id }
                });
            }

            const updatedUser = await db.User.findByPk(req.params.id);
            return res.render('profile', { user: updatedUser });
        } catch (error) {
            console.log("Error:", error);
        }
    }
};

module.exports = controller;
