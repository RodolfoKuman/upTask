const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const { check } = require("express-validator");
const flash = require('connect-flash');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require('./config/passport');

const helpers = require('./helpers');

//conexion a la base de datos
const db = require('./config/db');

require('./models/Proyectos');
require("./models/Tareas");
require("./models/Usuarios");

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// habilitar bodyParser para leer datos del formulario

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Agregamos express validator a toda la aplicación
app.use(check());

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//MIDDLEWARES
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
	next();
})

app.use('/', routes());

app.listen(3000);
