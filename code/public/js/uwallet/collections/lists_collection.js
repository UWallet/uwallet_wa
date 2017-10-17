var app = app || {};

var Lists_collection = Backbone.Collection.extend({
  Model: app.Lists_model,
  url: "http://192.168.99.101:4000/lists/by_user"
});

app.lists_collection = new Lists_collection();
