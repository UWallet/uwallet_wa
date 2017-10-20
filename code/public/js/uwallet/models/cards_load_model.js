var app = app || {};
//Create cards

app.Cards_load_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/credit_cards/transfer_money_from_card',

  validate: function (attrs) {
    var errors = [];

    if(Object.keys(attrs).length != 2){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});
    }
    if (!attrs.cardId) {
      errors.push({name: 'Número de tarjeta', message: 'Es necesario que esté el campo número de tarjeta.'});
    }
    if (!attrs.money) {
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
