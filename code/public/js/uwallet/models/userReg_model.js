var app = app || {};

app.Userreg_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/register',

  validate: function (attrs) {
    var errors = [];

    if (attrs.user.password.length < 100){
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
        errors.push({name: 'Las contraseñas no coincide', message: 'Es necesario que las contraseñas coincidan'});
      } else if (attrs.user.password.length < 8){
        errors.push({name: 'Contraseña', message: 'Es necesario que la contraseña tenga al menos 8 caracteres'});
      } else if (!tiene_numeros( attrs.user.password   ) ){
        errors.push({name: 'Contraseña', message: 'Es necesario que la contraseña tenga al menos un número'});
      } else if (!tiene_mayusculas( attrs.user.password   ) ){
        errors.push({name: 'Contraseña', message: 'Es necesario que la contraseña tenga al menos una letra mayúscula'});
      }
      else{
        if (attrs.user.password.length < 100){
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey("-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDqAMvO0w5Lz3iyJObftSw8jFo/\n3CoyqaYLcWbA6A4mjCufMie8L+dA8kKO1M4JpmslU1h7W1fovOUDNc4ZukhMN/Pi\nvfaqROZ95GwQfLWjkKRBngSU5ITOBtqAuiBSeJgfZORe4C4NoiVkssfTUUgmYbs7\nwj1k5Jz0K0e1odGHzQIDAQAB\n-----END PUBLIC KEY-----");
          var encrypted = encrypt.encrypt(attrs.user.password);
          attrs.user.password = encrypted;
        }
        if (attrs.user.password_confirmation.length < 100){
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey("-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDqAMvO0w5Lz3iyJObftSw8jFo/\n3CoyqaYLcWbA6A4mjCufMie8L+dA8kKO1M4JpmslU1h7W1fovOUDNc4ZukhMN/Pi\nvfaqROZ95GwQfLWjkKRBngSU5ITOBtqAuiBSeJgfZORe4C4NoiVkssfTUUgmYbs7\nwj1k5Jz0K0e1odGHzQIDAQAB\n-----END PUBLIC KEY-----");
          var encrypted = encrypt.encrypt(attrs.user.password_confirmation);
          attrs.user.password_confirmation = encrypted;
        }
      }
    }
    return errors.length > 0 ? errors : false;
  },

	initialize: function() {
		//console.log('Se ha creado una nueva instancia del Modelo Userreg.');

		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
