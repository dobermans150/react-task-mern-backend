const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareasController");
/* importamos el middleware auth */
const auth = require("../middleware/auth.middleware");

const { check } = require("express-validator");

//Crear una tarea
// api/tareas

router.post("/", auth, [
  check('nombre','El Nombre es obligatorio').not().isEmpty(),
  check('proyecto','El Nombre es obligatorio').not().isEmpty()
], tareasController.creaTarea);

//0btener tareas
router.get("/", auth, tareasController.obtenerTareas);

/* Actualiar las tareas */
router.put("/:id", auth,tareasController.actualizarTareas);

/* Eliminar tarea */
router.delete("/:id", auth,tareasController.eliminarTarea);





module.exports = router;
