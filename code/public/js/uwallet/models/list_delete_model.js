var app = app || {};
//Modelo que deberia servir para update, get y delete

app.Listdelete_model = Backbone.Model.extend({
  //urlRoot: 'http://192.168.99.101:4000/credit_cards?',
  url: function(){
    return 'http://192.168.99.101:4000/lists/?id=' + this.get('id');
  },


	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
