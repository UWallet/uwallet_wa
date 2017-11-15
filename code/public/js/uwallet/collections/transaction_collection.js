var app = app || {};

var Transaction_collection = Backbone.Collection.extend({
  Model: app.Transaction_model,
  url: "http://192.168.99.101:4060/create_transaction"
});

app.transaction_collection = new Transaction_collection();
