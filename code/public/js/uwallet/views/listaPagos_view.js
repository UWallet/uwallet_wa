
var app = app || {};

app.ListaPagos_view = Backbone.View.extend({
    el: '#div_menu_lista_pagos',
    template: '\
    <div class="col-md-12" align="center">\
        <h1> Lista de pagos </h1>\
        <button type="submit" class="btn btn-success" value="" id="create_pago"> Agregar recordatorio</button> <br><br>\
      </div>\
      <div class="col-md-2" align="center">\
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
      		<h4> UWallet  </h4>\
      	 </div>\
       </div>\
      </div>\
      </div>\
      \
      <div class="modal fade" id="modal_pagos_edicion" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
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
      <form role="form" id="form_pago_edicion">\
      <div class="form-group">\
        <label for="input_description"> Descripción de pago: </label>\
        <input class="form-control" name="description" id="input_description_1" type="text" placeholder="Descripción" required />\
      </div>\
      <div class="form-group">\
        <label for="input_date"> Fecha de pago: </label>\
        <input name="date_pay" id="input_date_1" type="date">\
      </div>\
      <div class="form-group">\
        <label for="input_cost"> Monto a pagar: </label>\
        <input class="form-control" name="cost" id="input_cost_1" type="number" placeholder="Monto" required />\
      </div>\
      <div class="form-group">\
        <label for="input_target"> Cuenta a pagar: </label>\
        <input class="form-control" name="target_account" id="input_target_1" type="number" placeholder="Cuenta" required />\
      </div>\
        <div id="div_btn_pago">\
         <input type="submit" class="btn btn-default" form="form_pago_edicion" id="btn_editar_pago" value="Editar">\
         <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
        </div>\
      </form>\
      <div class="modal-footer">\
       <h4> Una frase chevere :v  </h4>\
      </div>\
    </div>\
   </div>\
   </div>\
   \
      <!-- Inicio de modal error_pago. -->\
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
      <!-- Fin modal de  modal error_pago.-->\
    ',
    events: {
        'click #create_pago': 'modal_pago',
        'click #btn_reintentar_agregar_pago': 'modal_pago',
        'submit #form_pago': 'create_pago',
        'submit #form_pago_edicion': 'actualizar_pago',
        'click .borrar-pago': 'eliminar_pago',
         'click .editar-pago' : 'modal_edicion_pago'
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
              lista_deudas = JSON.parse(options.xhr.responseText);
              $("#deudas").html("");
              $("#deudas").append("<tr><th>Acreedor</th><th>Descripción</th><th>Monto</th><th>Fecha</th><th>Operaciones</th>/tr>");
              deudas = JSON.parse(options.xhr.responseText);
              for (var i = 0; i < deudas.length; i++){
                $("#deudas").append("<tr><td>"+ miPerfil_view.formato_cuenta(deudas[i].target_account) +"</td>  <td>"+ deudas[i].description +"</td><td>$"+ deudas[i].cost+"</td><td>"+ deudas[i].date_pay+"</td><td><button type='button' class='editar-pago btn btn-primary' id='"+deudas[i].id +"'>Actualizar</button><button type='button' class='borrar-pago btn btn-danger' id='"+deudas[i].id +"'>Eliminar</button></td></tr>");
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
 		  } else if(response.status == 404) {
 				self.mostrar_error_404();
 			}	else {
 				alert("Respuesta desconocida");
 				console.log(response.status + " - " + response.responseText);
 			}
 		};

 		e.preventDefault();
 		console.log("entro a crear pago");
 		var pago = $('#form_pago').serializeArray();
    pago.push({name: "state_pay", value: "no"}); //editar cuando jimmy cambie esta mierda
 		var pago2 = new app.Listscreate_model(objectifyForm(pago));
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

  eliminar_pago: function(e){
		 // Cuando falla la peticion se buscan en 'response'
 		var onErrorHandler = function(collection, response, options) {
 			if(response.status == 200) {
				self.peticiondeudas();
				mostrar_modal_generico('Eliminar pago pendiente', 'Se ha eliminado este pago de tu cuenta.', 'Ya no podras ver este pago.', 'confirmacion.png'  );
 			} else {
 				alert("Respuesta desconocida");
 				console.log(response.status + " - " + response.responseText);
 			}
 		};
		var self = this;
		console.log(e.target.id);
		var listadel = new app.Listdelete_model({id: e.target.id}); //{id: e.target.id}
	//thisDeal.destroy({data: { program_id: dealProgram.id }, processData: true})
 		listadel.destroy({
			 //data: { id2: e.target.id },
			 // processData: true,
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },error: onErrorHandler
     });
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
 	},

  modal_edicion_pago: function(e){
  $('#modal_pagos_edicion').modal('show');
  bandera = true;
  id_deuda =  e.target.id;
  mi_deuda = null;
//   console.log(lista_deudas.length);
  for (var i = 0; i < lista_deudas.length; i++) {
    //console.log(lista_deudas[i]);
    if (lista_deudas[i].id ==  id_deuda){
      mi_deuda = lista_deudas[i];
      $("#input_description_1").val(mi_deuda.description);
    //  $("#input_date").val(mi_deuda.date);
      $("#input_cost_1").val(mi_deuda.cost);
      $("#input_target_1").val(mi_deuda.target_account);
      console.log(mi_deuda.date_pay);
      document.getElementById("input_date_1").value = mi_deuda.date_pay;
      deuda_en_edicion = id_deuda;
      break;
    }
  }
},
  actualizar_pago: function(e){
  e.preventDefault();
  console.log("Deuda_en_edicion");
  var self = this;

  var onDataHandler = function(collection, response, options) {
    console.log(options);
    if (options.xhr.status == 204){
      console.log("Peticion edicion correcta");
      self.peticiondeudas();
      mostrar_modal_generico('Editar Pago Pendiente', 'Se edito este pago.', 'Ya tienes este pago disponible en Lista de pagos', 'confirmacion.png'  );
    } else {
      alert("Respuesta desconocida");
      console.log(response.status + " - " + response.responseText);
    }
  };

  var onErrorHandler = function(collection, response, options) {
    console.log(response, options);
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



  var pago = $('#form_pago_edicion').serializeArray();  // NO USAR Activa el envio del formulario
  pago.push ({name: "state_pay", value: null});
  pago.push ({name: "id", value: deuda_en_edicion});
  //pago.push({name: "state_pay", value: "no"}); //editar cuando jimmy cambie esta mierda
  console.log(pago);
  var pago2 = new app.Listdelete_model(objectifyForm(pago));
  console.log(pago2);
  // var user = new User({ id: 123 });
//    is_error = pago2.validate(pago2.attributes);
  $('#modal_pagos_edicion').modal('hide');
  //console.log(is_error);
  //if (is_error) {
  //	mostrar_errores_modelo(is_error)
  //} else {
      //login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
      pago2.save({},{
        type: 'PUT',
        headers: {
          'Authorization': sessionStorage.getItem("token")
        },success: onDataHandler,
  					error: onErrorHandler
      });

    //}
},

  mostrar_error_404: function(errores){
		var self = this;
		this.mostrar_modal_error_pago('Agregar Pago Pendiente', 'No es posible agregar pago no existe el acreedor.'," ", 'fallo.png'  );
	},
	mostrar_modal_error_pago: function(contenido_header, titulo, contenido, imagen){
	  // Limpiar el contenido del modal
	  $("#modal_error_pago_body").empty();
	  $("#modal_error_pago_header").empty();

	  $('#modal_error_pago').modal('show');   // Muestra el modal
	  // Mostrar contenido
	  $("#modal_error_pago_header").append("<strong>"+ contenido_header + "</strong>");
	  $('#modal_error_pago_body').append("<h1>"+ titulo+ "</h1>")
	  $('#modal_error_pago_body').append("<h3>" + contenido + "</h3>")
	  $('#modal_error_pago_body').append("<img class='center-block' src='public/img/"+ imagen+ " ' alt=''>")

	}

});
//var listaPagos_view = new app.ListaPagos_view();
var lista_deudas;
var deuda_en_edicion;
