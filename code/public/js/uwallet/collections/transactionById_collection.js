var app = app || {};

var TransactionById_collection = Backbone.Collection.extend({
  Model: app.TransactionById_model,
  url: "http://192.168.99.101:4000/transaction_by_id"
});

app.transactionById_collection = new TransactionById_collection();
