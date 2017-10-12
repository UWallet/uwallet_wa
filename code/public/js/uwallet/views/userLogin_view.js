var app = app || {};

app.Userreg_view = Backbone.View.extend({
	el: '#div_login',
	template: _.template($('#tpl_login').html()),

	events: {
		'submit #form_userlogin': 'loguear_usuario'

		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {

		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		this.$el.html(this.template());
	},

	loguear_usuario: function(e){
		console.log("Entro en loguear");
		var self = this;
    e.preventDefault();
		user = objectifyForm( $('#form_userlogin').serializeArray());  // Convierte todos los datos del formulario en un objeto
		var login_usuario = new app.Userlogin_model(user);
    is_error = login_usuario.validate(login_usuario.attributes);
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
				login_usuario.save({}, {
					dataType: 'text',
					success: function (model, respuesta, options) {
							token = respuesta.substr(15,147);
							self.loguear(token);
					},
			    error: function (model, respuesta, options) {
						//console.log(model); console.log(options);
						if(respuesta.status == 401) {
							$('#form_userlogin input[name=password]').val("");
		          self.mostrar_error_login();
						} else {
							alert("Respuesta desconocida");
							console.log(respuesta.status + " - " + respuesta.responseText);
						}
			    }
				});
			}
		},

	mostrar_error_login: function(errores){
		mostrar_modal_generico('Login ', 'No fue posible iniciar sesión', 'El usuario y la contraseña no coinciden.', 'fallo.png'  );
	},
	loguear: function(token){
		sessionStorage.setItem('token', token);
		$("#div_login").hide();
		$("#div_registrar_usuario").hide();
		$('#form_userlogin')[0].reset();

		var menuNavegacion_view = new app.MenuNavegacion_view();
		var menuInicio_view = new app.MenuInicio_view();
		//console.log(sessionStorage.getItem("token"));
	}

});

var userreg_view = new app.Userreg_view();
