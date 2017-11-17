var app = app || {};
//Modelo que deberia servir para update, get y delete

//var string = 'http://';
//string += localStorage.getItem("direccion_ip");
//string += ':4060/all_extracts';



app.Extractoall_model = Backbone.Model.extend({
  //urlRoot: 'http://192.168.99.101:4060/credit_cards?', d_0=15&m_0=10&a_0=2017&d_1=19&m_1=10&a_1=2017
  url: function(){
    return 'http://'+localStorage.getItem("direccion_ip")+ ':4060/all_extracts';
  },


	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
