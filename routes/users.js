//RUTAS QUE CONFORMAN EL CRUD//

const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const controllers = require('../controller/controller');
const {check, validationResult} = require('express-validator');

/* GET: Obtener una lista de usuarios. */
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

/* POST: Crear un nuevo usuario. */
router.post('/users', [
    check('username').isLength({ min: 3, max: 255 }).withMessage('Username debe tener entre 3 y 255 caracteres'),
    check('password').isLength({ min: 8, max: 1024 }).withMessage('Password debe tener entre 8 y 1024 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    await newUser.save();
    res.json(newUser);
});

/* PUT: Actualizar un usuario existente. */
router.put('/users/:id', [
    check('username').isLength({ min: 3, max: 255 }).withMessage('Username debe tener entre 3 y 255 caracteres'),
    check('password').isLength({ min: 8, max: 1024 }).withMessage('Password debe tener entre 8 y 1024 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        username,
        password: hashedPassword
    }, { new: true });

    await updatedUser.save();
    res.json(updatedUser);
});

/* DELETE: Eliminar un usuario existente. */
router.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
});

/* GET: Obtener datos de la API EXTERNA. */
router.get('/external', async (req, res) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    res.json(response.data);
});

module.exports = router;
