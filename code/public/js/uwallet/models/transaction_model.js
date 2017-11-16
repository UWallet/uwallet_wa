var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/create_transaction';

app.Transaction_model = Backbone.Model.extend({
  urlRoot: string,

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
