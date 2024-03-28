const express = require('express');
const axios = require('axios');
//const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
require('dotenv').config(); 
const Componente = require('./models/Componente');

const gameRouter = require('./routes/game');
const {dbConnection} = require('./db/db')

const app = express();

//MIDLEWARE PARA ASISTIR EN RESPUESTA Y/O PETICION EN JSON //
app.use(express.json());

//app.use(logger('dev'));

//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


  
dbConnection();

module.exports = app;
