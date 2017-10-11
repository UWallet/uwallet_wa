var app = app || {};

app.Userlogin_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/login',

  validate: function (attrs) {
    var errors = [];

    if(Object.keys(attrs).length != 2){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});
    }
    if (!attrs.email) {
      errors.push({name: 'Email', message: 'Es necesario que esté el campo email.'});
    }
    if (!attrs.password) {
      errors.push({name: 'Contraseña', message: 'Es necesario que esté el campo contraseña'});
    }
    return errors.length > 0 ? errors : false;
  },

	initialize: function() {
		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	}
});
