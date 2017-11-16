var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/users/login'

var Userlogin_collection = Backbone.Collection.extend({
  Model: app.Userlogin_model,
  url: string
});

app.userlogin_collection = new Userlogin_collection();
