var app = app || {};

app.TransactionById_model = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/transaction_by_id',

	initialize: function() {
		this.on('change', function(){
			//console.log('El modelo TransactionById_model ha sido modificado.');
      //console.log(this);
		});
	}
});

/*

{
    "id": 2,
    "useridgiving": 11,
    "useridreceiving": 2,
    "amount": 50,
    "state": "complete",
    "created_at": "2017-10-12T12:45:07.000Z",
    "updated_at": "2017-10-12T12:45:07.000Z"
}
*/
