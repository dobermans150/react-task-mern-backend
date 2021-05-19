/* Importamos el modulo de mongoose */
const mongoose = require("mongoose");
/* Importamos nuestra variable de entorno con dotenv */
/* importamos nuestras variables de entorno a process */
require("dotenv").config({ path: "variables.env" });

/* Porque usar una variable de entoro?. orque asi lo hace mas sencillo la conexion a distintas urel, esto es immpportante y ademas es una muy buena practica para el mismo. */

/* Conectamos nuestra a nuestra base de datos con mongoose, a continuacion se presenta una configuracion especial para hacer la conexion mas limpia */

/* Para conectarnos a nuestar BD hacemos una consulta asincrona de la misma, puesto que mongoose.connect en realidad es una funcion de consulta a la base de datos de mongodb */
const conectarDB = async () => {
	try {
		/* solucion de problemas en mongoose */
		mongoose.set("useNewUrlParser", true);
		mongoose.set("useFindAndModify", false);
		mongoose.set("useCreateIndex", true);

		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log("DB conectada");
	} catch (error) {
		console.log(error);
		process.exit(1); // Detener la app
	}
};

module.exports = conectarDB;
