var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/transaction_by_user'


var TransactionByUser_collection = Backbone.Collection.extend({
  Model: app.TransactionByUser_model,
  url: string
});

app.transactionByUser_collection = new TransactionByUser_collection();
