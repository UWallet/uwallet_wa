var app = app || {};
var idcard;
app.MiPerfil_view = Backbone.View.extend({
	el: '#div_menu_mi_perfil',
	//template: _.template($('#tpl_mi_perfil').html()),
	template: '\
	<div class="col-md-12" align="center">\
		<h1> Mi Perfil </h1>\
	</div>\
	<div class="col-md-12" align="center">\
		<HR width="0%">\
		<HR width="0%">\
		<HR width="0%">\
		<div class="col-md-3" align="center">\
		</div>\
		<div class="col-md-6" align="center">\
			<div class="personal-state">\
				<div class="user_name_and_online">\
					<span class="userName user_name"></span><br>\
				</div>\
				<div class="one-info">\
					<span class="span-state">Cuenta: <span class="userCuenta span-state-2"></span></span>\
				</div>\
				<HR width="0%">\
				<HR width="0%">\
				<div class="one-info">\
					<span class="span-state">Email:    <span class="userEmail span-state-2"></span></span>\
				</div>\
				<HR width="0%">\
				<HR width="0%">\
				<div class="one-info">\
					<span class="span-state">Dinero:  <span class="userMoney span-state-2"></span></span>\
				</div>\
				<br>\
			</div>\
	  </div>\
	</div>\
	<div class="col-md-12" align="center">\
	<button align="center" type="button" class="btn btn-info" id="change_pass"> Cambiar contraseña</button> <br><br>\
		<h1> Mis tarjetas </h1>\
		<button type="submit" class="btn btn-success" value="" id="create_card"> Agregar tarjeta</button> <br><br>\
	</div>\
	<div class="col-md-1" align="center">\
	</div>\
	<table class="flat-table col-md-1" id="tarjetas" align="center">\
  <tbody>\
  </tbody>\
	</table>\
	\
	<div class="modal fade" id="modal_cards" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
 <div class="modal-content">\
	 <div class="modal-header">\
		 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
		 <h4 class="modal-title text-center" id="myModalLabel"> <strong>Agregar Tarjeta de credito</strong> </h4>\
	 </div>\
	 \
	 <div class="modal-body">\
		 <h2 class="text-center">Datos de tarjeta</h2>\
	 </div>\
	 <form role="form" id="form_card">\
		 <div class="form-group">\
			 <label for="input_number"> Número de tarjeta: </label>\
			 <input class="form-control" name="number" title="El número debe estar entre 15 y 20 digitos" id="input_number" type="number" placeholder="Número de tarjeta" required value="1234567890123456"  />\
		 </div>\
		 <div class="form-group">\
			 <label for="input_mes"> Mes de expiración: </label>\
			 <select class="form-control select_uwallet_30 center-block" name="expiration_month" id="input_mes" type="number" placeholder="Mes de expiración" required >\
			  <option value="1" selected>Enero</option>\
			  <option value="2">Febrero</option>\
				<option value="3">Marzo</option>\
				<option value="4">Abril</option>\
				<option value="5">Mayo</option>\
				<option value="6">Junio</option>\
				<option value="7">Julio</option>\
				<option value="8">Agosto</option>\
				<option value="9">Septiembre</option>\
				<option value="10">Octubre</option>\
				<option value="11">Noviembre</option>\
				<option value="12">Diciembre</option>\
			</select>\
		 </div>\
		 <div class="form-group">\
			 <label for="input_año"> Año de expiración: </label>\
			 <select class="form-control select_uwallet_30 center-block" name="expiration_year" id="input_año" type="number" placeholder="Año de expiración" required></select>\
		 </div>\
		 <div id="div_btn_transaccion_1">\
			<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
			<input type="submit" class="btn btn-default" form="form_card" value="Agregar">\
		 </div>\
	 </form>\
	 <div class="modal-footer">\
		<h4> UWallet  </h4>\
	 </div>\
 </div>\
</div>\
</div>\
<!-- Inicio de modal error_transaccion. -->\
<div class="modal fade" id="modal_error_card" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
 <div class="modal-dialog">\
   <div class="modal-content">\
     <div class="modal-header">\
       <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
       <h4 class="modal-title text-center" id="modal_error_card_header"> </h4>\
     </div>\
\
     <div class="modal-body" id="modal_error_card_body"> sin contenido</div>\
\
     <div class="modal-footer">\
       <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
			  <button type="button" class="btn btn-default" id="btn_reintentar_agregar_card">Reintentar</button>\
     </div>\
   </div>\
 </div>\
</div>\
<!-- Fin modal de  modal error_transaccion .-->\
\
<!-- inicio modal de  modal load money from card .-->\
<div class="modal fade" id="modal_load" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
 <div class="modal-header">\
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
	 <h4 class="modal-title text-center" id="myModalLabel"> <strong>Agregar Dinero a cuenta</strong> </h4>\
 </div>\
 \
 <div class="modal-body">\
	 <h2 class="text-center">Monto</h2>\
 </div>\
 <form role="form" id="form_load">\
	 <div class="form-group">\
		 <label for="input_monto"> Monto a cargar: </label>\
		 <input class="form-control" name="money" id="input_monto" type="number" placeholder="Monto" required value="500"  />\
	 </div>\
	 <div id="div_btn_transaccion_1">\
		<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
		<input type="submit" class="btn btn-default" form="form_load" value="Agregar dinero">\
	 </div>\
 </form>\
 <div class="modal-footer">\
	<h4> UWallet  </h4>\
 </div>\
</div>\
</div>\
</div>\
\
<!-- inicio modal de  modal pass.-->\
<div class="modal fade" id="modal_password" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
 <div class="modal-header">\
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> × </button>\
	 <h4 class="modal-title text-center" id="myModalLabel"> <strong>Actualizar</strong> </h4>\
 </div>\
 \
 <div class="modal-body">\
	 <h2 class="text-center">Cambio de contraseña</h2>\
 </div>\
 <form role="form" id="form_pass">\
	 <div class="form-group">\
		 <label for="input_password"> Contraseña: </label>\
		 <input class="form-control" name="password" id="input_password" type="password" placeholder="Contraseña" required/>\
	 </div>\
	 <div class="form-group">\
		 <label for="input_password"> Confirmación de contraseña: </label>\
		 <input class="form-control" name="password_confirmation" id="input_confirmation" type="password" placeholder="Confirmación de contraseña" required/>\
	 </div>\
	 <div id="div_btn_transaccion_1">\
		<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
		<input type="submit" class="btn btn-default" form="form_pass" value="Confirmar">\
	 </div>\
 </form>\
 <div class="modal-footer">\
	<h4> UWallet  </h4>\
 </div>\
</div>\
</div>\
</div>\
	',

	events: {
		'click #create_card': 'modal_card',
		'click #change_pass': 'modal_pass',
		'submit #form_pass': 'update_pass',
		'click #btn_reintentar_agregar_card': 'modal_card',
		'submit #form_card': 'create_card',
		'click .borrar-tarjeta': 'funcion_eliminar',
		'click .saldo': 'funcion_saldo',
		'submit #form_load': 'funcion_load',
		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {
		var self = this;
		//self.render();

	},

	render: function() {
		var self = this;
		self.peticionusuario();
		self.peticiontarjetas();
		this.$el.show();
		this.$el.html(this.template);
	},

	peticionusuario: function(e){
		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				usuario = JSON.parse(options.xhr.responseText);
				name = usuario.firstName + " " + usuario.lastName
				$('.userName').text(name);
				$('.userEmail').text(usuario.email);
				money = "$" + usuario.money.toLocaleString();
				$('.userMoney').text(money);
				cuenta = self.formato_cuenta(usuario.id);
				$('.userCuenta').text(cuenta);
				sessionStorage.setItem('id_user', usuario.id.toString());
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
	};
		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			if(response.status == 401) {
				//
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};

		var self = this;
		var perfil = new app.Profile_model();
		perfil.fetch({
      headers: {
        'Authorization': sessionStorage.getItem("token")
      },success: onDataHandler,
					error: onErrorHandler
    });
	},
	formato_cuenta: function(id){
		var cuenta='';
		for (var i = 0; i < 8 - ((id.toString()).length); i++){
			cuenta+='0';
		}
		cuenta+=(id.toString());
		return cuenta;
	},

	peticiontarjetas: function(e){

		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				$("#tarjetas").html("");
				$("#tarjetas").append("<tr><th>Número de tarjeta</th><th>Saldo</th><th>Mes de expiración</th><th>Año de expiración</th><th>Operaciones</th>/tr>");
				tarjetas = JSON.parse(options.xhr.responseText);
				for (var i = 0; i < tarjetas.length; i++){
							$("#tarjetas").append("<tr><td>"+ tarjetas[i].number +"</td>  <td> $"+ (tarjetas[i].amount).toLocaleString() +"</td><td>"+ tarjetas[i].expiration_month +"</td><td>"+ tarjetas[i].expiration_year +"</td><td><button type='button' class='saldo btn btn-primary' id='"+tarjetas[i].id +"'>Cargar</button><button type='button' class='borrar-tarjeta btn btn-danger' id='"+tarjetas[i].id +"'>Eliminar</button></td></tr>");
				}

		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
		 };
		 // Cuando falla la peticion se buscan en 'response'
 		var onErrorHandler = function(collection, response, options) {
 			if(response.status == 500) {
 				console.log("Error 500¿? - en tajetas.fetch ");
				console.log(response);
 			} else {
 				alert("Respuesta desconocida");
 				console.log(response.status + " - " + response.responseText);
 			}
 		};

 		var self = this;
 		var tajetas = new app.Cards_model();
 		tajetas.fetch({
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },success: onDataHandler,
 					error: onErrorHandler
     });
	},

	update_pass: function(e){
	  e.preventDefault();
	  var self = this;
	  var onDataHandler = function(collection, response, options) {
	    if (options.xhr.status == 204){
	      mostrar_modal_generico('Cambio de contraseña', 'Se edito tu contraseña', 'Esa sera tu contraseña para la siguiente vez que accedas.', 'confirmacion.png'  );
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
	  var pass = $('#form_pass').serializeArray();
		var pass2 = [];
		pass2.push ({name: "user", value: objectifyForm(pass)});
	  var pass3 = new app.Password_model(objectifyForm(pass2));
		is_error = pass3.validate(pass3.attributes);
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
			$('#modal_password').modal('hide');
		      pass3.save({},{
		        type: 'PUT',
		        headers: {
		          'Authorization': sessionStorage.getItem("token")
		        },success: onDataHandler,
		  					error: onErrorHandler
		      });
		}
},

	modal_card: function(){
		$('#modal_error_card').modal('hide');
		$('#modal_cards').modal('show');
		var start = 2017;
		var end = 2030;

		//<option value="2">Febrero</option>\
		var options = "";
		for(var year = start ; year <=end; year++){
		  options += "<option value="+ year + ">" + year+"</option>";
		}
		document.getElementById("input_año").innerHTML = options;
	},

	modal_pass: function(){
		//$('#modal_error_card').modal('hide');
		$('#modal_password').modal('show');
	},

	create_card: function(e){
		var self = this;
		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			if (options.xhr.status == 201){
				self.peticiontarjetas();
				mostrar_modal_generico('Agregar Tarjeta ', 'Se agrego esta tarjeta a tu cuenta.', 'Ya puede usar esta tarjeta para añadir dinero a tu cuenta en UWallet.', 'confirmacion.png'  );
		  } else if(response.status == 400) {
				self.mostrar_error_400();
			}	else if(response.status == 422) {
	 			self.mostrar_error_422(response.responseJSON);
				console.log(response.responseJSON);
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};

		e.preventDefault();
		var card = $('#form_card').serializeArray();
		card.push({name: "amount", value:Math.floor(Math.random() * 5000000) + 100})

		var card2 = new app.Cards_create_model(objectifyForm(card));
    is_error = card2.validate(card2.attributes);
		$('#modal_cards').modal('hide');
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
				//login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
				card2.save({},{
		      headers: {
		        'Authorization': sessionStorage.getItem("token")
		      },error: onErrorHandler
		    });
			}
	},

	funcion_eliminar: function(e){
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				//
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
		 };
		 // Cuando falla la peticion se buscan en 'response'
 		var onErrorHandler = function(collection, response, options) {
 			if(response.status == 200) {
				self.peticiontarjetas();
				mostrar_modal_generico('Eliminar Tarjeta ', 'Se ha eliminado la tarjeta de tu cuenta.', 'Ya no podras usar esta tarjeta con UWallet.', 'confirmacion.png'  );
 			} else {
				if(response.status == 403) {
				  self.peticiontarjetas();
				  mostrar_modal_generico('Eliminar Tarjeta ', 'No es posible eliminar la tarjeta.', 'Esta tarjeta ya fue eliminada.', 'fallo.png'  );
				}
				else{
				  alert("Respuesta desconocida");
				  console.log(response.status + " - " + response.responseText);
				}
 			}
 		};
		//traditional: true,
		 //processData: true,
		var self = this;
		var tajetadel = new app.Cards_model({id: e.target.id}); //{id: e.target.id}
	//thisDeal.destroy({data: { program_id: dealProgram.id }, processData: true})
 		tajetadel.destroy({
			 //data: { id2: e.target.id },
			 // processData: true,
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },success: onDataHandler,
 					error: onErrorHandler
     });
	},

	funcion_saldo(e){
		var self = this;
		$('#modal_load').modal('show');
		idcard=e.target.id;
	},

	funcion_load(e){
		var self = this;
		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			if (options.xhr.status == 201){
				self.peticionusuario();
				self.peticiontarjetas();
				mostrar_modal_generico('Agregar Saldo a cuenta', 'Se agrego saldo a tu cuenta.', 'Ya puedes disfrutar de los beneficios de usar UWallet.', 'confirmacion.png'  );
		  } else if(response.status == 400) {
				self.mostrar_error_400();
			}	else if(response.status == 422) {
	 			self.mostrar_error_422(response.responseJSON);
				console.log(response.responseJSON);
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};

		e.preventDefault();
		var card = $('#form_load').serializeArray();
		card.push({name: "cardId", value: idcard})

		var card2 = new app.Cards_load_model(objectifyForm(card));
    is_error = card2.validate(card2.attributes);
		$('#modal_load').modal('hide');
		if (is_error) {
			mostrar_errores_modelo(is_error)
		} else {
				//login_usuario.save({}, { dataType:'text', success : onDataHandler, error: onErrorHandler }); // El dataType:'text' a veces es necesario
				card2.save({},{
		      headers: {
		        'Authorization': sessionStorage.getItem("token")
		      },error: onErrorHandler
		    });
			}
	},

	mostrar_error_400: function(errores){
		var self = this;
		this.mostrar_modal_error_card('Agregar Tarjeta ', 'No es posible agregar tarjeta'," ", 'fallo.png'  );
	},
	mostrar_error_422: function(errores){
		var self = this;
		mensaje_error = "";
		// Toco hacerlo asi porque Kevin devuelve un JSON de errores, tocaria decirle que los cambie a español o ponernos a hacer IF para cada tipo de error
		for (var clave in errores){
		  if (errores.hasOwnProperty(clave)) {
		    mensaje_error += "<strong>" + clave+ " </strong> " + errores[clave] + ".<br>";
		  }
		}
		self.peticiontarjetas();
		this.mostrar_modal_error_card('Agregar tarjeta', 'No fue posible agregar la tarjeta',mensaje_error, 'fallo.png'  );
	},
	mostrar_modal_error_card: function(contenido_header, titulo, contenido, imagen){
	  // Limpiar el contenido del modal
	  $("#modal_error_card_body").empty();
	  $("#modal_error_card_header").empty();

	  $('#modal_error_card').modal('show');   // Muestra el modal
	  // Mostrar contenido
	  $("#modal_error_card_header").append("<strong>"+ contenido_header + "</strong>");
	  $('#modal_error_card_body').append("<h1>"+ titulo+ "</h1>")
	  $('#modal_error_card_body').append("<h3>" + contenido + "</h3>")
	  $('#modal_error_card_body').append("<img class='center-block' src='public/img/"+ imagen+ " ' alt=''>")

	}
});

var miPerfil_view = new app.MiPerfil_view();
