var app = app || {};

app.Notification_model = Backbone.Model.extend({
  url: function(){
    return 'http://192.168.99.101:4000/notifications/';
  },
  defaults: {
      id:"",
      read:"",
      id_user: "",
      subject: "",
      content: "",
      delivered: "",
  },

  initialize: function() {
    //console.log('Se ha creado una nueva instancia del Modelo notificacion.');

    this.on('change', function(){
      //console.log('El modelo ha sido modificado.');
    });
  }
});
