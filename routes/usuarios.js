/* Rutas para crear usuarios */
/* Aca vamos a crear cada una de nuestras rutas, es importante definir esto de esta manera, puesto que vamos a invocar la logica y construit la secuencia poco a poco */

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


/* Crear un uusairo */
/* /api/usuarios */

router.post('/',usuarioController.crearUsuario);

module.exports = router;