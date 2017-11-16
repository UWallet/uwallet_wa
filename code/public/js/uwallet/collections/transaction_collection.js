var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/create_transaction'

var Transaction_collection = Backbone.Collection.extend({
  Model: app.Transaction_model,
  url: string
});

app.transaction_collection = new Transaction_collection();
