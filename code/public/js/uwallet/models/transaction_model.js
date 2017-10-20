var app = app || {};

app.Transaction_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/create_transaction',

  validate: function (attrs) {
    var errors = [];

    if(Object.keys(attrs).length != 3){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});
    }
    if (!attrs.userid) {
      errors.push({name: 'Usuario destinatario', message: 'Es necesario que esté el campo usuario destinatario.'});
    }
    if (!attrs.amount) {
      errors.push({name: 'Monto', message: 'Es necesario que esté el campo monto.'});
    }
    return errors.length > 0 ? errors : false;
  },

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
