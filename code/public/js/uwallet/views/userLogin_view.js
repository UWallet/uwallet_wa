var app = app || {};

app.Userreg_view = Backbone.View.extend({
	el: '#div_login',
	template:  '\
		<br> <br> \
		<form role="form" id="form_userlogin">\
			<div class="row">\
				<div class="col-md-6">\
					<div class="form-group">\
						<label for="input_email"> Email </label>\
						<input class="form-control" name="email" id="input_email" type="email" placeholder="Email" required  value="jonatan10@gmail.com" />\
					</div>\
				</div>\
				<div class="col-md-6">\
					<div class="form-group">\
						<label for="input_password">	Contraseña </label>\
						<input class="form-control" name="password" id="input_password" type="password" placeholder="Contraseña" required  value="foobar"/>\
					</div>\
				</div>\
			</div>\
			<input type="submit" class="btn btn-default" value="Iniciar sesión" form="form_userlogin" />\
		</form>\
	',

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
		//this.$el.html(this.template());  // Se usaba cuando el template se importaba desde el html
		this.$el.html(this.template);
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
				console.log(response.status + " - " + responses.responseText);
			}
		};

		console.log("Entro en loguear");
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
		sessionStorage.setItem('token', token);
		$("#div_login").hide();
		$("#div_registrar_usuario").hide();
		$('#form_userlogin')[0].reset();

		var menuNavegacion_view = new app.MenuNavegacion_view();
		var menuInicio_view = new app.MenuInicio_view();
		console.log(sessionStorage.getItem("token"));
	}

});

var userreg_view = new app.Userreg_view();
