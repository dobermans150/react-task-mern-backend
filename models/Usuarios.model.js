/* De este modo se realiza los modelos en mongoose, es una estructura muy buena y valida */
/* Para mas info, se recomienda revisar el doc de mongoose  */
const mongoose = require('mongoose');

const UsuarioSchema= mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    registro:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);