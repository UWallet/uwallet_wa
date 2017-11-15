var app = app || {};

var Userregs_collection = Backbone.Collection.extend({
  Model: app.Userreg_model,
  url: "http://192.168.99.101:4060/users/register"
});

app.userregs_collection = new Userregs_collection();
