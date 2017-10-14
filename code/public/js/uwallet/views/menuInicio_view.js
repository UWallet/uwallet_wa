var app = app || {};

app.MenuInicio_view = Backbone.View.extend({
	el: '#div_menu_inicio',
	template: '\
		<div class="row">\
			<h1>Bienvenido a UWallet</h1>\
			<div class="col-md-4" id="div_iniciar_transaccion">\
				<h1>Enviar dinero</h1>\
				<center><img src="public/img/enviar_dinero.png" alt=""></center>\
			</div>\
			<div class="col-md-4">\
				<h1>Lista de pagos</h1>\
				<center><img src="public/img/lista_pago.png" alt=""></center>\
			</div>\
			<div class="col-md-4">\
				<h1>Extractos</h1>\
				<center><img src="public/img/pdf.png" alt=""></center>\
			</div>\
		</div>\
		<div class="modal fade" id="modal_aceptacion" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
 <div class="modal-dialog">\
   <div class="modal-content">\
     <div class="modal-header">\
       <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
       <h4 class="modal-title text-center" id="myModalLabel"> <strong>Transacción</strong> </h4>\
     </div>\
		 \
     <div class="modal-body">\
       <h2 class="text-center">Envio de dinero</h2>\
			 <form role="form" id="form_transaction">\
				 <div class="form-group">\
					 <label for="input_email"> Monto: </label>\
					 <input class="form-control" name="amount" min="1" id="input_amount" type="number" placeholder="Monto a enviar" required value="100"/>\
				 </div>\
				 <div class="form-group">\
					 <label for="input_email"> Cuenta: </label>\
					 <input class="form-control" name="userid" id="input_userid" type="number" placeholder="Cuenta a enviar" required value="2"/>\
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
		 	<h4> Una frase chevere :v  </h4>\
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
	',

	events: {
    'click #opc_inicio': 'opc_inicio',
		'click #opc_enviar_dinero': 'opc_enviar_dinero',
    'click #opc_cerrar_sesion': 'opc_cerrar_sesion',
		'click #btn_aceptar_valores': 'pedir_contraseña',
		'click #btn_cancelar_valores': 'liberar_campos',
		'click #div_iniciar_transaccion': 'mostrar_modal_transaccion',
		'click #btn_reintentar_transaccion': 'mostrar_modal_transaccion',
		'submit #form_transaction': 'opc_enviar_dinero'
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
		console.log("entro a liberar campos");
		$("#div_btn_transaccion_1").fadeIn('slow');
		$("#div_btn_transaccion_2").fadeOut('slow');
		$('#form_transaction input[name=password]').val("");
		$('#form_transaction input[name=userid]').removeAttr("disabled");
		$('#form_transaction input[name=amount]').removeAttr("disabled");

	},

  opc_inicio: function(){

  },

	opc_enviar_dinero: function(e){

		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			if (options.xhr.status == 201){
				self.mostrar_correcto_transaccion();
		 }else if(response.status == 400) {
				self.mostrar_error_400();
			} else if(response.status == 404){
				self.mostrar_error_404();
			}else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};
		var self = this;

		e.preventDefault();
		console.log("Entro a enviar dinero");
		$('#form_transaction input[name=userid]').removeAttr("disabled");  // Se reactivan los campos para poder obtener sus valores
		$('#form_transaction input[name=amount]').removeAttr("disabled");

		transaccion1 = objectifyForm( $('#form_transaction').serializeArray());  // Convierte todos los datos del formulario en un objeto
		$('#form_transaction')[0].reset();

		console.log(transaccion1);

		var transaccion2 = new app.Transaction_model(transaccion1);
    is_error = transaccion2.validate(transaccion2.attributes);
		$('#modal_aceptacion').modal('hide');
		console.log(is_error);
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
	},

	mostrar_error_400: function(errores){
		var self = this;
		this.mostrar_modal_error_transaccion('Transacción ', 'No es posible hacer la transacción', 'No tienes suficiente saldo.', 'fallo.png'  );
	},

	mostrar_error_404: function(errores){
		var self = this;
		mostrar_modal_error_transaccion('Transacción ', 'No es posible hacer la transacción', 'No existe la cuenta a la que deseas enviar.', 'fallo.png'  );
	},
	mostrar_correcto_transaccion: function(errores){
		var self = this;
		mostrar_modal_error_transaccion('Transacción ', 'Transacción finalizada.', 'La persona a la que le enviaste dinero recibira una notificación pronto.', 'confirmacion.png'  );
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

	}

});

//var menuInicio_view = new app.MenuInicio_view();
