var app = app || {};

app.Userreg_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/register',

  validate: function (attrs) {
    var errors = [];

    if(Object.keys(attrs.user).length != 5){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});
    }
    if (!attrs.user.email) {
      errors.push({name: 'Email', message: 'Es necesario que esté el campo email.'});
    }
    if (!attrs.user.firstName) {
      errors.push({name: 'Nombre', message: 'Es necesario que esté el campo nombre'});
    }
    if (!attrs.user.lastName) {
      errors.push({name: 'Apellido', message: 'Es necesario que esté el campo nombre'});
    }
    if (!attrs.user.password || !attrs.user.password_confirmation) {
      errors.push({name: 'Contraseña', message: 'Es necesario que esté el campo contraseña'});
    } else if (attrs.user.password != attrs.user.password_confirmation){
      errors.push({name: 'Contraseña no coindiente', message: 'Es necesario que las contraseñas coincidan'});
    }


    return errors.length > 0 ? errors : false;
  },

	initialize: function() {
		console.log('Se ha creado una nueva instancia del Modelo Userreg.');

		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	}
});
