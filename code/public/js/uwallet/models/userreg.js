var app = app || {};

app.Userreg = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/register',



  validate: function (attrs) {

    console.log("Entro en validate1 " + attrs.user.email);

        var errors = [];

        if (!attrs.email) {
          console.log("Entro en error email");
          errors.push({name: 'email', message: 'Please fill email field.'});
        }
        if (!attrs.feedback) {
          console.log("Error feedback");
          errors.push({name: 'feedback', message: 'Please fill feedback field.'});
        }

        return errors.length > 0 ? errors : false;
  },


	initialize: function() {
		console.log('Se ha creado una nueva instancia del Modelo Userreg.');

		this.on('change', function(){
			console.log('El modelo ha sido modificado.');
		});
	}
});
