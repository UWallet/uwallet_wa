var app = app || {};

app.Profile_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/users/get_user',

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo profile_model ha sido modificado.');
		});
	}
});

/*

{
    "id": 1,
    "firstName": "asdasd",
    "lastName": "asd",
    "email": "loisferval97@hotmail.com",
    "money": 0
}
*/
