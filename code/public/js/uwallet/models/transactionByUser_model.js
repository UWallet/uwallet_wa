var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/transaction_by_user';

app.TransactionByUser_model = Backbone.Model.extend({
  urlRoot: string,

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo TransactionByUser_model ha sido modificado.');
		});
	}
});
