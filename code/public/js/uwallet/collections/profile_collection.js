var app = app || {};

var Profile_collection = Backbone.Collection.extend({
  Model: app.Profile_model,
  url: "http://192.168.99.101:4060/users/get_user"
});

app.profile_collection = new Profile_collection();
