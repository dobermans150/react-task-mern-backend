
/* Importamos el modulo de mongoose */
const mongoose = require('mongoose');
/* Importamos uestra variable de entorno con dotenv */
require('dotenv').config({ path: 'variables.env'});

/* Porque usar una variable de entoro?. orque asi lo hace mas sencillo la conexion a distintas urel, esto es immpportante y ademas es una muy buena practica para el mismo. */

/* Conectamos nuestra a nuestra base de datos con mongoose, a continuacion se presenta una configuracion especial para hacer la coneccion mas limpia */


/* Para conectarnos a nuestar BD hacemos una consulta asincrona de la misma, puesto que mngoose.conect en realidad es una funcion de consulta a la base de datos de mongodb */
const conectarDB = async()=>{

    try {
        
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('DB conectada');
        


    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app 
        
    }

}

module.exports = conectarDB;