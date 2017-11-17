var app = app || {};

//var string = 'http://';
//string += localStorage.getItem("direccion_ip");
//string += ':4060/transaction_by_id'


var TransactionById_collection = Backbone.Collection.extend({
  Model: app.TransactionById_model,
  url: 'http://'+localStorage.getItem("direccion_ip")+':4060/transaction_by_id'
});

app.transactionById_collection = new TransactionById_collection();
