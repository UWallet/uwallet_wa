var app = app || {};

var Notification_collection = Backbone.Firebase.Collection.extend({
  //Model: app.Notification_model,
  url: "https://notifications-db.firebaseio.com/registros",
  autoSync: true // Data will sync in realtime
});

app.notifications_collection = new Notification_collection();

app.notifications_collection.on('sync', function(collection) {
  //console.log('collection is loaded', collection.models);
  for(i in collection.models){
    //console.log(collection.models[i].attributes.content);
  }
});


app.notifications_collection.on('add', function(collection) {
  if (collection.attributes.id_user == sessionStorage.getItem("id_user")){
  //  console.log("Nueva notificacion");
    //console.log(collection.attributes);
    notificaciones_view.nueva_notificacion(collection.attributes);
  }
});
