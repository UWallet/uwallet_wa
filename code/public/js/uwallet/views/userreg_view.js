var app = app || {};


// Cambiar esta funcion a un archivo donde todas las views la puedan consultar
function objectifyForm(formArray){
	var returnArray = {};
	for (var i=0; i < formArray.length; i++){
		returnArray[formArray[i]['name']] = formArray[i]['value'];
	}
	return returnArray;
}

var options = {
		success: function () {
			alert('Thanks for the feedback!');
		},
		error: function (model, error) {
			console.log(error);
			console.log(model);
		}
	};

app.Userreg_view = Backbone.View.extend({
	el: '#div_registrar_usuario',
	template: _.template($('#tpl_registrar_usuario').html()),

	events: {
		'submit #form_userreg': 'crear_usuario'
	},

	initialize: function() {
		console.log("Userreg_view inicializado");
		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		this.$el.html(this.template());
	},

	crear_usuario: function(e){
    e.preventDefault();
		user = objectifyForm( $('#form_userreg').serializeArray());
		var nuevo_usuario = new app.Userreg_model({ user	}) // La variable  en este caso 'user' tiene que tener el mismo nombre que la primera pareja llave valor de postman
    validate1 = nuevo_usuario.validate(nuevo_usuario.attributes);
    console.log(validate1); // Falta mostrarle al usuario los errores después de validar el modelo
    model_errors = nuevo_usuario.save({}, options);
	}
});
var login = new app.Userreg_view();
