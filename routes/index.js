const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

const proyectosController = require('../controllers/ProyectosController');
const tareasController = require("../controllers/TareasController");
const usuariosController = require("../controllers/UsuariosController");

module.exports = function(){
	router.get('/', (proyectosController.proyectosHome));
	router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

	router.post('/nuevo-proyecto',
				body('nombre').not().isEmpty().trim().escape(),
				proyectosController.nuevoProyecto);

	//Listar proyecto
	router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

	//Actualizar proyecto
	router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
	router.post('/nuevo-proyecto/:id',
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.actualizarProyecto);
	
	//Eliminar proyecto
	router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

	/** TAREAS **/
	router.post('/proyectos/:url', tareasController.agregarTarea);
	router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
	router.delete("/tareas/:id", tareasController.eliminarTarea);

	/** USUARIOS **/

	router.get("/crear-cuenta", usuariosController.formCrearCuenta);
	router.post("/crear-cuenta", usuariosController.crearCuenta);

	return router;
}