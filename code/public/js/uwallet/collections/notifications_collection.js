var app = app || {};

var Notification_collection = Backbone.Firebase.Collection.extend({
  Model: app.Notification_model,
  url: "https://notifications-db.firebaseio.com/registros",
  autoSync: true // Data will sync in realtime
});

app.notifications_collection = new Notification_collection();

app.notifications_collection.on('sync', function(collection) {
  console.log('collection is loaded', collection);
});
