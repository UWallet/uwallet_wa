var app = app || {};

app.UserLogin_view = Backbone.View.extend({
	el: '#div_registrar_usuario',
	template:  _.template($('#tpl_login_register').html()),

	events: {
		'submit #form_userreg': 'crear_usuario',
		'submit #form_userlogin': 'loguear_usuario'
	},

	initialize: function() {
		console.log("Entro en userReg_view");
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
	},

	loguear_usuario: function(e){

		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				token = JSON.parse(options.xhr.responseText).auth_token;
  			self.loguear(token);
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
	};

		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			console.log("Entro en error handle");
			if(response.status == 401) {
				$('#form_userlogin input[name=password]').val("");
				self.mostrar_error_login();
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};

		var self = this;
    e.preventDefault();
		user = objectifyForm( $('#form_userlogin').serializeArray());  // Convierte todos los datos del formulario en un objeto
		var login_usuario = new app.Userlogin_model(user);
    is_error = login_usuario.validate(login_usuario.attributes);
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
				login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
		}
	},

	mostrar_error_login: function(errores){
		mostrar_modal_generico('Login ', 'No fue posible iniciar sesión', 'El usuario y la contraseña no coinciden.', 'fallo.png'  );
	},
	loguear: function(token){
		console.log("Entro en loguear");
		sessionStorage.setItem('token', token);
		$("#div_login").hide();
		$("#div_registrar_usuario").hide();
		$('#form_userlogin')[0].reset();

		menuNavegacion_view.render();
		var menuInicio_view = new app.MenuInicio_view();
		notificaciones_view = new app.Notificaciones_view();
		console.log(sessionStorage.getItem("token"));
	},

	verificar_token: function(){
		console.log("Entro en verificar token");
	}

});

//var userreg_view = new app.Userreg_view();

var userLogin_view = new app.UserLogin_view();
var notificaciones_view;
