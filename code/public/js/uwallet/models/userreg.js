var app = app || {};

Userreg = Backbone.Model.extend({
  urlRoot: '192.168.99.101:4000/users/',


	initialize: function() {
		console.log('Se ha creado una nueva instancia del Modelo Libro.');

		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	},
});
/*
console.log( userreg.toJSON() );

actualizaNombre: function(){
  var nuevoNombre = prompt( ’Introduce el nuevo nombre para el contacto: ’ );
  this.set( {firstName: nuevoNombre} );
}
firstName	string
lastName	string
money	number
email	string
password	string
confirm_password	string
*/
/*
app.Libro = Backbone.Model.extend({
	urlRoot: 'libros/',
	defaults: {
		autor: 'Desconocido'
	},

	initialize: function() {
		console.log('Se ha creado una nueva instancia del Modelo Libro.');

		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	},

	validate: function(atributos) {
		if(!atributos.titulo) {
			return 'Debe tener un titulo.';
		}
	}

});
