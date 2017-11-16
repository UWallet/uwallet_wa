var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/lists/by_user'

var Lists_collection = Backbone.Collection.extend({
  Model: app.Lists_model,
  url: string
});

app.lists_collection = new Lists_collection();
