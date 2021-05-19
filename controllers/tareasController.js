const Tarea = require("../models/Tareas.model");
const Proyecto = require("../models/Proyecto.model");
const { validationResult } = require("express-validator");

/* Crea un nueva tarea */
exports.creaTarea = async (req, res) => {
	/* revisar si hay errore */
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(401).json({ errores: errores.array() });
	}

	try {
		/* Extraer el proyecto y comprobar si existe */
		const { proyecto } = req.body;

		/* Validando la existencia del proyecto */
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			res.status(400).json({ msg: "Proyecto no encontrado" });
		}

		/* Revisar si el proyecto actual pertenece al usuario */
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		/* Creamos la tarea */
		const tarea = new Tarea(req.body);
		tarea.creado = Date.now();
		await tarea.save();
		res.status(201).json({ tarea });

		/* Errores */
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un error");
	}
};

/* Obtienes las tareas por proyecto */

exports.obtenerTareas = async (req, res) => {
	try {
		/* Extraer el proyecto y comprobar si existe */
		const { proyecto } = req.query;

		/* Validando la existencia del proyecto */
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			return res.status(400).json({ msg: "Proyecto no encontrado" });
		}

		/* Revisar si el proyecto actual pertenece al usuario */
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		/* obtener tareas por proyecto */
		const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });

		/* si no hay tareas asociadas */
		if (!tareas) {
			return res.status(400).json("msg: No hay tareas disponibles");
		}

		/* Si todo sale bien */
		return res.status(200).json({ tareas });
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un error");
	}
};

/* Actualizar las tareas de un proyecto. */
exports.actualizarTareas = async (req, res) => {
	try {
		/* Extraer el proyecto y comprobar si existe */
		const { proyecto, nombre, estado } = req.body;
		console.log(req.body);

		/* Revisar si la tarea existe o no */
		let tarea = await Tarea.findById(req.params.id);

		if (!tarea) {
			return res.status(400).json({ msg: "La tarea no existe." });
		}

		/* Validando la existencia del proyecto */
		const existeProyecto = await Proyecto.findById(proyecto);

		/* Revisar si el proyecto actual pertenece al usuario */
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		/* Crear un objeto con la nueva informacion */
		let nuevaTarea = {};

		nuevaTarea.nombre = nombre;

		nuevaTarea.estado = estado;

		/* Guardar la tarea*/
		tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, {
			new: true,
		});

		return res.status(200).json({ tarea });
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un error");
	}
};

/* Eliminar tareas */

exports.eliminarTarea = async (req, res) => {
	try {
		/* Extraer el proyecto y comprobar si existe */
		const { proyecto } = req.query;

		/* Revisar si la tarea existe o no */
		let tarea = await Tarea.findById(req.params.id);

		if (!tarea) {
			return res.status(400).json({ msg: "La tarea no existe." });
		}

		/* Validando la existencia del proyecto */
		const existeProyecto = await Proyecto.findById(proyecto);

		/* Revisar si el proyecto actual pertenece al usuario */
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		/* Eliminar */

		await Tarea.findOneAndRemove({ _id: req.params.id });
		res.status(200).json({ msg: "tarea eliminada" });
	} catch (error) {}
};
