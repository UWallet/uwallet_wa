
var app = app || {};

app.ListaPagos_view = Backbone.View.extend({
    el: '#div_menu_lista_pagos',
    template: '\
    <div class="col-md-12" align="center">\
        <h1> Lista de pagos </h1>\
        <button type="submit" class="btn btn-success" value="" id="create_pago"> Agregar tarjeta</button> <br><br>\
      </div>\
        <table class="flat-table col-md-12" id="deudas" align="center">\
        <tbody>\
        </tbody>\
        </table>\
        \
        <div class="modal fade" id="modal_pagos" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
      <div class="modal-dialog">\
       <div class="modal-content">\
      	 <div class="modal-header">\
      		 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
      		 <h4 class="modal-title text-center" id="myModalLabel"> <strong>Agregar un pago pendiente</strong> </h4>\
      	 </div>\
      	 \
      	 <div class="modal-body">\
      		 <h2 class="text-center">Datos de tarjeta</h2>\
      	 </div>\
      	 <form role="form" id="form_pago">\
         <div class="form-group">\
    			 <label for="input_description"> Descripción de pago: </label>\
    			 <input class="form-control" name="description" id="input_description" type="text" placeholder="Descripción" required />\
    		 </div>\
         <div class="form-group">\
    			 <label for="input_date"> Fecha de pago: </label>\
    			 <input name="date_pay" id="input_date" type="date">\
    		 </div>\
         <div class="form-group">\
    			 <label for="input_cost"> Monto a pagar: </label>\
    			 <input class="form-control" name="cost" id="input_cost" type="number" placeholder="Monto" required />\
    		 </div>\
         <div class="form-group">\
    			 <label for="input_target"> Cuenta a pagar: </label>\
    			 <input class="form-control" name="target_account" id="input_target" type="number" placeholder="Cuenta" required />\
    		 </div>\
      		 <div id="div_btn_pago">\
      			<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
      			<input type="submit" class="btn btn-default" form="form_pago" value="Agregar">\
      		 </div>\
      	 </form>\
      	 <div class="modal-footer">\
      		<h4> Una frase chevere :v  </h4>\
      	 </div>\
       </div>\
      </div>\
      </div>\
      \
      <!-- Inicio de modal error_card. -->\
      <div class="modal fade" id="modal_error_pago" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
       <div class="modal-dialog">\
         <div class="modal-content">\
           <div class="modal-header">\
             <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
             <h4 class="modal-title text-center" id="modal_error_pago_header"> </h4>\
           </div>\
      \
           <div class="modal-body" id="modal_error_pago_body"> sin contenido</div>\
      \
           <div class="modal-footer">\
             <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
      			  <button type="button" class="btn btn-default" id="btn_reintentar_agregar_pago">Reintentar</button>\
           </div>\
         </div>\
       </div>\
      </div>\
      <!-- Fin modal de  modal error_card .-->\
    ',
    events: {
        'click #btn_cualquiera': 'funcion1111',
        'click #create_pago': 'modal_pago',
        'click #btn_reintentar_agregar_pago': 'modal_pago',
        'submit #form_pago': 'create_pago',
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
            if (options.xhr.status == 200){
                $("#deudas").html("");
                $("#deudas").append("<tr><th>Acreedor</th><th>Descripción</th><th>Monto</th><th>Fecha</th><th>Operaciones</th>/tr>");
                deudas = JSON.parse(options.xhr.responseText);
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
   },

   create_pago: function(e){
 		var self = this;
 		// Cuando falla la peticion se buscan en 'response'
 		var onErrorHandler = function(collection, response, options) {
 			if (options.xhr.status == 201){
 				self.peticiondeudas();
 				mostrar_modal_generico('Agregar Pago Pendiente', 'Se agrego este pago.', 'Ya tienes este pago disponible en Lista de pagos', 'confirmacion.png'  );
 		  } else if(response.status == 400) {
 				//self.mostrar_error_400();
 			}	else if(response.status == 422) {
 	 			//self.mostrar_error_422(response.responseJSON);
 			} else {
 				alert("Respuesta desconocida");
 				console.log(response.status + " - " + response.responseText);
 			}
 		};

 		e.preventDefault();
 		console.log("entro a crear pago");
 		var pago = $('#form_pago').serializeArray();
 		pago.push({name: "user_id", value: sessionStorage.getItem("id_user")});
    pago.push({name: "state_pay", value: "no"}); //editar cuando jimmy cambie esta mierda
 		var pago2 = new app.Lists_model(objectifyForm(pago));
     is_error = pago2.validate(pago2.attributes);
 		$('#modal_pagos').modal('hide');
 		console.log(is_error);
 		if (is_error) {
 			mostrar_errores_modelo(is_error)
 		} else {
 				//login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
 				pago2.save({},{
 		      headers: {
 		        'Authorization': sessionStorage.getItem("token")
 		      },error: onErrorHandler
 		    });
 			}
 	},

   modal_pago: function(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    document.getElementById("input_date").value = today;

 		$('#modal_error_pago').modal('hide');
 		$('#modal_pagos').modal('show');
 	}

});
//var listaPagos_view = new app.ListaPagos_view();
