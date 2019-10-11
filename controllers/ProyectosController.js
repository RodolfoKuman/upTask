exports.proyectosHome = (req, res) => {
	res.render('index', {
		nombrePagina : 'Proyectos'
	});
}

exports.formularioProyecto = (req, res) => {
	res.render('nuevoProyecto', {
		nombrePagina : 'Nuevo Proyecto'
	});
}

exports.nuevoProyecto = (req, res) => {
	//console.log(req.body);
	const { nombre } = req.body;

	let errores = [];

	if(!nombre){
		errores.push({'texto': 'Agrega un Nombre al Proyecto'})
	}

	if(!errores.lenght > 0){
		res.render('nuevoProyecto', {
			nombrePagina : 'Nuevo Proyecto',
			errores
		})
	}else{
		
	}

}
