var app = app || {};

app.Notification = Backbone.Model.extend({
  urlRoot: 'http://192.168.99.101:4000/notifications/',


  initialize: function() {
    console.log('Se ha creado una nueva instancia del Modelo notificacion.');

    this.on('change', function(){
      console.log('El modelo ha sido modificado.');
    });
  }
});
