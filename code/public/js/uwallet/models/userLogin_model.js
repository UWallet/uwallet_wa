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
    else{
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey($('#pubkey').val());
      var encrypted = encrypt.encrypt(attrs.password);
      console.log("clave_cifrada:"+encrypted);


      //var decrypt = new JSEncrypt();
      //decrypt.setPrivateKey($('#privkey').val());
      //var uncrypted = decrypt.decrypt(encrypted);
      //attrs.password = (uncrypted);
      //console.log("clave_descifrada:"+attrs.password);
    }
    return errors.length > 0 ? errors : false;
  },

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
