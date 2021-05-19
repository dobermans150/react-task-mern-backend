const Proyecto = require("../models/Proyecto.model");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
	/* revisar si hay errore */
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(401).json({ errores: errores.array() });
	}
	try {
		/* Crear un nuevo proyecto */
		const proyecto = new Proyecto(req.body);

		/* Guardar el creador via JWT */
		proyecto.creador = req.usuario.id;

		/* Agregando la fecha de creacion */
		proyecto.creado = Date.now();

		/* Guardamos el proyecto */
		proyecto.save();
		res.status(201).json(proyecto);
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un error");
	}
};

/* Obtener todos los proyectos del usuario */
exports.obtenerProyectos = async (req, res) => {
	try {
		/* Obteniendo lor poryectos de un usuarios desde la BD */
		const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
			creado: -1,
		});
		res.status(200).json({ proyectos });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

/* Actualizar un proyecto */

exports.actualizarProyecto = async (req, res) => {
	/* revisar si hay errore */
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(401).json({ errores: errores.array() });
	}

	/* Extrayendo la informaicon del proyecto */
	const { nombre } = req.body;
	let nuevoProyecto = {};

	if (nombre) {
		nuevoProyecto.nombre = nombre;
	}

	try {
		/* revisar el ID */
		let proyecto = await Proyecto.findById(req.params.id);

		/* Si el proyecto existe o no */
		if (!proyecto) {
			return res.status(404).json({ msg: "proyecto no encontrado" });
		}

		/* verificar el creador del proyecto */
		if (proyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado" });
		}
		/* actualizar */
		proyecto = await Proyecto.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: nuevoProyecto },
			{ new: true }
		);

		res.status(200).json(proyecto);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Hubo un error");
	}
};

/* Eliminar un proyecto por su id */

exports.eliminarProyecto = async (req, res) => {
	try {
		/* revisar el ID */
		let proyecto = await Proyecto.findById(req.params.id);

		/* Si el proyecto existe o no */
		if (!proyecto) {
			return res.status(404).json({ msg: "proyecto no encontrado" });
		}

		/* verificar el creador del proyecto */
		if (proyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "No autorizado" });
    }
    
    /* Eliminando el royecto */
    proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id});
    res.status(200).json({msg: 'Proyecto Eliminado'});


	} catch (error) {
		console.log(error);
		return res.status(500).send("Hubo un error");
	}
};
