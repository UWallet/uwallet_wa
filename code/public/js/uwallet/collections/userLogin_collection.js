var app = app || {};

var Userlogin_collection = Backbone.Collection.extend({
  Model: app.Userlogin_model,
  url: "http://192.168.99.101:4060/users/login"
});

app.userlogin_collection = new Userlogin_collection();
