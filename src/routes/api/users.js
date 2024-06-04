const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');

// Obtener todos los usuarios

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'first_name', 'email'] });
        const userData = users.map(user => ({
            id: user.id,
            name: user.first_name,
            email: user.email,
            detail: `/api/users/${user.id}`
        }));
        res.json({
            count: users.length,
            users: userData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener detalles de un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name', 'email', 'img']
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
