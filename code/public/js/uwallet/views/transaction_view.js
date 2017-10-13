var app = app || {};

app.Userreg_view = Backbone.View.extend({
	el: '#div_login',
	//template: _.template($('#tpl_login').html()),

	events: {
		'submit #form_transaction_by_id': 'transaction_by_id'

		// añadir headers https://stackoverflow.com/questions/38796670/backbone-js-setting-header-for-get-request
	},

	initialize: function() {

		var self = this;
		self.render();
    self.transaction_by_id();
		self.transaction_by_user();
	},

	render: function() {
		this.$el.show();
		//this.$el.html(this.template());
	},

	transaction_by_id: function(){
		// Cuando funciona la peticion se buscan en 'options'
		var onDataHandler = function(collection, response, options) {
			console.log(options.xhr.status + " status de transaction_by_id");
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
			console.log(response.status + " status error onErrorHandler ");
			if(response.status == 401) {
				//
			} else {
				alert("Respuesta desconocida");
				console.log(response.status + " - " + responses.responseText);
			}
		};

		console.log("Entro en transaction_by_id");
		var self = this;
    //e.preventDefault();
		//user = objectifyForm( $('#form_transaction_by_id').serializeArray());  // Convierte todos los datos del formulario en un objeto


		var transaction = new app.TransactionById_model({id:"2"}); // Se le pasa el id para el getById

		transaction.fetch({
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MDY3MTk0MzcsImlzcyI6IndhbGxldCIsImF1ZCI6ImNsaWVudCJ9.wTd9PVAetlaOfgC9ce-zKb_VEMCX6UiS5Kw_Xl2BvD0'
      }
    },{ dataType:'text', success : onDataHandler, error: onErrorHandler });
	},

	transaction_by_user: function(){
		console.log("Entro en transaction_by_user");
		var self = this;
		//e.preventDefault();
		//user = objectifyForm( $('#form_transaction_by_id').serializeArray());  // Convierte todos los datos del formulario en un objeto

		var transaction = new app.TransactionByUser_model(); // Se le pasa el id para el getById

				transaction.fetch({
					headers: {
						'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MDY3MTk0MzcsImlzcyI6IndhbGxldCIsImF1ZCI6ImNsaWVudCJ9.wTd9PVAetlaOfgC9ce-zKb_VEMCX6UiS5Kw_Xl2BvD0'
					}
				},
				{
					//dataType: 'text',
					//success: function (model, respuesta, options) {
					//		console.log("success"); // Por lo general no funciona el success a menos que mande 200, por eso los status se miran desde el 'error'
					//},
					error: function (model, respuesta, options) {
						console.log(model); console.log(options); console.log(respuesta);
						if(respuesta.status == 401) {

						} else {
							alert("Respuesta desconocida");
							console.log(respuesta.status + " - " + respuesta.responseText);
						}
					}
				});
	},

	funcion_cualquiera: function(errores){
		//mostrar_modal_generico('Login ', 'No fue posible iniciar sesión', 'El usuario y la contraseña no coinciden.', 'fallo.png'  );
	}


});

var userreg_view = new app.Userreg_view();

/*


<!-- Template login-->
<script type="text/template" id="tpl_transaccion">
	<br> <br>
	<form role="form" id="form_transaccion">
		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label for="input_email"> userid </label>
					<input class="form-control" name="userid" id="input_email" type="text" placeholder="Email" required  value="jonatan10@gmail.com" />
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label for="input_password">	amount </label>
					<input class="form-control" name="amount" id="input_password" type="text" placeholder="Contraseña" required  value="foobar"/>
				</div>
			</div>

		</div>
		<input type="submit" class="btn btn-default" value="Iniciar sesión" form="form_transaccion" />

	</form>
</script>
<!-- Template login-->
































*/
