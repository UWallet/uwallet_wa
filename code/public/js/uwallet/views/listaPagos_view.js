
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
       <h4> UWallet  </h4>\
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
      \
      \
      <!-- Inicio modal de  modal pagar.-->\
      <div class="modal fade" id="modal_pagar" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
   <div class="modal-dialog">\
     <div class="modal-content">\
       <div class="modal-header">\
         <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
         <h4 class="modal-title text-center" id="myModalLabel"> <strong>Transacción - Pago de deudas</strong> </h4>\
       </div>\
  		 \
       <div class="modal-body">\
         <h2 class="text-center">Envío de dinero por pago de deuda</h2>\
  			 <form role="form" id="form_pagar">\
  				 <div class="form-group">\
  					 <label for="input_email"> Monto de deuda: </label>\
  					 <input class="form-control" name="amount" min="1" id="input_amount" type="number" placeholder="Monto a enviar" required/>\
  				 </div>\
  				 <div class="form-group">\
  					 <label for="input_email"> Cuenta objetivo: </label>\
  					 <input class="form-control" name="userid" id="input_userid" type="number" placeholder="Cuenta a enviar" required/>\
  				 </div>\
  				  <div id="div_mensaje_campos_incompletos" class="alert alert-danger" style="display:none">\
  						<p> Llene los campos requeridos</p>\
  					</div>\
  					 <div class="form-group">\
  	 					 <label for="input_password"> Contraseña: </label>\
  	 					 <input class="form-control" name="password" id="input_password" type="password" placeholder="Contraseña" required value="foobar"/>\
  	 				 </div>\
  					   <input type="submit" class="btn btn-default" value="Enviar" form="form_pagar" />\
  						 <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
  					</div>\
  			 </form>\
       <div class="modal-footer">\
  		 	<h4> UWallet </h4>\
       </div>\
     </div>\
   </div>\
  </div>\
  <!-- Inicio de modal error_transaccion. -->\
  <div class="modal fade" id="modal_error_transaccion1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
   <div class="modal-dialog">\
     <div class="modal-content">\
       <div class="modal-header">\
         <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
         <h4 class="modal-title text-center" id="modal_error_transaccion1_header"> </h4>\
       </div>\
  \
       <div class="modal-body" id="modal_error_transaccion1_body"> sin contenido</div>\
  \
       <div class="modal-footer">\
         <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
  			  <button type="button" class="btn btn-default" id="btn_reintentar_transaccion1">Reintentar</button>\
       </div>\
     </div>\
   </div>\
  </div>\
  <!-- Fin modal de  modal error_transaccion .-->\
    ',
    events: {
        'click #create_pago': 'modal_pago',
        'click #btn_reintentar_agregar_pago': 'modal_pago',
        'submit #form_pago': 'create_pago',
        'submit #form_pagar': 'hacer_pago',
        'submit #form_pago_edicion': 'actualizar_pago',
        'click .borrar-pago': 'eliminar_pago',
        'click .pagar-pago': 'modal_pagar_pago',
        'click #btn_reintentar_transaccion1': 'modal_pagar_pago',
         'click .editar-pago' : 'modal_edicion_pago'
        // añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
    },

    initialize: function() {
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
              $("#deudas").append("<tr><th>Acreedor</th><th>Descripción</th><th>Monto</th><th>Fecha</th><th>Estado</th><th>Operaciones</th>/tr>");
              deudas = JSON.parse(options.xhr.responseText);
              for (var i = 0; i < deudas.length; i++){
                if((deudas[i].state_pay).toString()=='true'){
                  $("#deudas").append("<tr><td>"+ miPerfil_view.formato_cuenta(deudas[i].target_account) +"</td>  <td>"+ deudas[i].description +"</td><td>$"+ deudas[i].cost+"</td><td>"+ deudas[i].date_pay +"</td><td>"+ self.estado(deudas[i].state_pay) + "</td><td><button type='button' class='pagar-pago btn btn-info' id='"+deudas[i].id +"'>Pagar</button><button type='button' class='editar-pago btn btn-primary' id='"+deudas[i].id +"'>Actualizar</button><button type='button' class='borrar-pago btn btn-danger' id='"+deudas[i].id +"'>Eliminar</button></td></tr>");
                }else{
                  $("#deudas").append("<tr><td>"+ miPerfil_view.formato_cuenta(deudas[i].target_account) +"</td>  <td>"+ deudas[i].description +"</td><td>$"+ deudas[i].cost+"</td><td>"+ deudas[i].date_pay +"</td><td>"+ self.estado(deudas[i].state_pay) + "</td><td><button type='button' class='borrar-pago btn btn-danger' id='"+deudas[i].id +"'>Eliminar</button></td></tr>");
                }
              }
         } else {
             alert("Respuesta desconocida");
             console.log(response.status + " - " + response.responseText);
         }
         };
         // Cuando falla la peticion se buscan en 'response'
         var onErrorHandler = function(collection, response, options) {
             if(response.status == 500) {
                 console.log("Error 500¿? - en deudas.fetch ");
                console.log(response);
             } else {
                 alert("Respuesta desconocida");
                 console.log(response.status + " - " + response.responseText);
             }
         };

         var self = this;
         var tajetas = new app.Lists_model();
         tajetas.fetch({
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },success: onDataHandler,
                     error: onErrorHandler
     });
   },

   estado: function(state){
     if(state.toString() =='true'){
       return 'Activo';
     }else{
       return 'Inactivo';
     }
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
 		var pago = $('#form_pago').serializeArray();
    pago.push({name: "state_pay", value: "true"}); //editar cuando jimmy cambie esta mierda
 		var pago2 = new app.Listscreate_model(objectifyForm(pago));
     is_error = pago2.validate(pago2.attributes);
 		$('#modal_pagos').modal('hide');
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
        if(response.status == 403) {
          self.peticiondeudas();
          mostrar_modal_generico('Lista de pago ', 'No es posible eliminar el recordatorio.', 'Este recordatorio ya fue eliminado.', 'fallo.png'  );
        }
        else{
          alert("Respuesta desconocida");
          console.log(response.status + " - " + response.responseText);
        }
 			}
 		};
		var self = this;
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

  modal_pagar_pago: function(e){
		$('#modal_error_transaccion1').modal('hide');
		$('#modal_pagar').modal('show');
    id_deuda =  e.target.id;
    mi_deuda = null;
  //   console.log(lista_deudas.length);
    for (var i = 0; i < lista_deudas.length; i++) {
      //console.log(lista_deudas[i]);
      if (lista_deudas[i].id ==  id_deuda){
        mi_deuda = lista_deudas[i];
        $('#form_pagar input[name=userid]').val(mi_deuda.target_account);
        $('#form_pagar input[name=amount]').val(mi_deuda.cost);
        deuda_en_edicion = id_deuda;
        break;
      }
    }
		$('#form_pagar input[name=password]').val("");
    $('#form_pagar input[name=userid]').attr('disabled', 'disabled');
    $('#form_pagar input[name=amount]').attr('disabled', 'disabled');
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
      document.getElementById("input_date_1").value = mi_deuda.date_pay;
      deuda_en_edicion = id_deuda;
      break;
    }
  }
},
  actualizar_pago: function(e){
  e.preventDefault();

  var self = this;

  var onDataHandler = function(collection, response, options) {

    if (options.xhr.status == 204){
      self.peticiondeudas();
      mostrar_modal_generico('Editar Pago Pendiente', 'Se edito este pago.', 'Ya tienes este pago disponible en Lista de pagos', 'confirmacion.png'  );
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



  var pago = $('#form_pago_edicion').serializeArray();  // NO USAR Activa el envio del formulario
  pago.push ({name: "state_pay", value: "true"});
  pago.push ({name: "id", value: deuda_en_edicion});
  var pago2 = new app.Listdelete_model(objectifyForm(pago));
  $('#modal_pagos_edicion').modal('hide');
      pago2.save({},{
        type: 'PUT',
        headers: {
          'Authorization': sessionStorage.getItem("token")
        },success: onDataHandler,
  					error: onErrorHandler
      });
},

hacer_pago: function(e){
  var onDataHandler1 = function(collection, response, options) {

    if (options.xhr.status == 204){
      self.peticiondeudas();
    } else {
      alert("Respuesta desconocida");
      console.log(response.status + " - " + response.responseText);
    }
  };
  var onDataHandler = function(collection, response, options) {
    if (options.xhr.status == 200){
      var transaccion2 = new app.Transaction_model(transaccion1);
      is_error = transaccion2.validate(transaccion2.attributes);
      $('#modal_pagar').modal('hide');
      if (is_error) {
        mostrar_errores_modelo(is_error)
      } else {
          //login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
          transaccion2.save({},{
            headers: {
              'Authorization': sessionStorage.getItem("token")
            },error: onErrorHandler
          });
          var pago=[];
          pago.push ({name: "state_pay", value: "false"});
          pago.push ({name: "id", value: deuda_en_edicion});
          var pago2 = new app.Listdelete_model(objectifyForm(pago));
          $('#modal_pagos_edicion').modal('hide');
              pago2.save({},{
                type: 'PUT',
                headers: {
                  'Authorization': sessionStorage.getItem("token")
                },success: onDataHandler1
              });
        }
   } else {
     alert("Respuesta desconocida");
     console.log(response.status + " - " + response.responseText);
   }
   };

  // Cuando falla la peticion se buscan en 'response'
  var onErrorHandler = function(collection, response, options) {
    if(response.status == 401){
      self.mostrar_error_401();
    }else if (options.xhr.status == 201){
      self.mostrar_correcto_transaccion();
   }else if(response.status == 400) {
      self.mostrar_error_400();
    } else if(response.status == 404){
      self.mostrar_error_404();
    }else{
      alert("Respuesta desconocida");
      console.log(response.status + " - " + response.responseText);
    }
  };
  var self = this;

  e.preventDefault();
  $('#form_pagar input[name=userid]').removeAttr("disabled");  // Se reactivan los campos para poder obtener sus valores
  $('#form_pagar input[name=amount]').removeAttr("disabled");

  transaccion1 = objectifyForm( $('#form_pagar').serializeArray());  // Convierte todos los datos del formulario en un objeto

  var verify = new app.Userverify_model({password: transaccion1.password});
  is_error2 = verify.validate(verify.attributes);
  if (is_error2) {
    mostrar_errores_modelo(is_error2);
  } else {
    verify.save({},{
      headers: {
        'Authorization': sessionStorage.getItem("token")
      },success: onDataHandler,
          error: onErrorHandler
    });
  }
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

	},

  mostrar_error_400: function(errores){
		var self = this;
		this.mostrar_modal_error_transaccion('Transacción ', 'No es posible hacer la transacción', 'No tienes suficiente saldo.', 'fallo.png'  );
	},
	mostrar_error_401: function(errores){
		var self = this;
		this.mostrar_modal_error_transaccion('Transacción ', 'No es posible hacer la transacción', 'Es necesario poner tu contraseña.', 'fallo.png'  );
	},
	mostrar_correcto_transaccion: function(errores){
		var self = this;
		miPerfil_view.peticionusuario();
		mostrar_modal_generico('Transacción ', 'Transacción finalizada.', 'La persona a la que le enviaste dinero recibira una notificación pronto.', 'confirmacion.png'  );
	},
  mostrar_modal_error_transaccion: function(contenido_header, titulo, contenido, imagen){
	  // Limpiar el contenido del modal
	  $("#modal_error_transaccion1_body").empty();
	  $("#modal_error_transaccion1_header").empty();

	  $('#modal_error_transaccion1').modal('show');   // Muestra el modal
	  // Mostrar contenido
	  $("#modal_error_transaccion1_header").append("<strong>"+ contenido_header + "</strong>");
	  $('#modal_error_transaccion1_body').append("<h1>"+ titulo+ "</h1>")
	  $('#modal_error_transaccion1_body').append("<h3>" + contenido + "</h3>")
	  $('#modal_error_transaccion1_body').append("<img class='center-block' src='public/img/"+ imagen+ " ' alt=''>")

	},

});
//var listaPagos_view = new app.ListaPagos_view();
var lista_deudas;
var deuda_en_edicion;
