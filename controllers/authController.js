const Usuario = require("../models/Usuarios.model");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
	/* Revisar si hay errores */
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(401).json({ errores: errores.array() });
	}

	//extraer el email y password
	const { email, password } = req.body;

	try {
		//Revisar que sea un usuario registrado
		let usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}

		/* Revisar el password */
		const passCorrecto = await bcryptjs.compare(password, usuario.password);

		if (!passCorrecto) {
			return res.status(401).json({ msg: "Contraseña incorrecta" });
		}

		/* si todo es correcto crear y firmar el JWT */
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
				algorithm: 'HS384', //tipo de hasheo
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
	}
};

//Obtiene un usuario autenticado
exports.usuarioAutenticado = async (req,res) =>{
	const {id} = req.usuario
	try {
		const usuario = await Usuario.findById(id).select('-password');
		res.status(200).json({usuario});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({msg:'Hubo un error'});
		
	}

}