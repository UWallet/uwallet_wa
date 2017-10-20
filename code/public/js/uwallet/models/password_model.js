var app = app || {};

app.Password_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/update',

  validate: function (attrs) {
    var errors = [];

    if(Object.keys(attrs.user).length != 2){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});
    }
    if (!attrs.user.password || !attrs.user.password_confirmation) {
      errors.push({name: 'Contraseña', message: 'Es necesario que esté el campo contraseña'});
    } else if (attrs.user.password != attrs.user.password_confirmation){
      errors.push({name: 'Las contraseñas no coincide', message: 'Es necesario que las contraseñas coincidan'});
    } else if (attrs.user.password.length < 8){
      errors.push({name: 'Contraseña', message: 'Es necesario que la contraseña tenga al menos 8 caracteres'});
    } else if (!tiene_numeros( attrs.user.password   ) ){
      errors.push({name: 'Contraseña', message: 'Es necesario que la contraseña tenga al menos un número'});
    } else if (!tiene_mayusculas( attrs.user.password   ) ){
      errors.push({name: 'Contraseña', message: 'Es necesario que la contraseña tenga al menos una letra mayúscula'});
    }
    return errors.length > 0 ? errors : false;
  },
	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo profile_model ha sido modificado.');
		});
	}
});

/*

{
    "id": 1,
    "firstName": "asdasd",
    "lastName": "asd",
    "email": "loisferval97@hotmail.com",
    "money": 0
}
*/
