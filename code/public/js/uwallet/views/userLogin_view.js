var app = app || {};

app.UserLogin_view = Backbone.View.extend({
	el: '#div_registrar_usuario',
	template:  _.template($('#tpl_login_register').html()),

	events: {
		'submit #form_userreg': 'crear_usuario',
		'submit #form_userlogin': 'loguear_usuario'
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
				self.mostrar_error_422_registro(response.responseText);
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
			mostrar_errores_modelo_2(is_error, "#form_userreg_error");
		} else {
			model_errors = nuevo_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler });
		}
	},

	loguear_usuario: function(e){
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				token = JSON.parse(options.xhr.responseText).auth_token;
  			self.loguear(token);
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
		};

		var onErrorHandler = function(collection, response, options) {
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
			mostrar_errores_modelo_2(is_error, '#form_userlogin_error');
		} else {
				login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
		}
	},

	loguear: function(token){
		sessionStorage.setItem('token', token);
		$("#div_login").hide();
		$("#div_registrar_usuario").hide();
		$('#form_userlogin')[0].reset();

		menuNavegacion_view.render();
		var menuInicio_view = new app.MenuInicio_view();
		notificaciones_view = new app.Notificaciones_view();
		//console.log(sessionStorage.getItem("token"));
	},

	mostrar_error_login: function(errores){
		$("#form_userlogin_error").empty();
		$("#form_userlogin_error").fadeIn('slow');
		$("#form_userlogin_error").append("<strong>"+ "El usuario y la contraseña no coinciden." + "</strong>");
	},

	mostrar_correcto_registro: function(errores){
		$("#form_userreg_error").fadeOut('slow');
		mostrar_modal_generico('Creación de cuenta ', 'Gracias por registrarte en uwallet', 'Te hemos enviado un correo de verificación para terminar el proceso.', 'confirmacion.png'  );
	},

	// Se podria genera un error 422 generico
	mostrar_error_422_registro: function(error){
		if (error.length == 36){
			error = "Este email ya existe en nuestra base de datos, intenta con otro";
		}
		$("#form_userreg_error").empty();
		$("#form_userreg_error").fadeIn('slow');
		$("#form_userreg_error").append("<strong>"+ error + "</strong>");
	},

	verificar_token: function(){
	}

});

//var userreg_view = new app.Userreg_view();

var userLogin_view = new app.UserLogin_view();
var notificaciones_view;
