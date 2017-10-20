var app = app || {};
//Create cards

app.Cards_create_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/credit_cards/registercard',

  validate: function (attrs) {
    var errors = [];

    if(Object.keys(attrs).length != 4){
      errors.push({name: 'Cantidad de atributos', message: 'La cantidad de atributos es incorrecta.'});
    }
    if (!attrs.number) {
      errors.push({name: 'Número de tarjeta', message: 'Es necesario que esté el campo número de tarjeta.'});
    } else if (attrs.number.length < 15 || attrs.number.length > 20){
        cant = attrs.number.length;
        errors.push({name: 'Número de tarjeta', message: 'Es necesario que el número sea de entre 15 y 20 digitos. Ha digitado ' + cant + ' números de su tarjeta'});
    }

    if (!attrs.amount) {
      errors.push({name: 'Monto', message: 'Es necesario que esté el campo monto.'});
    }
    if (!attrs.expiration_month) {
      errors.push({name: 'Mes de expiración', message: 'Es necesario que esté el campo mes de expiración.'});
    }  else if (attrs.expiration_month < 1 || attrs.expiration_month > 12){
        errors.push({name: 'Mes de expiración', message: 'Debe seleccionar un mes válido.'});
    }
    if (!attrs.expiration_year) {
      errors.push({name: 'Año de expiración', message: 'Es necesario que esté el campo año de expiración.'});
    } else if (attrs.expiration_year < 2017 || attrs.expiration_month.expiration_year > 2100){
        errors.push({name: 'Año de expiración', message: 'Debe seleccionar un año válido.'});
    }
    return errors.length > 0 ? errors : false;
  },

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
