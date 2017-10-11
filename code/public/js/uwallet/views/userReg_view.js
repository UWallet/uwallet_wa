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
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
			model_errors = nuevo_usuario.save({}, {
		    error: function (model, respuesta, options) {
					//console.log(model); console.log(options);console.log(respuesta);
					if (respuesta.status == 201){
						self.mostrar_correcto_registro();
						$('#form_userreg')[0].reset();
					} else if(respuesta.status == 422) {
						self.mostrar_email_ya_existe();
					} else {
						alert("Respuesta desconocida");
						console.log(respuesta.status + " - " + respuesta.responseText);
					}
		    }
			});
		}
	},


	mostrar_correcto_registro: function(errores){
		mostrar_modal_generico('Creación de cuenta ', 'Gracias por registrarte en uwallet', 'Te hemos enviado un correo de verificación para terminar el proceso.', 'confirmacion.png'  );
	},

	mostrar_email_ya_existe: function(){
		mostrar_modal_generico('Creación de cuenta ', 'Tenemos problemas', 'Este email ya existe en nuestra base de datos, intenta con otro.', 'fallo.png'  );
	}

});

var userreg_view = new app.Userreg_view();
