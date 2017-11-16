var app = app || {};
//Create cards
var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/credit_cards/transfer_money_from_card';


app.Cards_load_model = Backbone.Model.extend({
  urlRoot: string,

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
