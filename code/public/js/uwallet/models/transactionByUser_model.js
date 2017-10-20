var app = app || {};

app.TransactionByUser_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/transaction_by_user',

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo TransactionByUser_model ha sido modificado.');
		});
	}
});
