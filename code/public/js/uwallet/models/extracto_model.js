var app = app || {};
//Modelo que deberia servir para update, get y delete

app.Extracto_model = Backbone.Model.extend({
  //urlRoot: 'http://192.168.99.101:4000/credit_cards?', d_0=15&m_0=10&a_0=2017&d_1=19&m_1=10&a_1=2017
  url: function(){
    urlextracto = 'http://192.168.99.101:4000/day_extracts?d_0=' + this.get('d_0') + '&m_0=' + this.get('m_0') + '&a_0=' + this.get('a_0') + '&d_1=' + this.get('d_1') + '&m_1=' + this.get('m_1') + '&a_1=' + this.get('a_1');
    console.log(urlextracto);
    return urlextracto
  },


	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo ha sido modificado.');
		});
	}
});
