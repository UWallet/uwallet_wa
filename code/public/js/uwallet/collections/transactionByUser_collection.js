var app = app || {};

var TransactionByUser_collection = Backbone.Collection.extend({
  Model: app.TransactionByUser_model,
  url: "http://192.168.99.101:4000/transaction_by_user"
});

app.transactionByUser_collection = new TransactionByUser_collection();
