var app = app || {};

app.Userreg_view = Backbone.View.extend({
	el: '#div_registrar_usuario',
	template: _.template($('#tpl_registrar_usuario').html()),

	events: {
		'submit #form_userreg': 'crear_usuario'
	},

	initialize: function() {
		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		this.$el.html(this.template());
	},

	crear_usuario: function(e){
		var self = this; // Self se usa para poder hacer llamados a otras funciones de la view
    e.preventDefault(); // Detiene la ejecución de redireccionamiento del formulario
		user = objectifyForm( $('#form_userreg').serializeArray());  // Convierte todos los datos del formulario en un objeto
		var nuevo_usuario = new app.Userreg_model({ user	}) // La variable  en este caso 'user' tiene que tener el mismo nombre que la primera pareja llave valor de postman
    is_error = nuevo_usuario.validate(nuevo_usuario.attributes);
		console.log(is_error);
		if (is_error) {
			self.mostrar_errores_en_el_modelo(is_error)
		} else {
				model_errors = nuevo_usuario.save({}, options);

				// Verificar que fue creado
				self.mostrar_correcto_registro();
			}
		},

	mostrar_errores_en_el_modelo: function(errores){
		lista_errores = "<ul>"
		for (var i = 0; i < errores.length; i++) {
			lista_errores += "<li><strong>" + errores[i]['name'] + ":</strong> "+ errores[i]['message'] + "</li>"
		}
		lista_errores += "</ul>"
		mostrar_modal_generico('Error en el formulario', 'No es posible enviar tu formulario debido a que:', lista_errores, 'fallo.png' )
	},

	mostrar_correcto_registro: function(errores){
		mostrar_modal_generico('Creación de cuenta ', 'Gracias por registrarte en uwallet', 'Te hemos enviado un correo de verificación para terminar el proceso.', 'confirmacion.png'  );
	}

});

var userreg_view = new app.Userreg_view();
