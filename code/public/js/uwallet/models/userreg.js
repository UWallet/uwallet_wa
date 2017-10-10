var app = app || {};

app.Userreg = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/register',


	initialize: function() {
		console.log('Se ha creado una nueva instancia del Modelo Userreg.');

		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	}
});
