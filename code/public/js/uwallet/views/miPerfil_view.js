var app = app || {};
app.MiPerfil_view = Backbone.View.extend({
	el: '#div_menu_mi_perfil',
	//template: _.template($('#tpl_mi_perfil').html()),
	template: '\
		<h1> Mi perfil </h1>\
		<div class="item-dpp">\
			<div class="personal-state">\
				<div class="user_name_and_online">\
					<span class="user_name" id="firstName"></span><span class="user_name"> </span><span class="user_name" id="lastName"></span><br>\
				</div>\
				<div class="one-info">\
					<span class="span-state">Email: <span class="span-state-2"  id="email"></span></span>\
				</div>\
				<div class="one-info">\
					<span class="span-state">Dinero: $<span class="span-state-2" id="money"></span></span>\
				</div>\
			</div>\
		</div>\
	</div>\
	<h2> Mis tarjetas </h2>\
	<button type="submit" class="btn btn-success" value="" id="create_card"> Agregar tarjeta</button> <br><br>\
	<table class="flat-table" id="tarjetas">\
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
		<h4> Una frase chevere :v  </h4>\
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
	',

	events: {
		'click #create_card': 'modal_card',
		'click #btn_reintentar_agregar_card': 'modal_card',
		'submit #form_card': 'create_card',
		'click .borrar-tarjeta': 'funcion_eliminar'
		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {
		var self = this;
		self.render();
		self.peticionusuario();
		self.peticiontarjetas();
	},

	render: function() {
		this.$el.show();
		//this.$el.html(this.template());  // Se usaba cuando el template se importaba desde el html
		this.$el.html(this.template);
	},

	peticionusuario: function(e){
		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				usuario = JSON.parse(options.xhr.responseText);
				$('#firstName').text(usuario.firstName);
				$('#lastName').text(usuario.lastName);
				$('#email').text(usuario.email);
				$('#money').text(usuario.money);
				userid = usuario.id;
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
	};
		// Cuando falla la peticion se buscan en 'response'
		var onErrorHandler = function(collection, response, options) {
			console.log("Entro en error handle");
			if(response.status == 401) {
				//
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + response.responseText);
			}
		};
		console.log("Entro en profile");

		var self = this;
		var perfil = new app.Profile_model();
		perfil.fetch({
      headers: {
        'Authorization': sessionStorage.getItem("token")
      },success: onDataHandler,
					error: onErrorHandler
    });
	},

	peticiontarjetas: function(e){

		var onDataHandler = function(collection, response, options) {
			if (options.xhr.status == 200){
				$("#tarjetas").html("");
				$("#tarjetas").append("<tr><th>Número de tarjeta</th><th>Saldo</th><th>Mes de expiración</th><th>Año de expiración</th><th>Operaciones</th>/tr>");
				tarjetas = JSON.parse(options.xhr.responseText);
				console.log(tarjetas[0])
				for (var i = 0; i < tarjetas.length; i++){
						$("#tarjetas").append("<tr><td>"+ tarjetas[i].number +"</td>  <td> $"+ (tarjetas[i].amount).toLocaleString() +"</td><td>"+ tarjetas[i].expiration_month +"</td><td>"+ tarjetas[i].expiration_year +"</td><td><button type='button' class='borrar-tarjeta btn btn-danger' id='"+tarjetas[i].id +"'>Peligro</button></td></tr>");
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
 				console.log("Error 500¿? - en tajetas.fetch ");
				console.log(response);
 			} else {
 				alert("Respuesta desconocida");
 				console.log(response.status + " - " + response.responseText);
 			}
 		};
 		console.log("Entro en tarjetas");

 		var self = this;
 		var tajetas = new app.Cards_model();
 		tajetas.fetch({
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },success: onDataHandler,
 					error: onErrorHandler
     });
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
		console.log("entro a crear tarjeta");
		var card = $('#form_card').serializeArray();
		card.push({name: "amount", value:Math.floor(Math.random() * 5000000) + 100})

		var card2 = new app.Cards_create_model(objectifyForm(card));
    is_error = card2.validate(card2.attributes);
		console.log(card2);
		$('#modal_cards').modal('hide');
		console.log(is_error);
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
			console.log("bien");
			console.log(options)
			console.log(response)
			if (options.xhr.status == 200){
				//
		 } else {
			 alert("Respuesta desconocida");
			 console.log(response.status + " - " + response.responseText);
		 }
		 };
		 // Cuando falla la peticion se buscan en 'response'
 		var onErrorHandler = function(collection, response, options) {
 			console.log("Entro en error handle");
			console.log(response);
			console.log(response.status);
			console.log(options);
 			if(response.status == 200) {
				console.log(" Aqui puede llamar a la funcion para que renderice la tabla.");
 			} else {
 				alert("Respuesta desconocida");
 				console.log(response.status + " - " + response.responseText);
 			}
 		};
		//traditional: true,
		 //processData: true,
		var self = this;
		console.log(e.target.id);
		var tajetadel = new app.Cards_model({id: e.target.id}); //{id: e.target.id}
	//thisDeal.destroy({data: { program_id: dealProgram.id }, processData: true})
 		au = tajetadel.destroy({
			 //data: { id2: e.target.id },
			 // processData: true,
       headers: {
         'Authorization': sessionStorage.getItem("token")
       },success: onDataHandler,
 					error: onErrorHandler
     });
		 console.log(au);
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

//var noficaciones_view = new app.Noficaciones_view();
/*
'\
        <form>\
            <legend>Share the feedback</legend>\
            <div class="control-group email">\
                <label>Email</label>\
                <input type="text" id="email" placeholder="Your email address...">\
                <span class="help-inline"></span>\
            </div>\
            <div class="control-group website">\
                <label>Web site</label>\
                <input type="text" id="website" placeholder="Your website...">\
                <span class="help-inline"></span>\
            </div>\
            <div class="control-group feedback">\
                <label>Feedback</label>\
                <textarea id="feedback" class="input-xxlarge" placeholder="Feedback text..." rows="6"></textarea>\
                <span class="help-inline"></span>\
            </div>\
            <button type="submit" id="submit" class="btn">Submit</button>\
        </form>\
    '*/
