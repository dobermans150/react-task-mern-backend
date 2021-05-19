/* Rutas para crear usuarios */
/* Aca vamos a crear cada una de nuestras rutas, es importante definir esto de esta manera, puesto que vamos a invocar la logica y construit la secuencia poco a poco */

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
/* importamos check de express-validator para valdar ciertos aspectos desde el router */
const {check} = require('express-validator');


/* Crear un uusairo */
/* /api/usuarios */

router.post('/',

/* Agregamos nuestras caracteristicas dentro de router */
  [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'Agregar un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
  ]

,usuarioController.crearUsuario);

module.exports = router;