var app = app || {};

var TodoView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

app.Notificaciones_view = Backbone.View.extend({
	el: '#div_menu_notificaciones',
	template: _.template("<%= attributes.content %>"),

	events: {
		'click .ver_notificacion': 'put_notificacion'

		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {
		console.log("initialize de menuNotificaciones_view");
		this.listenTo(app.notifications_collection, "change", this.render);
		console.log(app.notifications_collection.models);

		//a3 = new app.Notification_model(app.notifications.models);
		//console.log(a3);



		var self = this;
		//self.render();
		//self.iniciar_notificaciones_firebase;
	},

	render: function() {
		//console.log("renderizando menuNotificaciones_view");
		//this.$el.show();
		//this.$el.html(this.template);
		//a = new NotificationCollection();
		this.$el.html(this.template(app.notifications_collection.models.toJSON()));
    return this;
	},

	put_notificacion: function(e){
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
	}

});

//var noficaciones_view = new app.Noficaciones_view();

/*

template: '\
	<h1> Notificaciones </h1>\
	<table class="flat-table" id="tarjetas">\
	<tbody>\
	</tbody>\
	</table>\
',

*/
