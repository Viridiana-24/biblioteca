const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Ingrese el nombre del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Ingrese el email del usuario']
    },
    password: {
        type: String,
        required: [true, 'Ingrese la contraseña del usuario']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);