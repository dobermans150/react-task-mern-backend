/* Desde aca vamos a crear nuestra logica de forma mas ordenada, es recomendable hacerlo por cada entidad con tranquilidad. */
const Usuario = require("../models/Usuarios.model");
/* importamos bcryptjs para hacer encriptar la password */
const bcryptjs = require("bcryptjs");
//importamos los resultados de las importaciones de express validator.
const { validationResult } = require("express-validator");
/* importamos jwt para los tokens */
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
	/* Revisar si hay errores */
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(401).json({ errores: errores.array() });
	}

	//extraer email y password
	const { email, password } = req.body;

	try {
		//Revisar que el usuario registrado sea unico
		let usuario = await Usuario.findOne({ email });

		if (usuario) return res.status(400).json({ msg: "el usuario ya existe" });

		/* crea nuevo usuario */
		usuario = new Usuario(req.body);

		/* Hashear el password */
		const salt = await bcryptjs.genSalt(10);
		usuario.password = await bcryptjs.hash(password, salt);

		// guardar usuario
		await usuario.save();

		//crear y firmar el JWT
		const payload = {
			usuario: {
				id: usuario.id,
			},
		};

		/* firmar jwt */
		jwt.sign(
			payload,
			process.env.SECRET,
			{
				algorithm: 'HS384' ,
				expiresIn: 3600 // 1hora
			},
			(error, token) => {
				if (error) throw error;

				//Mensaje de confirmacion
				res.status(201).json({ token });
			}
		);
	} catch (error) {
		console.log(error);
		res.status(400).send("Hubo un error");
	}
};
