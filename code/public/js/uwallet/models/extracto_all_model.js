var app = app || {};
//Modelo que deberia servir para update, get y delete

app.Extractoall_model = Backbone.Model.extend({
  //urlRoot: 'http://192.168.99.101:4000/credit_cards?', d_0=15&m_0=10&a_0=2017&d_1=19&m_1=10&a_1=2017
  url: function(){
    return 'http://192.168.99.101:4000/all_extracts';
  },


	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
