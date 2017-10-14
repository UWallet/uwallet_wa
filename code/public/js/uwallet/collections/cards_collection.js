var app = app || {};

var Cards_collection = Backbone.Collection.extend({
  Model: app.Cards_model,
  url: "http://192.168.99.101:4000/credit_cards"
});

app.cards_collection = new Cards_collection();
