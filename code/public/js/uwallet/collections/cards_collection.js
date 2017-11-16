var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/credit_cards'

var Cards_collection = Backbone.Collection.extend({
  Model: app.Cards_model,
  url: string
});

app.cards_collection = new Cards_collection();
