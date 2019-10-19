const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

const proyectosController = require('../controllers/ProyectosController');
const tareasController = require("../controllers/TareasController");

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

	return router;
}