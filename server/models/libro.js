const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingresa el nombre del libro']
    },
    autor: {
        type: String,
        required: [true, 'Ingrese el nombre del autor']
    },
    genero: {
        type: String,
        required: [true, 'Ingrese el genero del libro']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        //required: [true, 'Por favor ingresa la imagen del libro']
    }
});

libroSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);