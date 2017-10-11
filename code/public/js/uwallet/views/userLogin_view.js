var app = app || {};

app.Userreg_view = Backbone.View.extend({
	el: '#div_login',
	template: _.template($('#tpl_login').html()),

	events: {
		'submit #form_userlogin': 'loguear_usuario'
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
		var self = this;
    e.preventDefault();
		user = objectifyForm( $('#form_userlogin').serializeArray());  // Convierte todos los datos del formulario en un objeto
		var login_usuario = new app.Userlogin_model(user);
    is_error = login_usuario.validate(login_usuario.attributes);
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
				model_errors = login_usuario.save({}, options);

				// Verificar que se pudo loguear
        if (false) { // Caso en que se no logueo
          $('#form_userlogin input[name=password]').val("");
          self.mostrar_error_login();
        } else{
          $("#div_login").hide();
          $("#div_registrar_usuario").hide();
          $('#form_userlogin')[0].reset();

					var menuNavegacion_view = new app.MenuNavegacion_view();
					var menuInicio_view = new app.MenuInicio_view();
        }

			}
		},

	mostrar_error_login: function(errores){
		mostrar_modal_generico('Login ', 'No fue posible iniciar sesión', 'El usuario y la contraseña no coinciden.', 'fallo.png'  );
	}

});

var userreg_view = new app.Userreg_view();
