const mongoose = require('mongoose');

//Crear esquema de componente//
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  nombre: { 
    type: String, 
    required: true 
    },
  precio: {
      type: Number,
      required: true
    },
    generos: [{
        type: String,
        enum: ['Accion', 'Aventura', 'Estrategia', 'Simulacion']
    }],
    plataforma: [{
        type: String,
        enum: ['Windows', 'Mac', 'Linux']
      }],
})

const Componente = mongoose.model('Componente', storeSchema)
module.exports = {Componente};
