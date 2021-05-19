const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	/* Leer el token del header */
	const token = req.header("x-auth-token");

	/* Revisar si no hay token */

	if (!token) {
		return res.status(401).json({ msg: "Permiso no valido, no hay token" });
	}

	/* Validar el token */
	try {
		/* verify lo que hace es vañidar la generacion del token que le entregamos si tiene un formato valido que no sotros le establecimos */
    const cifrado = await jwt.verify(token, process.env.SECRET);
    /* Una vez verificado colocamos en el request de la consulta el usuario ya identificado. */
		req.usuario = cifrado.usuario;
    next(); //Avanza al siguiente middleware
	} catch (error) {
    /* En caso de que el token no sea valido enviar un mensaje de respuesta */
		res.status(401).json({ msg: "token no valido" });
	}
};
