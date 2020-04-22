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
    img: {
        type: String
    }
});

usuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);