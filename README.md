# Proyecto de practica con nodejs(express) y MongoDB

## Dependencias

1. Express.
2. Mongoose.
3. dotenv.
4. express-validator.
5. bcryptjs.
6. JWT (Jso Web Token).


## ¿Que hace cada uno?

### Es simple y sencillo.
1. **Express** nos ayuda con la creacion de rutas y midlewares, para hacer nuestra api rest de forma muy sencilla y rapida, sin tener que hacerlo puramente con nodejs.

2. **Mongoose** nos ayuda hacer la coneccion con la BD de mongoDB y ademas hacer distintas consultas de manera rapida y sencilla, no requiere de arduo trabajo o hacerlo de forma manual.

3. **dotenv** nos ayuda a leer nuestra variables de entorno dentro de nuestros archivos con extensiones .env.

4. **express-validator** hace distintas validaciones en la ruta de nuestro objeto y muestra los errores en nuestro controlador.

5. **bcryptjs**. Hace encriptaciones a lo que queramos, con hash y salt y el codigo de encriptacion que queramos.

6. **JWT (Jso Web Token)**. Genera, crea, valida y elimina sesiones de los usuarios a travez de un token unico.

## ¿Que son y Por que usar las variables de entorno?

Las varaibles de entornos, son eso, variables de tipo global sin ninguna expresion de sintaxis de algun lenguaje en particular, estas se usan principalmente para almacenar direccion url de base de datos o de otros API rest o algun servidor de almacenamiento en la nube, como Firebase, entre otros... 

El porque utilizarlo es muy sencillo, es una buena practica utilizarlo, puesto que al momento de hacer un deploy de la aplicacion backend, se formatea todo el codigo para que este preparado para el hosting en produccion, de tal modo que alguans direcciones se formatean para que se ejecute en el localhost del servidor en linea.

## Middlewares, ¿Que son?

Los middlewares son minicontroladores o mejor dicho funciones que se van a ejecutar siempre a la mitad de una consulta, es recomendables cuando se va a usar varias veces un micro servicio con otros servicios mas grades, en vez de copiar toda la logica en el servicio grande, es recomendable establecer un middleware antes de ejecutar el servicio grande. Ejemplo: si queremos crear dentro de un sistema un registro, lo ideal es verificar el usuario, para ello creamos un middleware de verificacion de sesion y posteriormente ejecutamos el servicio de creacion si todo sale bien en el paso anterior.

----------
## mas informacion

[Express](https://expressjs.com/es/)
[Mongoose](https://mongoosejs.com/docs/guide.html)
[MongoDB](https://www.mongodb.com/es)
[dotenv](https://www.npmjs.com/package/dotenv)
[Express-validator](https://www.npmjs.com/package/express-validator)
[Json Webt Token](https://www.npmjs.com/package/jsonwebtoken)
[bcryptjs](https://www.npmjs.com/package/bcryptjs)