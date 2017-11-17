var app = app || {};

//var string = 'http://';
//string += localStorage.getItem("direccion_ip");
//string += ':4060/users/get_user'


var Profile_collection = Backbone.Collection.extend({
  Model: app.Profile_model,
  url: 'http://'+localStorage.getItem("direccion_ip")+':4060/users/get_user'
});

app.profile_collection = new Profile_collection();
