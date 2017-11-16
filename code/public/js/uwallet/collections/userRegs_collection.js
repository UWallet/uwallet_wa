var app = app || {};

var string = 'http://';
string += localStorage.getItem("direccion_ip");
string += ':4060/users/register'

var Userregs_collection = Backbone.Collection.extend({
  Model: app.Userreg_model,
  url: string
});

app.userregs_collection = new Userregs_collection();
