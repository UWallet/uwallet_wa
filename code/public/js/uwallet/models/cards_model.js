var app = app || {};
//Modelo que deberia servir para update, get y delete
var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/credit_cards/?id='


app.Cards_model = Backbone.Model.extend({
  //urlRoot: 'http://192.168.99.101:4060/credit_cards?',
  url: function(){
    return string + this.get('id');
  },


	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
