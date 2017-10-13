var app = app || {};

app.Userreg_view = Backbone.View.extend({
	el: '#div_registrar_usuario',
	template: '\
		<div class="row">\
			<div class="col-md-12">\
				<form role="form" id="form_userreg">\
					<div class="row">\
						<div class="col-md-8">\
							<div class="form-group">\
								<label for="input_email"> Email </label>\
								<input class="form-control" name="email" id="input_email" type="email" placeholder="Email" required value="jonatan@gmail.com" />\
							</div>\
						</div>\
						<div class="col-md-4"></div>\
					</div>\
					<div class="row">\
						<div class="col-md-6">\
							<div class="form-group">\
								<label for="input_nombre"> Nombres </label>\
								<input class="form-control" name="firstName" id="input_nombre" type="text" placeholder="Nombre" required value="jonatan"/>\
							</div>\
						</div>\
						<div class="col-md-6">\
							<div class="form-group">\
								<label for="input"> Apellidos </label>\
								<input class="form-control" name="lastName" id="input_apellido" type="text" placeholder="Apellido" required value="parra"/>\
							</div>\
						</div>\
					</div>\
					<div class="row">\
						<div class="col-md-6">\
							<div class="form-group">\
								<label for="input_password">	Contraseña </label>\
								<input class="form-control" name="password" id="input_password" type="password" placeholder="Contraseña" required value="foobar" />\
							</div>\
						</div>\
						<div class="col-md-6">\
							<div class="form-group">\
								<label for="input_confirmation">	Confirmar contraseña </label>\
								<input class="form-control" name="password_confirmation" id="input_confirmation" type="password" placeholder="Confirmación de contraseña" required value="foobar"/>\
							</div>\
						</div>\
						</div>\
						<input type="submit" class="btn btn-default" value="Registrar" form="form_userreg" />\
						</form>\
					</div>\
					<div class="col-md-4">\
					</div>\
				</div>\
	',



	events: {
		'submit #form_userreg': 'crear_usuario'
	},

	initialize: function() {
		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		this.$el.html(this.template);
	},

	crear_usuario: function(e){

		var onDataHandler = function(collection, response, options) {
		  if (options.xhr.status == 201){
				self.mostrar_correcto_registro();
				$('#form_userreg')[0].reset();
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};

		var onErrorHandler = function(collection, response, options) {
			if(response.status == 422) {
				self.mostrar_email_ya_existe();
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};



		var self = this; // Self se usa para poder hacer llamados a otras funciones de la view
    e.preventDefault(); // Detiene la ejecución de redireccionamiento del formulario
		user = objectifyForm( $('#form_userreg').serializeArray());  // Convierte todos los datos del formulario en un objeto
		var nuevo_usuario = new app.Userreg_model({ user	}) // La variable  en este caso 'user' tiene que tener el mismo nombre que la primera pareja llave valor de postman
    is_error = nuevo_usuario.validate(nuevo_usuario.attributes);
		if (is_error) {
			mostrar_errores_modelo(is_error);
		} else {
			model_errors = nuevo_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler });
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
