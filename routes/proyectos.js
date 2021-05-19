const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
/* importamos el middleware auth */
const auth = require("../middleware/auth.middleware");

const {check} = require('express-validator');

/* Crear Proyectos */
/* /api/proyectos */
/* Primero validamos la sesion y posteriormente se va a ejecutar el servicio */


/* Crear Proyecto */
router.post("/", auth,[check('nombre', 'El nombre del proyecto es obligatorio').notEmpty()], proyectoController.crearProyecto);

/* Obtener Proyecto */
router.get("/", auth, proyectoController.obtenerProyectos);

/* Actualizar proyecto */
router.put("/:id", auth,[check('nombre', 'El nombre del proyecto es obligatorio').notEmpty()], proyectoController.actualizarProyecto);

/* Eliminar Proyecto */
router.delete("/:id", auth, proyectoController.eliminarProyecto);


module.exports = router;
