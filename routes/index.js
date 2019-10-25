const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

const proyectosController = require('../controllers/ProyectosController');
const tareasController = require("../controllers/TareasController");
const usuariosController = require("../controllers/UsuariosController");
const authController = require('../controllers/AuthController');

module.exports = function(){

	router.get('/', 
		authController.usuarioAutenticado,
		proyectosController.proyectosHome
	);


	router.get("/nuevo-proyecto",
		authController.usuarioAutenticado,
		proyectosController.formularioProyecto
  );

	router.post('/nuevo-proyecto',
		authController.usuarioAutenticado,
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.nuevoProyecto
	);

	//Listar proyecto
	router.get("/proyectos/:url",
		authController.usuarioAutenticado,
		proyectosController.proyectoPorUrl
	);

	//Actualizar proyecto
	router.get( "/proyecto/editar/:id",
		authController.usuarioAutenticado,
		proyectosController.formularioEditar
	);


	router.post('/nuevo-proyecto/:id',
		authController.usuarioAutenticado,
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.actualizarProyecto
	);
	
	//Eliminar proyecto
	router.delete("/proyectos/:url",
		authController.usuarioAutenticado,
		proyectosController.eliminarProyecto
	);

	/** TAREAS **/
	router.post("/proyectos/:url",
		authController.usuarioAutenticado,
		tareasController.agregarTarea
	);

	router.patch( "/tareas/:id",
		authController.usuarioAutenticado,
		tareasController.cambiarEstadoTarea
	);

	router.delete("/tareas/:id",
		authController.usuarioAutenticado,
		tareasController.eliminarTarea
	);

	/** USUARIOS **/

	router.get("/crear-cuenta", usuariosController.formCrearCuenta);
	router.post("/crear-cuenta", usuariosController.crearCuenta);

	router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
	router.post("/iniciar-sesion", authController.autenticarUsuario);



	router.get('/cerrar-sesion', authController.cerrarSesion);

	return router;
}