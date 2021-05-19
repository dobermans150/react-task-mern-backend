// rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require('../middleware/auth.middleware');
const { check } = require("express-validator");

/* Iniciar Sesion */
/* /api/auth */

router.post(
	"/",

	/* Agregamos nuestras caracteristicas dentro de router */
	[
		check("email", "Agregar un email valido").isEmail(),
		check("password", "El password debe ser minimo de 6 caracteres").isLength({min: 6})
	],

	authController.autenticarUsuario
);

// obtiene el usuario autenticado
router.get('/',
	auth,
	authController.usuarioAutenticado
);

module.exports = router;
