//ESQUEMA DE CREAR Y GUARDAR USUARIOS//

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
})

const User = mongoose.model('User', storeSchema)
module.exports = {User};
