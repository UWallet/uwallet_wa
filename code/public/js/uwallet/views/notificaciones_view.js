var app = app || {};

var TodoView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

app.Notificaciones_view = Backbone.View.extend({
	el: '#div_menu_notificaciones',
  template: '\
  	<h1> Notificaciones </h1>\
  	<table class="flat-table" >\
      <tr>\
        <th>Asunto</th>  <th>Contenido</th>  <th>Estado</th>\
      </tr>\
  	<tbody id="tbl_notificaciones">\
  	</tbody>\
  	</table>\
  ',

	events: {
		'click .ver_notificacion': 'put_notificacion'
  },

	initialize: function() {
		var self = this;
    //this.$el.hide()
    //this.$el.html(this.template);

	},

  consola_simple(){
  },

	render: function() {
    this.$el.show()
    this.$el.html(this.template);
    var self = this;
    self.pintar_notificacion()
	},

  pintar_notificacion: function(){
  //  console.log("Entro en pintar_notificacion", notificacion);
    $("#tbl_notificaciones").html("");
    for (var i = arreglo_notificaciones.length-1; i >= 0 ; i--){
      notificacion = arreglo_notificaciones[i];
      $("#tbl_notificaciones").append("<tr><td>"+ notificacion.subject +"</td>  <td>"+ notificacion.content +
                  "</td><td><button type='button' class='saldo btn btn-primary' id='"+notificacion.id +"'>Leer</button></td></tr>");
    }
  },

 nueva_notificacion: function(notificacion){
   miPerfil_view.peticionusuario();
    arreglo_notificaciones.push(notificacion);
    var self = this;
    self.pintar_notificacion();
  //  toastr.info('Are you the 6 fingered man?');
  	if (notificacion.delivered == false){
    	Command: toastr["success"](notificacion.content, notificacion.subject)
  		toastr.options = {
  		  "closeButton": true,
  		  "debug": true,
  		  "newestOnTop": true,
  		  "progressBar": true,
  		  "positionClass": "toast-top-right",
  		  "preventDuplicates": false,
  		  "onclick": null,
  		  "showDuration": "300",
  		  "hideDuration": "1000",
  		  "timeOut": "5000",
  		  "extendedTimeOut": "1000",
  		  "showEasing": "swing",
  		  "hideEasing": "linear",
  		  "showMethod": "fadeIn",
  		  "hideMethod": "fadeOut"
  		}
      notificacion.delivered="true";
      self.put_notificacion(notificacion);
  	}
    //self.put_notificacion(notificacion);
  },

	put_notificacion: function(notificacion){
    var onDataHandler = function(collection, response, options) {
	    if (options.xhr.status == 204){
	    }else if (options.xhr.status == 400){
        console.log("Bien");
      } else {
	      alert("Respuesta desconocida");
	      console.log(response.status + " - " + response.responseText);
	    }
	  };
    var onErrorHandler = function(collection, response, options) {
	    if (options.xhr.status == 201){
	      self.peticiondeudas();
	    } else if(response.status == 400) {
	      //self.mostrar_error_400();
	    }	else if(response.status == 422) {
	      //self.mostrar_error_422(response.responseJSON);
	    } else {
	      alert("Respuesta desconocida");
	      console.log(response.status + " - " + response.responseText);
	    }
	  };

		var notificacion_put = new app.Notification_model(notificacion);
    notificacion_put.save({},{
      type: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem("token")
      },success: onDataHandler,
          error: onErrorHandler
    });
	},

	mostrar_error_login: function(errores){
		mostrar_modal_generico('Login ', 'No fue posible iniciar sesión', 'El usuario y la contraseña no coinciden.', 'fallo.png'  );
	}

});
var arreglo_notificaciones = [];
//var noficaciones_view = new app.Noficaciones_view();

/*

template: '\
	<h1> Notificaciones </h1>\
	<table class="flat-table" id="tarjetas">\
	<tbody>\
	</tbody>\
	</table>\
',

*/
