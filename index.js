const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const helpers = require('./helpers');

//conexion a la base de datos
const db = require('./config/db');

require('./models/Proyectos');
require("./models/Tareas");

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

//MIDDLEWARES
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	next();
})

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes());

app.listen(3000);
