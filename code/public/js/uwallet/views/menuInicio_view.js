var app = app || {};
app.MenuInicio_view = Backbone.View.extend({
	el: '#div_menu_inicio',
	template: '\
		<div class="row">\
			<h1>Bienvenido a UWallet</h1>\
			<a class="col-md-4" id="div_iniciar_transaccion" onmouseover="" style="cursor: pointer;">\
				<h1>Enviar dinero</h1>\
				<HR width="0%">\
				<center><img src="public/img/enviar_dinero.png" alt=""></center>\
			</a>\
			<a class="col-md-4" id="div_ir_lista_pagos" onmouseover="" style="cursor: pointer;">\
				<HR width="0%">\
				<HR width="0%">\
				<h1>Lista de pagos</h1>\
				<HR width="0%">\
				<center><img src="public/img/lista_pago.png" alt=""></center>\
			</a>\
			<a class="col-md-4" id="div_ir_extractos" onmouseover="" style="cursor: pointer;">\
				<h1>Generar extractos</h1>\
				<HR width="0%">\
				<center><img src="public/img/pdf.png" alt=""></center>\
			</div>\
		</a>\
		<div class="modal fade" id="modal_aceptacion" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
 <div class="modal-dialog">\
   <div class="modal-content">\
     <div class="modal-header">\
       <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
       <h4 class="modal-title text-center" id="myModalLabel"> <strong>Transacción</strong> </h4>\
     </div>\
		 \
     <div class="modal-body">\
       <h2 class="text-center">Envío de dinero</h2>\
			 <form role="form" id="form_transaction">\
				 <div class="form-group">\
					 <label for="input_email"> Monto: </label>\
					 <input class="form-control" name="amount" min="1" id="input_amount" type="number" placeholder="Monto a enviar" required/>\
				 </div>\
				 <div class="form-group">\
					 <label for="input_email"> Cuenta: </label>\
					 <input class="form-control" name="userid" id="input_userid" type="number" placeholder="Cuenta a enviar" required/>\
				 </div>\
				  <div id="div_mensaje_campos_incompletos" class="alert alert-danger" style="display:none">\
						<p> Llene los campos requeridos</p>\
					</div>\
				 <div id="div_btn_transaccion_1">\
				 	<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
					<button type="button" class="btn btn-default" id="btn_aceptar_valores">Continuar</button>\
				 </div>\
				 <div id="div_btn_transaccion_2" style="display : none;">\
					 <div class="form-group">\
	 					 <label for="input_password"> Contraseña: </label>\
	 					 <input class="form-control" name="password" id="input_password" type="password" placeholder="Contraseña" required value="foobar"/>\
	 				 </div>\
					   <input type="submit" class="btn btn-default" value="Enviar" form="form_transaction" />\
						 <button type="button" class="btn btn-default" id="btn_cancelar_valores">Atrás</button>\
					</div>\
			 </form>\
     </div>\
     <div class="modal-footer">\
		 	<h4> UWallet </h4>\
     </div>\
   </div>\
 </div>\
</div>\
<!-- Inicio de modal error_transaccion. -->\
<div class="modal fade" id="modal_error_transaccion" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
 <div class="modal-dialog">\
   <div class="modal-content">\
     <div class="modal-header">\
       <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
       <h4 class="modal-title text-center" id="modal_error_transaccion_header"> </h4>\
     </div>\
\
     <div class="modal-body" id="modal_error_transaccion_body"> sin contenido</div>\
\
     <div class="modal-footer">\
       <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
			  <button type="button" class="btn btn-default" id="btn_reintentar_transaccion">Reintentar</button>\
     </div>\
   </div>\
 </div>\
</div>\
<!-- Fin modal de  modal error_transaccion .-->\
<!-- Inicio modal de  modal extracts .-->\
<div class="modal fade" id="modal_extractos" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
 <div class="modal-header">\
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
	 <h4 class="modal-title text-center" id="myModalLabel"> <strong>Generar extracto</strong> </h4>\
 </div>\
 \
 <div class="modal-body">\
	 <h2 class="text-center">Extracto</h2>\
 <form role="form" id="form_extracto">\
 <div class="form-group">\
	 <label for="input_date"> Fecha de inicio: </label>\
	 <input name="date_initial" id="input_date1" type="date">\
 </div>\
 <div class="form-group">\
	 <label for="input_date"> Fecha final: </label>\
	 <input name="date_final" id="input_date2" type="date">\
 </div>\
 <div class="form-group">\
 <label for="input_date"> Extracto de todos los tiempos: </label>\
 <button type="button" class="btn btn-success" id="generar_todos_extractos">Generar</button>\
 </div>\
	 <div id="div_btn_pago">\
		<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
		<input type="submit" class="btn btn-default" form="form_extracto" value="Generar">\
	 </div>\
 </form>\
 <div class="modal-footer">\
	<h4> UWallet </h4>\
 </div>\
</div>\
</div>\
</div>\
<!-- Final modal de  modal extracts .-->\
\
<!-- Inicio de modal error_extracto -->\
<div class="modal fade" id="modal_error_extracto" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
 <div class="modal-dialog">\
   <div class="modal-content">\
     <div class="modal-header">\
       <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
       <h4 class="modal-title text-center" id="modal_error_extracto_header"> </h4>\
     </div>\
\
     <div class="modal-body" id="modal_error_extracto_body"> sin contenido</div>\
\
     <div class="modal-footer">\
       <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
			  <button type="button" class="btn btn-default" id="btn_reintentar_extracto">Reintentar</button>\
     </div>\
   </div>\
 </div>\
</div>\
<!-- Fin modal de  modal error_transaccion .-->\
	',

	events: {
		'click #opc_enviar_dinero': 'opc_enviar_dinero',
    'click #opc_cerrar_sesion': 'opc_cerrar_sesion',
		'click #btn_aceptar_valores': 'pedir_contraseña',
		'click #btn_cancelar_valores': 'liberar_campos',
		'click #div_iniciar_transaccion': 'mostrar_modal_transaccion',
		'click #div_ir_extractos': 'mostrar_modal_extractos',
		'click #btn_reintentar_extracto': 'mostrar_modal_extractos',
		'click #generar_todos_extractos': 'generar_all',
		'click #btn_reintentar_transaccion': 'mostrar_modal_transaccion',
		'submit #form_transaction': 'opc_enviar_dinero',
		'submit #form_extracto': 'generar_extracto',
		'click #div_ir_lista_pagos': 'opc_lista_pagos1'

  //  'click #': '',
	},

	initialize: function() {
		var self = this;
		self.render();
	},

	render: function() {
		this.$el.show();
		//this.$el.html(this.template());  // Se usaba cuando el template se importaba desde el html
		this.$el.html(this.template);

	},

	mostrar_modal_transaccion: function(){
		$("#div_btn_transaccion_2").fadeOut('slow');
		$("#div_btn_transaccion_1").fadeIn('slow');
		$('#modal_error_transaccion').modal('hide');
		$('#modal_aceptacion').modal('show');
		$('#form_transaction input[name=password]').val("");
		//$('#modal_error_transaccion').modal('show');
	},
	mostrar_modal_extractos: function(){
		var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    document.getElementById("input_date1").value = today;
		document.getElementById("input_date2").value = today;
		$('#modal_error_extracto').modal('hide');
		$('#modal_extractos').modal('show');
	},

	pedir_contraseña: function(){
		if( $('#form_transaction input[name=userid]').val() != "" && $('#form_transaction input[name=amount]').val() != ""  ){
			$("#div_btn_transaccion_1").hide();
			$("#div_btn_transaccion_2").fadeIn('slow');
		//	$('#form_transaction input[name=password]').val("");
			$('#form_transaction input[name=userid]').attr('disabled', 'disabled');
			$('#form_transaction input[name=amount]').attr('disabled', 'disabled');
			$("#div_mensaje_campos_incompletos").fadeOut('slow');
			//$("#campo").attr('disabled', 'disabled');
		} else {
			$("#div_mensaje_campos_incompletos").fadeIn('slow');
		}


  },

	liberar_campos: function(){
		//console.log("entro a liberar campos");
		$("#div_btn_transaccion_1").fadeIn('slow');
		$("#div_btn_transaccion_2").fadeOut('slow');
		$('#form_transaction input[name=password]').val("");
		$('#form_transaction input[name=userid]').removeAttr("disabled");
		$('#form_transaction input[name=amount]').removeAttr("disabled");

	},

  opc_lista_pagos1: function(){
		var menuNavegacion_view = new app.MenuNavegacion_view();
		menuNavegacion_view.opc_lista_pagos();
  },

	opc_extractos1: function(){
		var menuNavegacion_view = new app.MenuNavegacion_view();
		menuNavegacion_view.opc_extractos();
	},

	opc_enviar_dinero: function(e){
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				var transaccion2 = new app.Transaction_model(transaccion1);
		    is_error = transaccion2.validate(transaccion2.attributes);
				$('#modal_aceptacion').modal('hide');
				$('#form_transaction')[0].reset();
				if (is_error) {
					mostrar_errores_modelo(is_error)
				} else {
						//login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
						transaccion2.save({},{
				      headers: {
				        'Authorization': sessionStorage.getItem("token")
				      },error: onErrorHandler
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
		//console.log("Entro a enviar dinero");
		$('#form_transaction input[name=userid]').removeAttr("disabled");  // Se reactivan los campos para poder obtener sus valores
		$('#form_transaction input[name=amount]').removeAttr("disabled");

		transaccion1 = objectifyForm( $('#form_transaction').serializeArray());  // Convierte todos los datos del formulario en un objeto
		//console.log(transaccion1);

		var verify = new app.Userverify_model({password: transaccion1.password});
		is_error2 = verify.validate(verify.attributes);
		if (is_error2) {
			mostrar_errores_modelo(is_error2)
		} else {
			verify.save({},{
				headers: {
					'Authorization': sessionStorage.getItem("token")
				},success: onDataHandler,
  					error: onErrorHandler
			});
		}
	},

	generar_extracto: function(e){
			var onDataHandler = function(collection, response, options) {
					if (options.xhr.status == 204){
						$('#modal_extractos').modal('hide');
						mostrar_modal_generico('Generar extracto ', 'Extracto generado.', 'Un pdf con los extractos indicados a sido enviado a tu correo.', 'confirmacion.png'  );
			 } else {
					 alert("Respuesta desconocida");
					 console.log(response.status + " - " + response.responseText);
			 }
			 };
			 // Cuando falla la peticion se buscan en 'response'
			 var onErrorHandler = function(collection, response, options) {
					 //console.log("Entro en error handle");
					 if(response.status == 500) {
							 console.log("Error 500¿? - en extractos.fetch ");
							//console.log(response);
					 } else {
							 alert("Respuesta desconocida");
							 console.log(response.status + " - " + response.responseText);
					 }
			 };
			 e.preventDefault();
			 var self = this;
			 //console.log("Entro en deudas");
			 extracto = objectifyForm( $('#form_extracto').serializeArray());
			 var dateinitial = new Date(extracto.date_initial);
			 var datefinal = new Date(extracto.date_final);
			 dateinitial.setDate(dateinitial.getDate() + 1);
			 datefinal.setDate(datefinal.getDate() + 1);
			 //console.log(dateinitial<=datefinal);
			 if(dateinitial<=datefinal){
				 var d_0 = dateinitial.getDate();
				 var m_0 = dateinitial.getMonth()+1;
				 var a_0 = dateinitial.getFullYear();
				 var d_1 = datefinal.getDate();
				 var m_1 = datefinal.getMonth()+1;
				 var a_1 = datefinal.getFullYear();
				 var self = this;
				 var extracto1 = new app.Extracto_model({d_0: d_0, m_0 : m_0, a_0: a_0,d_1: d_1, m_1 : m_1, a_1: a_1});
				 extracto1.fetch({
					 headers: {
						 'Authorization': sessionStorage.getItem("token")
					 },success: onDataHandler,
												 error: onErrorHandler
				 });
			 }else{
				 self.mostrar_error_dates();
			 }
 },
 generar_all: function(e){
		 var onDataHandler = function(collection, response, options) {
				 if (options.xhr.status == 204){
					 $('#modal_extractos').modal('hide');
					 mostrar_modal_generico('Generar extracto ', 'Extracto generado.', 'Un pdf con todos tus extractos a sido enviado a tu correo.', 'confirmacion.png'  );
			} else {
					alert("Respuesta desconocida");
					console.log(response.status + " - " + response.responseText);
			}
			};
			// Cuando falla la peticion se buscan en 'response'
			var onErrorHandler = function(collection, response, options) {
					//console.log("Entro en error handle");
					if(response.status == 500) {
							console.log("Error 500¿? - en extractos.fetch ");
						 console.log(response);
					} else {
							alert("Respuesta desconocida");
							console.log(response.status + " - " + response.responseText);
					}
			};
			e.preventDefault();
			var self = this;
			//console.log("Entro en deudas");
			var extracto1 = new app.Extractoall_model();
			extracto1.fetch({
				headers: {
					'Authorization': sessionStorage.getItem("token")
				},success: onDataHandler,
											error: onErrorHandler
			});
},
 mostrar_error_dates: function(errores){
	 var self = this;
	 this.mostrar_modal_error_extracto('Extracto ', 'No es posible generar el extracto', 'La fecha inicial es mayor a la inicial', 'fallo.png'  );
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
		var miPerfil_view = new app.MiPerfil_view();
		miPerfil_view.peticionusuario();
		mostrar_modal_generico('Transacción ', 'Transacción finalizada.', 'La persona a la que le enviaste dinero recibira una notificación pronto.', 'confirmacion.png'  );
	},

	mostrar_modal_error_transaccion: function(contenido_header, titulo, contenido, imagen){
	  // Limpiar el contenido del modal
	  $("#modal_error_transaccion_body").empty();
	  $("#modal_error_transaccion_header").empty();

	  $('#modal_error_transaccion').modal('show');   // Muestra el modal
	  // Mostrar contenido
	  $("#modal_error_transaccion_header").append("<strong>"+ contenido_header + "</strong>");
	  $('#modal_error_transaccion_body').append("<h1>"+ titulo+ "</h1>")
	  $('#modal_error_transaccion_body').append("<h3>" + contenido + "</h3>")
	  $('#modal_error_transaccion_body').append("<img class='center-block' src='public/img/"+ imagen+ " ' alt=''>")

	},

	mostrar_modal_error_extracto: function(contenido_header, titulo, contenido, imagen){
	  // Limpiar el contenido del modal
	  $("#modal_error_extracto_body").empty();
	  $("#modal_error_extracto_header").empty();

	  $('#modal_error_extracto').modal('show');   // Muestra el modal
	  // Mostrar contenido
	  $("#modal_error_extracto_header").append("<strong>"+ contenido_header + "</strong>");
	  $('#modal_error_extracto_body').append("<h1>"+ titulo+ "</h1>")
	  $('#modal_error_extracto_body').append("<h3>" + contenido + "</h3>")
	  $('#modal_error_extracto_body').append("<img class='center-block' src='public/img/"+ imagen+ " ' alt=''>")

	}

});

//var menuInicio_view = new app.MenuInicio_view();
