
var app = app || {};

app.ListaPagos_view = Backbone.View.extend({
    el: '#div_menu_lista_pagos',
    template: '\
        <h1> Lista de pagos </h1>\
        <table class="flat-table" id="deudas">\
        <tbody>\
        </tbody>\
        </table>\
    ',
    events: {
        'click #btn_cualquiera': 'funcion1111'
        // añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
    },
    initialize: function() {
			console.log("iniciando lista de pagos");
        var self = this;
				self.render();
    },
    render: function() {
        var self = this;
        self.peticiondeudas();
        this.$el.show();
        this.$el.html(this.template);
    },

    peticiondeudas: function(e){
        var onDataHandler = function(collection, response, options) {
					console.log(options.xhr.responseJSON);
            if (options.xhr.status == 200){
                $("#deudas").html("");
                $("#deudas").append("<tr><th>Acreedor</th><th>Descripción</th><th>Monto</th><th>Fecha</th><th>Operaciones</th>/tr>");
                deudas = JSON.parse(options.xhr.responseText);
                console.log(deudas[0])
                for (var i = 0; i < deudas.length; i++){
                  $("#deudas").append("<tr><td>"+ deudas[i].target_account +"</td>  <td>"+ deudas[i].description +"</td><td>$"+ deudas[i].cost+"</td><td>"+ deudas[i].date_pay+"</td></tr>");
                        // +"</td><td><button type='button' class='saldo btn btn-primary' id='"+deudas[i].id +"'>Cargar</button><button type='button' class='borrar-tarjeta btn btn-danger' id='"+deudas[i].id +"'>Eliminar</button></td></tr>");
                }
         } else {
             alert("Respuesta desconocida");
             console.log(response.status + " - " + response.responseText);
         }
         };
         // Cuando falla la peticion se buscan en 'response'
         var onErrorHandler = function(collection, response, options) {
             console.log("Entro en error handle");
             if(response.status == 500) {
                 console.log("Error 500¿? - en deudas.fetch ");
                console.log(response);
             } else {
                 alert("Respuesta desconocida");
                 console.log(response.status + " - " + response.responseText);
             }
         };
         console.log("Entro en deudas");

         var self = this;
         var tajetas = new app.Lists_model();
         tajetas.fetch({
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },success: onDataHandler,
                     error: onErrorHandler
     });
    }

});
//var listaPagos_view = new app.ListaPagos_view();
