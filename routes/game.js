const express = require('express');
const router = express.Router();

const gameController = require('../controller/game.controller');


//Poseer 4 rutas para conformar un CRUD.

router.get('/', gameController.obtenerJuegos);

router.post('/', gameController.crearJuegos);

router.put('/', gameController.actualizarJuegos);

router.delete('/:id', gameController.eliminarJuegos);


//Ruta que conecte a un API externa

router.get('/:id', gameController.obtenerJuegosExternos);

module.exports = router; 