var app = app || {};

//var string = 'http://';
//string += localStorage.getItem("direccion_ip");
//string += ':4060/notifications/';

app.Notification_model = Backbone.Model.extend({
  url: function(){
    return 'http://'+localStorage.getItem("direccion_ip")+':4060/notifications/';
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
